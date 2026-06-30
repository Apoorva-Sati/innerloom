import { NextRequest, NextResponse } from "next/server"
import { BookingSchema } from "@/lib/validations/booking"
import {
  getSlots,
  createBooking,
  DISCOVERY_CALL_EVENT_TYPE_ID,
  COUNSELLING_SESSION_EVENT_TYPE_ID,
  CalApiError,
} from "@/lib/cal/client"
import { findOrCreateContact } from "@/lib/db/submissions"
import {
  createPendingBooking,
  markBookingConfirmed,
  markBookingFailed,
  getFreeBookingStatus,
  deleteFreeFailedBooking,
} from "@/lib/db/bookings"
import { checkRateLimit } from "@/lib/ratelimit"

// Derive the YYYY-MM-DD local date from a UTC ISO string + IANA timezone
function localDate(isoString: string, timezone: string): string {
  const d = new Date(
    new Date(isoString).toLocaleString("en-US", { timeZone: timezone }),
  )
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-")
}

export async function POST(req: NextRequest) {
  try {
    // a. Rate limit — key by IP address
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
    const limit = checkRateLimit(ip)

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: `Too many submissions. Please wait ${Math.ceil(limit.retryAfterSec / 60)} minute(s) before trying again.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfterSec) },
        },
      )
    }

    const body = await req.json()

    // b. Honeypot — bots fill this hidden field, humans never see it
    if (body._honey) {
      return NextResponse.json({ ok: true })
    }

    // c. Validate with Zod
    const result = BookingSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { _honey: _h, ...formData } = result.data

    const eventTypeId =
      formData.sessionType === "paid"
        ? COUNSELLING_SESSION_EVENT_TYPE_ID
        : DISCOVERY_CALL_EVENT_TYPE_ID

    // d. Find existing contact by email, or create a new one.
    //    This ensures a returning user (e.g. upgrading free→paid) reuses
    //    their existing contact_inquiries row rather than getting a duplicate.
    const contactResult = await findOrCreateContact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      consent: formData.consent,
    })

    if (!contactResult.success || !contactResult.id) {
      console.error(
        "[Booking Create API] Contact find/create failed:",
        contactResult.error,
      )
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      )
    }

    const contactId = contactResult.id

    // e. Free-call gate — one free session per contact, ever.
    //    The DB enforces this with a partial unique index; we check first
    //    to return a human-readable error instead of a constraint violation.
    if (formData.sessionType === "free") {
      const freeStatus = await getFreeBookingStatus(contactId)

      if (freeStatus === "confirmed") {
        return NextResponse.json(
          {
            error:
              "Looks like you've already had a free discovery call with us. Let's go ahead and book a full session instead — message me below and I'll set it up.",
          },
          { status: 409 },
        )
      }
      if (freeStatus === "pending") {
        return NextResponse.json(
          {
            error:
              "You already have a discovery call pending. Please wait for confirmation or contact us to reschedule.",
          },
          { status: 409 },
        )
      }
      if (freeStatus === "failed") {
        // Technical failure on a previous attempt — clean it up and let them retry.
        await deleteFreeFailedBooking(contactId)
      }
    }

    // f. Insert a pending booking row BEFORE calling Cal.com.
    //    If anything downstream fails, we mark it failed — no orphaned Cal bookings.
    const date = localDate(formData.slotStart, formData.timezone)

    const pendingResult = await createPendingBooking({
      contactId,
      date,
      timeSlot: formData.slotStart,
      timezone: formData.timezone,
      sessionType: formData.sessionType,
      message: formData.message,
    })

    if (!pendingResult.success || !pendingResult.id) {
      const isUniqueViolation = pendingResult.error
        ?.toLowerCase()
        .includes("unique")
      console.error(
        "[Booking Create API] DB pending insert failed:",
        pendingResult.error,
      )
      if (isUniqueViolation && formData.sessionType === "free") {
        return NextResponse.json(
          { error: "A free discovery call booking already exists for your account." },
          { status: 409 },
        )
      }
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      )
    }

    const bookingId = pendingResult.id

    // g. Re-verify slot is still free — guards against the race where two
    //    visitors both load the page and pick the same slot
    const slotMs = new Date(formData.slotStart).getTime()
    const windowStart = new Date(slotMs - 60 * 60_000)
    const windowEnd = new Date(slotMs + 60 * 60_000)

    try {
      const slotsCheck = await getSlots(
        eventTypeId,
        windowStart.toISOString(),
        windowEnd.toISOString(),
      )
      const allSlots = Object.values(slotsCheck).flat()
      const stillAvailable = allSlots.some((s) => s.time === formData.slotStart)

      if (!stillAvailable) {
        await markBookingFailed(bookingId)
        return NextResponse.json(
          {
            error:
              "That time slot was just booked by someone else. Please pick another time.",
          },
          { status: 409 },
        )
      }
    } catch (err) {
      if (err instanceof CalApiError) {
        await markBookingFailed(bookingId)
        return NextResponse.json(
          {
            error:
              "Couldn't confirm your booking with our calendar. Please try again or WhatsApp us.",
          },
          { status: 502 },
        )
      }
      throw err
    }

    // h. Create the booking on Cal.com, then confirm in our DB
    try {
      const calBooking = await createBooking({
        eventTypeId,
        start: formData.slotStart,
        name: formData.name,
        email: formData.email,
        timeZone: formData.timezone,
        notes: formData.message,
      })

      await markBookingConfirmed(bookingId, calBooking.uid)

      return NextResponse.json({ ok: true, bookingId, calUid: calBooking.uid })
    } catch (err) {
      await markBookingFailed(bookingId)

      if (err instanceof CalApiError) {
        const message =
          err.status === 409
            ? "That time slot was just booked by someone else. Please pick another time."
            : "Couldn't confirm your booking with our calendar. Please try again or WhatsApp us."
        return NextResponse.json({ error: message }, { status: 502 })
      }

      throw err
    }
  } catch (err) {
    console.error("[Booking Create API] Unexpected error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}

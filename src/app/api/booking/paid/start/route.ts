// Full-form paid booking initiation — mirrors /api/booking/create for free sessions,
// but returns Razorpay order details instead of a final confirmation.
// The Cal.com event is NOT created here — it's created after payment is verified.

import { NextRequest, NextResponse } from "next/server"
import { BookingSchema } from "@/lib/validations/booking"
import { findOrCreateContact } from "@/lib/db/submissions"
import {
  hasConfirmedFreeBooking,
  createPendingPaidBooking,
  attachRazorpayOrder,
} from "@/lib/db/bookings"
import { checkRateLimit } from "@/lib/ratelimit"
import {
  createPaymentOrder,
  PAID_SESSION_AMOUNT_PAISE,
} from "@/lib/razorpay/client"

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
    // a. Rate limit
    const ip    = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
    const limit = checkRateLimit(ip)

    if (!limit.allowed) {
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${Math.ceil(limit.retryAfterSec / 60)} minute(s).` },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
      )
    }

    const body = await req.json()

    // b. Honeypot
    if (body._honey) {
      return NextResponse.json({ ok: true })
    }

    // c. Validate — same schema as free bookings
    const parsed = BookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { _honey: _h, ...formData } = parsed.data

    if (formData.sessionType !== "paid") {
      return NextResponse.json({ error: "Invalid session type." }, { status: 400 })
    }

    // d. Find or create the contact row
    const contactResult = await findOrCreateContact({
      name:    formData.name,
      email:   formData.email,
      phone:   formData.phone || undefined,
      consent: formData.consent,
    })

    if (!contactResult.success || !contactResult.id) {
      console.error("[Paid Start] Contact find/create failed:", contactResult.error)
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      )
    }

    const contactId = contactResult.id

    // e. Gate: paid session requires a prior confirmed free discovery call
    const hasFreeCall = await hasConfirmedFreeBooking(contactId)
    if (!hasFreeCall) {
      return NextResponse.json(
        {
          error:
            "A free discovery call is required before booking a paid session. " +
            "Please book your free 15-minute call first.",
        },
        { status: 403 },
      )
    }

    // f. Insert pending booking row — Cal.com event created after payment, not now
    const date          = localDate(formData.slotStart, formData.timezone)
    const pendingResult = await createPendingPaidBooking({
      contactId,
      date,
      timeSlot: formData.slotStart,
      timezone: formData.timezone,
      message:  formData.message,
    })

    if (!pendingResult.success || !pendingResult.id) {
      console.error("[Paid Start] DB insert failed:", pendingResult.error)
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      )
    }

    const bookingId = pendingResult.id

    // g. Create Razorpay order and store it on the booking row
    const order = await createPaymentOrder(bookingId)
    await attachRazorpayOrder(bookingId, order.id)

    return NextResponse.json({
      ok:              true,
      bookingId,
      razorpayOrderId: order.id,
      amount:          PAID_SESSION_AMOUNT_PAISE,
      keyId:           process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error("[Paid Start] Unexpected error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}

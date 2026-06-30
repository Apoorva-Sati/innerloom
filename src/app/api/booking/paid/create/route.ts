import { NextRequest, NextResponse } from "next/server"
import { PaidBookingSchema } from "@/lib/validations/booking"
import { checkRateLimit } from "@/lib/ratelimit"
import {
  hasConfirmedFreeBooking,
  createPendingPaidBooking,
  attachRazorpayOrder,
} from "@/lib/db/bookings"
import {
  createPaymentOrder,
  PAID_SESSION_AMOUNT_PAISE,
} from "@/lib/razorpay/client"

export async function POST(req: NextRequest) {
  try {
    // a. Rate limit by IP
    const ip    = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
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

    // b. Validate
    const body   = await req.json()
    const result = PaidBookingSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { contactId, date, timeSlot, timezone } = result.data

    // c. Gate: paid sessions require a prior confirmed free discovery call.
    const hasFreCall = await hasConfirmedFreeBooking(contactId)
    if (!hasFreCall) {
      return NextResponse.json(
        {
          error:
            "A free discovery call is required before booking a paid session. " +
            "Please book your free call first.",
        },
        { status: 403 },
      )
    }

    // d. Insert pending booking row — Cal.com event is created AFTER payment,
    //    so the slot is NOT blocked in Cal.com until payment is confirmed.
    const pendingResult = await createPendingPaidBooking({
      contactId,
      date,
      timeSlot,
      timezone,
    })

    if (!pendingResult.success || !pendingResult.id) {
      console.error("[Paid Booking Create] DB insert failed:", pendingResult.error)
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      )
    }

    const bookingId = pendingResult.id

    // e. Create Razorpay order, store the order id on the booking row.
    const order = await createPaymentOrder(bookingId)
    await attachRazorpayOrder(bookingId, order.id)

    // f. Return order details to the frontend so it can open the Razorpay modal.
    //    keyId is the public key — safe to expose to the client.
    return NextResponse.json({
      ok:             true,
      bookingId,
      razorpayOrderId: order.id,
      amount:         PAID_SESSION_AMOUNT_PAISE,
      keyId:          process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error("[Paid Booking Create] Unexpected error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}

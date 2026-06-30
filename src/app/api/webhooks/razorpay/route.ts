import { NextRequest, NextResponse } from "next/server"
import { verifyWebhookSignature } from "@/lib/razorpay/client"
import { getBookingWithContact } from "@/lib/db/bookings"
import { confirmPaidBooking } from "@/lib/payments/confirmPaidBooking"

// Razorpay retries webhook delivery on non-200 responses, which can cause
// retry storms. Always return 200 to Razorpay — log failures internally.
export async function POST(req: NextRequest) {
  // a. Read the RAW body as text — signature verification requires the exact
  //    bytes Razorpay sent, not a re-serialized JSON object.
  const rawBody  = await req.text()
  const signature = req.headers.get("x-razorpay-signature") ?? ""

  // b. Verify webhook authenticity before touching any data.
  if (!verifyWebhookSignature(rawBody, signature)) {
    console.warn("[Razorpay Webhook] Invalid signature — rejecting.")
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 })
  }

  let event: {
    event: string
    payload: { payment: { entity: { id: string; order_id: string; notes: Record<string, string> } } }
  }

  try {
    event = JSON.parse(rawBody)
  } catch {
    console.error("[Razorpay Webhook] Failed to parse body.")
    return new NextResponse(null, { status: 200 })
  }

  // Only handle payment.captured — ignore all other event types.
  if (event.event !== "payment.captured") {
    return new NextResponse(null, { status: 200 })
  }

  // c. Extract bookingId from the order's notes field.
  const paymentEntity = event.payload.payment.entity
  const bookingId     = paymentEntity.notes?.bookingId
  const paymentId     = paymentEntity.id

  if (!bookingId) {
    console.error("[Razorpay Webhook] payment.captured missing notes.bookingId", paymentEntity)
    return new NextResponse(null, { status: 200 })
  }

  // d. Idempotency check — Razorpay may send the same event more than once.
  const booking = await getBookingWithContact(bookingId)
  if (!booking) {
    console.error("[Razorpay Webhook] Booking not found:", bookingId)
    return new NextResponse(null, { status: 200 })
  }

  if (booking.status === "confirmed") {
    // Already processed (e.g. browser verify callback fired first).
    return new NextResponse(null, { status: 200 })
  }

  // e. Browser verify callback never fired — run confirmation now.
  //    This is the safety net: tab closed, network dropped, etc.
  const result = await confirmPaidBooking(bookingId, paymentId)

  if (!result.ok) {
    // Log the failure but still return 200 so Razorpay doesn't retry.
    console.error("[Razorpay Webhook] confirmPaidBooking failed:", result.error, {
      bookingId,
      paymentId,
      isSlotGone: "isSlotGone" in result ? result.isSlotGone : false,
    })
  }

  // f. Always 200 — Razorpay retries on non-200 and that creates retry storms.
  return new NextResponse(null, { status: 200 })
}

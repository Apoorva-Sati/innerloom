import { NextRequest, NextResponse } from "next/server"
import { verifyPaymentSignature } from "@/lib/razorpay/client"
import { confirmPaidBooking } from "@/lib/payments/confirmPaidBooking"

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = await req.json()

    // a. Verify the payment signature before doing anything else.
    //    If this fails, the request is either tampered or malformed — reject hard.
    const valid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    )
    if (!valid) {
      return NextResponse.json(
        { error: "Payment verification failed." },
        { status: 400 },
      )
    }

    // b–d. Re-verify slot, create Cal.com event, mark confirmed.
    const result = await confirmPaidBooking(bookingId, razorpay_payment_id)

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[Payment Verify] Unexpected error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}

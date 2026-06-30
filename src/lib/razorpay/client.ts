// Server-only Razorpay client — never import this from a "use client" file.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const RazorpayCtor = require("razorpay") as new (cfg: {
  key_id: string
  key_secret: string
}) => {
  orders: {
    create(data: {
      amount: number
      currency: string
      receipt?: string
      notes?: Record<string, string>
    }): Promise<{ id: string; amount: number; currency: string }>
  }
}

import crypto from "crypto"

const razorpay = new RazorpayCtor({
  key_id:     process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const PAID_SESSION_AMOUNT_PAISE = 40000 // ₹400

export async function createPaymentOrder(
  bookingId: string,
): Promise<{ id: string; amount: number; currency: string }> {
  return razorpay.orders.create({
    amount:   PAID_SESSION_AMOUNT_PAISE,
    currency: "INR",
    receipt:  `booking_${bookingId}`,
    notes:    { bookingId },
  })
}

// Razorpay's documented payment verification:
// HMAC-SHA256 of `${orderId}|${paymentId}` using RAZORPAY_KEY_SECRET.
// Uses timing-safe comparison to prevent timing attacks.
export function verifyPaymentSignature(
  orderId:   string,
  paymentId: string,
  signature: string,
): boolean {
  try {
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${orderId}|${paymentId}`)
      .digest("hex")
    return crypto.timingSafeEqual(
      Buffer.from(expected,  "hex"),
      Buffer.from(signature, "hex"),
    )
  } catch {
    // timingSafeEqual throws if buffer lengths differ (malformed signature)
    return false
  }
}

// TODO: Add RAZORPAY_WEBHOOK_SECRET to .env.local and Vercel once you
// generate it in the Razorpay dashboard under Settings → Webhooks.
// The webhook URL to register there is: https://<your-domain>/api/webhooks/razorpay
export function verifyWebhookSignature(
  rawBody:   string,
  signature: string,
): boolean {
  try {
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex")
    return crypto.timingSafeEqual(
      Buffer.from(expected,  "hex"),
      Buffer.from(signature, "hex"),
    )
  } catch {
    return false
  }
}

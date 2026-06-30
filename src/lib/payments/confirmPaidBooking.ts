// Server-only — never import from "use client" files.
// Shared by /api/payment/verify and /api/webhooks/razorpay so the confirmation
// logic lives in exactly one place.

import { getCounsellingSlots, createCounsellingBooking, CalApiError } from "@/lib/cal/client"
import {
  getBookingWithContact,
  markPaidBookingConfirmed,
  markBookingFailed,
} from "@/lib/db/bookings"

export type ConfirmResult =
  | { ok: true }
  | { ok: false; status: number; error: string; isSlotGone?: true }

export async function confirmPaidBooking(
  bookingId: string,
  paymentId: string,
): Promise<ConfirmResult> {
  const booking = await getBookingWithContact(bookingId)
  if (!booking) {
    return { ok: false, status: 404, error: "Booking not found." }
  }

  // Re-verify slot availability — same ±1 hour window guard as the free flow.
  const slotMs     = new Date(booking.timeSlot).getTime()
  const windowStart = new Date(slotMs - 60 * 60_000).toISOString()
  const windowEnd   = new Date(slotMs + 60 * 60_000).toISOString()

  try {
    const slotsCheck   = await getCounsellingSlots(windowStart, windowEnd)
    const allSlots     = Object.values(slotsCheck).flat()
    const stillAvailable = allSlots.some((s) => s.time === booking.timeSlot)

    if (!stillAvailable) {
      await markBookingFailed(bookingId)
      // EDGE CASE: payment captured but slot is no longer available.
      // The user has paid and cannot be given a calendar event — they must be
      // contacted for a refund or reschedule. Log loudly so support sees it.
      console.error(
        "[confirmPaidBooking] SLOT_GONE_AFTER_PAYMENT",
        { bookingId, paymentId, timeSlot: booking.timeSlot },
      )
      return {
        ok: false,
        status: 409,
        isSlotGone: true,
        error:
          "Your payment was received but the selected time slot is no longer available. " +
          "Please contact us immediately — we'll refund or reschedule you.",
      }
    }
  } catch (err) {
    if (err instanceof CalApiError) {
      await markBookingFailed(bookingId)
      return {
        ok: false,
        status: 502,
        error: "Payment received but couldn't verify slot availability. Please contact us.",
      }
    }
    throw err
  }

  // Create the Cal.com event — only after payment is verified and slot confirmed.
  try {
    const calBooking = await createCounsellingBooking({
      start:    booking.timeSlot,
      name:     booking.name,
      email:    booking.email,
      timeZone: booking.timezone,
      notes:    booking.message ?? undefined,
    })

    await markPaidBookingConfirmed(bookingId, paymentId, calBooking.uid)
    return { ok: true }
  } catch (err) {
    await markBookingFailed(bookingId)
    if (err instanceof CalApiError) {
      return {
        ok: false,
        status: 502,
        error:
          "Payment received but couldn't create your calendar booking. " +
          "Please contact us and we'll sort it out.",
      }
    }
    throw err
  }
}

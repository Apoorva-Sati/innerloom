import { getDb } from "./neon"

export interface CreateBookingData {
  contactId: string       // UUID FK → contact_inquiries.id
  date: string            // YYYY-MM-DD in the visitor's local timezone
  timeSlot: string        // Full ISO UTC string used as Cal.com start time
  timezone: string        // IANA timezone
  sessionType: "free" | "paid"
  message?: string
}

export interface BookingDbResult {
  success: boolean
  id?: string // UUID
  error?: string
}

export async function createPendingBooking(
  data: CreateBookingData,
): Promise<BookingDbResult> {
  try {
    const sql = getDb()
    const rows = await sql`
      INSERT INTO bookings
        (contact_id, date, time_slot, timezone, session_type, message, status)
      VALUES (
        ${data.contactId},
        ${data.date},
        ${data.timeSlot},
        ${data.timezone},
        ${data.sessionType},
        ${data.message ?? null},
        'pending'
      )
      RETURNING id
    `
    return { success: true, id: rows[0]?.id as string }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown DB error",
    }
  }
}

export async function markBookingConfirmed(
  id: string,
  calBookingUid: string,
): Promise<BookingDbResult> {
  try {
    const sql = getDb()
    await sql`
      UPDATE bookings
      SET status = 'confirmed', cal_booking_uid = ${calBookingUid}
      WHERE id = ${id}
    `
    return { success: true, id }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown DB error",
    }
  }
}

export async function markBookingFailed(id: string): Promise<BookingDbResult> {
  try {
    const sql = getDb()
    await sql`
      UPDATE bookings
      SET status = 'failed'
      WHERE id = ${id}
    `
    return { success: true, id }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown DB error",
    }
  }
}

// Returns the status of the contact's existing free booking, or null if none.
// Used to give specific user-facing errors before the DB unique constraint fires.
export async function getFreeBookingStatus(
  contactId: string,
): Promise<string | null> {
  try {
    const sql = getDb()
    const rows = await sql`
      SELECT status FROM bookings
      WHERE contact_id = ${contactId}
        AND session_type = 'free'
      LIMIT 1
    `
    return rows.length > 0 ? (rows[0].status as string) : null
  } catch {
    return null
  }
}

// ── Paid-booking functions ────────────────────────────────────────────────────

export interface CreatePaidBookingData {
  contactId: string  // must reference an existing contact_inquiries row
  date:      string  // YYYY-MM-DD local date
  timeSlot:  string  // full ISO UTC string used as Cal.com start
  timezone:  string  // IANA timezone
  message?:  string
}

export async function createPendingPaidBooking(
  data: CreatePaidBookingData,
): Promise<BookingDbResult> {
  try {
    const sql = getDb()
    const rows = await sql`
      INSERT INTO bookings
        (contact_id, date, time_slot, timezone, session_type, message, status)
      VALUES (
        ${data.contactId},
        ${data.date},
        ${data.timeSlot},
        ${data.timezone},
        'paid',
        ${data.message ?? null},
        'pending'
      )
      RETURNING id
    `
    return { success: true, id: rows[0]?.id as string }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown DB error",
    }
  }
}

// Gate check for business rule #1: paid sessions require a prior confirmed
// free discovery call.
export async function hasConfirmedFreeBooking(
  contactId: string,
): Promise<boolean> {
  try {
    const sql = getDb()
    const rows = await sql`
      SELECT 1 FROM bookings
      WHERE contact_id  = ${contactId}
        AND session_type = 'free'
        AND status       = 'confirmed'
      LIMIT 1
    `
    return rows.length > 0
  } catch {
    return false
  }
}

export async function attachRazorpayOrder(
  bookingId: string,
  orderId:   string,
): Promise<BookingDbResult> {
  try {
    const sql = getDb()
    await sql`
      UPDATE bookings
      SET razorpay_order_id = ${orderId}
      WHERE id = ${bookingId}
    `
    return { success: true, id: bookingId }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown DB error",
    }
  }
}

export async function markPaidBookingConfirmed(
  bookingId:    string,
  paymentId:    string,
  calBookingUid: string,
): Promise<BookingDbResult> {
  try {
    const sql = getDb()
    await sql`
      UPDATE bookings
      SET status              = 'confirmed',
          razorpay_payment_id = ${paymentId},
          cal_booking_uid     = ${calBookingUid}
      WHERE id = ${bookingId}
    `
    return { success: true, id: bookingId }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown DB error",
    }
  }
}

// Used by payment verify + webhook to read the booking with contact details
// needed to create the Cal.com event after payment is confirmed.
export interface BookingWithContact {
  id:       string
  timeSlot: string
  timezone: string
  status:   string
  message:  string | null
  name:     string
  email:    string
}

export async function getBookingWithContact(
  bookingId: string,
): Promise<BookingWithContact | null> {
  try {
    const sql = getDb()
    const rows = await sql`
      SELECT
        b.id,
        b.time_slot  AS "timeSlot",
        b.timezone,
        b.status,
        b.message,
        c.name,
        c.email
      FROM bookings b
      JOIN contact_inquiries c ON c.id = b.contact_id
      WHERE b.id = ${bookingId}
      LIMIT 1
    `
    return rows.length > 0 ? (rows[0] as BookingWithContact) : null
  } catch {
    return null
  }
}

// ── Removes a failed free booking so the contact can retry. ──────────────────
// Best-effort — the unique index will catch any edge case where it persists.
export async function deleteFreeFailedBooking(contactId: string): Promise<void> {
  try {
    const sql = getDb()
    await sql`
      DELETE FROM bookings
      WHERE contact_id = ${contactId}
        AND session_type = 'free'
        AND status = 'failed'
    `
  } catch {
    // intentionally swallowed
  }
}

import { getDb } from "./neon"

export interface ContactData {
  name: string
  email: string
  phone?: string
  consent: boolean
}

export interface ContactResult {
  success: boolean
  id?: string // UUID
  error?: string
}

// Find an existing contact by email (most recent first) or create a new one.
// Returns the UUID in both cases so callers can FK into bookings.
export async function findOrCreateContact(
  data: ContactData,
): Promise<ContactResult> {
  try {
    const sql = getDb()

    const existing = await sql`
      SELECT id FROM contact_inquiries
      WHERE email = ${data.email}
      ORDER BY created_at DESC
      LIMIT 1
    `

    if (existing.length > 0) {
      return { success: true, id: existing[0].id as string }
    }

    const rows = await sql`
      INSERT INTO contact_inquiries (name, email, phone, consent)
      VALUES (
        ${data.name},
        ${data.email},
        ${data.phone ?? null},
        ${data.consent}
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

// ── Backward-compat shim for /api/contact/route.ts ───────────────────────────
// That route is retained as-is; it calls saveSubmission which now delegates
// to findOrCreateContact under the hood.

export interface SubmissionData {
  name: string
  email: string
  phone?: string
  consent: boolean
}

export interface SaveResult {
  success: boolean
  id?: string
  error?: string
}

export async function saveSubmission(data: SubmissionData): Promise<SaveResult> {
  return findOrCreateContact(data)
}

import { getDb } from "./neon"

export interface SubmissionData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface SaveResult {
  success: boolean
  id?: number
  error?: string
}

/**
 * Insert a contact form submission into the `contact_submissions` table.
 * Call this AFTER the Resend email succeeds — a DB failure should never
 * surface to the user (caller decides how to handle the result).
 */
export async function saveSubmission(
  data: SubmissionData
): Promise<SaveResult> {
  try {
    const sql = getDb()

    const rows = await sql`
      INSERT INTO contact_submissions (name, email, phone, message)
      VALUES (
        ${data.name},
        ${data.email},
        ${data.phone ?? null},
        ${data.message}
      )
      RETURNING id
    `

    const id = rows[0]?.id as number | undefined
    return { success: true, id }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown DB error",
    }
  }
}
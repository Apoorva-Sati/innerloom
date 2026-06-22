import { NextRequest, NextResponse } from "next/server"
import { ContactSchema } from "@/lib/validations/contact"
import crypto from "crypto"
import { createClient } from "@/lib/supabase/server"
import { sendContactNotification } from "@/lib/resend/send"

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex")
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // ── 1. Honeypot check ───────────────────────────────────────────
    // If the hidden _honey field is filled in, it's a bot.
    // Return 200 silently so bots think they succeeded.
    if (body._honey) {
      return NextResponse.json({ ok: true })
    }

    // ── 2. Validate with Zod ────────────────────────────────────────
    const result = ContactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // Pull out fields that shouldn't go to the DB
    const { _honey: _h, consent: _c, ...dbData } = result.data

    // ── 3. Save to Supabase ─────────────────────────────────────────
    const supabase = await createClient()
    const ip = req.headers.get("x-forwarded-for") ?? "unknown"

    const { error: dbError } = await supabase
      .from("contact_inquiries")
      .insert({
        ...dbData,
        ip_hash: hashIp(ip),
      })

    if (dbError) {
      console.error("[Supabase] Insert failed:", dbError)
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      )
    }
    await sendContactNotification(dbData)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from "next/server"
import { ContactSchema } from "@/lib/validations/contact"
import { sendContactNotification } from "@/lib/resend/send"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Honeypot — bots fill this hidden field, humans never see it
    if (body._honey) {
      return NextResponse.json({ ok: true }) // silent discard
    }

    // 2. Validate with Zod
    const result = ContactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // Strip fields that shouldn't go in the email
    const { _honey: _h, consent: _c, ...formData } = result.data

    // 3. Send email via Resend
    const emailResult = await sendContactNotification(formData)

    if (!emailResult.success) {
      console.error("[Contact API] Email failed:", emailResult.error)
      return NextResponse.json(
        { error: "Failed to send your message. Please try WhatsApp instead." },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
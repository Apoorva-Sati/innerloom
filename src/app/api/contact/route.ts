import { NextRequest, NextResponse } from "next/server"
import { ContactSchema } from "@/lib/validations/contact"
import { sendContactNotification } from "@/lib/resend/send"
import { saveSubmission } from "@/lib/db/submissions"
import { checkRateLimit } from "@/lib/ratelimit"

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit — key by IP address
    //    x-forwarded-for is set by Vercel/Cloudflare; fallback to "unknown"
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"

    const limit = checkRateLimit(ip)

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: `Too many submissions. Please wait ${Math.ceil(limit.retryAfterSec / 60)} minute(s) before trying again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(limit.retryAfterSec),
          },
        }
      )
    }

    const body = await req.json()

    // 2. Honeypot — bots fill this hidden field, humans never see it
    if (body._honey) {
      return NextResponse.json({ ok: true }) // silent discard
    }

    // 3. Validate with Zod
    const result = ContactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // Strip internal fields before passing downstream
    const { _honey: _h, consent: _c, ...formData } = result.data

    // 4. Send email via Resend — critical path
    //    If this fails, we return an error immediately
    const emailResult = await sendContactNotification(formData)

    if (!emailResult.success) {
      console.error("[Contact API] Email failed:", emailResult.error)
      return NextResponse.json(
        { error: "Failed to send your message. Please try WhatsApp instead." },
        { status: 500 }
      )
    }

    // 5. Persist to Neon — best-effort, non-blocking
    //    A DB failure will NOT surface to the user; the email already went out
    const dbResult = await saveSubmission(formData)

    if (!dbResult.success) {
      console.error("[Contact API] DB save failed:", dbResult.error)
    } else {
      console.log("[Contact API] Submission saved, id:", dbResult.id)
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
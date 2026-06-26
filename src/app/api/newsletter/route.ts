import { NextRequest, NextResponse } from 'next/server'
import { newsletterSchema } from '@/lib/validations/newsletter'
import { insertSubscriber } from '@/lib/db/subscribers'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = newsletterSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { email, name, source, website } = result.data

    // Honeypot check
    if (website) return NextResponse.json({ ok: true })

    // Insert to DB — silent if already subscribed
    try {
      await insertSubscriber({ email, name, source })
    } catch (err: any) {
      if (err?.message?.includes('unique')) {
        return NextResponse.json({ ok: true })
      }
      console.error('Subscriber insert error:', err)
    }

    // Send welcome email
    await resend.emails.send({
      from: 'Parishkriti at Innerloom <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to the Innerloom blog',
      html: `
        <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; color: #4A3728;">
          <h2 style="color: #3D6B6E;">Thank you for subscribing</h2>
          <p>Hi${name ? ` ${name}` : ''},</p>
          <p>
            You're now subscribed to the Innerloom blog — a space for honest, 
            warm writing on mental health, therapy, and everyday wellbeing.
          </p>
          <p>
            I'll be in touch when new posts go up. In the meantime, feel free to
            browse what's already there.
          </p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog" 
             style="display:inline-block; margin-top:16px; padding:12px 24px; 
                    background:#C17B5C; color:white; border-radius:12px; 
                    text-decoration:none; font-family: sans-serif; font-size:14px;">
            Read the blog
          </a>
          <p style="margin-top: 32px; font-size: 13px; color: #9B9590;">
            — Parishkriti Bamrara<br/>
            Counselling Psychologist, Innerloom
          </p>
          <p style="font-size: 11px; color: #C4BDB6; margin-top: 24px;">
            You received this because you signed up at innerloom.in. 
            Reply to this email to unsubscribe.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
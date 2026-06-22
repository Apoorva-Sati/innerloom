import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactData {
  name: string
  email: string
  phone?: string
  session_type: string
  message: string
}

export async function sendContactNotification(data: ContactData) {
  try {
    await resend.emails.send({
      // During testing use: onboarding@resend.dev
      // After domain verification use: noreply@yourdomain.in
      from: "InnerLoom Website <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      replyTo: data.email, // so you can reply directly to the client
      subject: `New enquiry from ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;
          background: #F7F2EB; padding: 32px; border-radius: 12px;">
          <h2 style="color: #3D6B6E; margin-bottom: 4px;">
            New enquiry from ${data.name}
          </h2>
          <p style="color: #7A6859; font-size: 13px; margin-top: 0;">
            Received via InnerLoom contact form
          </p>
          <hr style="border: none; border-top: 1px solid #E8D5C4; margin: 20px 0;" />

          <table style="width: 100%; font-size: 14px; color: #4A3728;">
            <tr>
              <td style="padding: 6px 0; font-weight: 600; width: 140px;">Name</td>
              <td style="padding: 6px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Email</td>
              <td style="padding: 6px 0;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Phone</td>
              <td style="padding: 6px 0;">${data.phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600;">Session type</td>
              <td style="padding: 6px 0; text-transform: capitalize;">
                ${data.session_type}
              </td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #E8D5C4; margin: 20px 0;" />

          <p style="font-weight: 600; color: #4A3728; margin-bottom: 8px;">Message</p>
          <div style="background: white; padding: 16px; border-radius: 8px;
            font-size: 14px; color: #4A3728; line-height: 1.6;">
            ${data.message.replace(/\n/g, "<br/>")}
          </div>

          <p style="font-size: 12px; color: #7A6859; margin-top: 24px;">
            Hit reply to respond directly to ${data.email}
          </p>
        </div>
      `,
    })
  } catch (err) {
    // Log but do NOT throw — the form submission should still succeed
    // even if the notification email fails
    console.error("[Resend] Failed to send notification:", err)
  }
}
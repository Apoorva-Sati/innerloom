import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactData {
  name: string
  email: string
  phone?: string
  age?: number
  message: string
}

interface SendResult {
  success: boolean
  error?: string
}

export async function sendContactNotification(
  data: ContactData
): Promise<SendResult> {
  try {


    const { error } = await resend.emails.send({
      // ─────────────────────────────────────────────────────────────────
      // During testing (before domain verification):
      //   from: "onboarding@resend.dev"
      //
      // After you verify your domain on resend.com, change to:
      //   from: "website@yourdomain.in"
      // ─────────────────────────────────────────────────────────────────
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL!,
      replyTo: data.email,   
      subject: `New enquiry from ${data.name} — InnerLoom`,
      html: buildEmailHtml(data)
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    }
  }
}

// ── Plain HTML email template ─────────────────────────────────────────────────
// Inline styles only — email clients strip <style> tags

function buildEmailHtml(data: ContactData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F2EB;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table width="560" cellpadding="0" cellspacing="0"
          style="background:#FFFFFF;border-radius:12px;overflow:hidden;max-width:100%">

          <!-- Header -->
          <tr>
            <td style="background:#3D6B6E;padding:24px 32px">
              <p style="margin:0;font-size:12px;color:#9BC4C4;
                letter-spacing:0.08em;text-transform:uppercase">
                InnerLoom — New enquiry
              </p>
              <h1 style="margin:6px 0 0;font-size:22px;font-weight:400;color:#FFFFFF">
                ${escapeHtml(data.name)} wants to connect
              </h1>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:24px 32px">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="font-size:14px;color:#4A3728">

                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #EDE5D8;
                    color:#7A6859;width:140px">Email</td>
                  <td style="padding:8px 0;border-bottom:1px solid #EDE5D8">
                    <a href="mailto:${escapeHtml(data.email)}"
                      style="color:#3D6B6E;text-decoration:none">
                      ${escapeHtml(data.email)}
                    </a>
                  </td>
                </tr>

                ${data.age ? `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #EDE5D8;
                    color:#7A6859">Age</td>
                  <td style="padding:8px 0;border-bottom:1px solid #EDE5D8">
                    ${escapeHtml(String(data.age))}
                  </td>
                </tr>` : ""}

                ${data.phone ? `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #EDE5D8;
                    color:#7A6859">Phone</td>
                  <td style="padding:8px 0;border-bottom:1px solid #EDE5D8">
                    ${escapeHtml(data.phone)}
                  </td>
                </tr>` : ""}

              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:0 32px 24px">
              <p style="font-size:12px;font-weight:600;color:#7A6859;
                letter-spacing:0.06em;text-transform:uppercase;margin:0 0 8px">
                Their message
              </p>
              <div style="background:#F7F2EB;border-radius:8px;
                padding:16px;font-size:14px;color:#4A3728;line-height:1.7">
                ${escapeHtml(data.message).replace(/\n/g, "<br>")}
              </div>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 32px 32px">
              <a href="mailto:${escapeHtml(data.email)}"
                style="display:inline-block;background:#C17B5C;color:#FFFFFF;
                  font-size:14px;font-weight:500;padding:12px 24px;
                  border-radius:8px;text-decoration:none">
                Reply to ${escapeHtml(data.name)} →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F7F2EB;padding:16px 32px;
              border-top:1px solid #EDE5D8">
              <p style="margin:0;font-size:12px;color:#7A6859">
                Sent from innerloom.in contact form.
                This email was generated automatically — do not reply to this address.
                Hit the button above to reply directly to ${escapeHtml(data.name)}.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

// Prevent XSS in email HTML
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}
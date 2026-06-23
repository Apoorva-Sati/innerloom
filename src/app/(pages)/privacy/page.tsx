import type { Metadata } from "next"
import { LegalLayout } from "@/components/layout/LegalLayout"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Innerloom collects, uses, and protects your personal information " +
    "when you use our counselling services.",
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <LegalLayout
      badge="Legal"
      title="Privacy Policy"
      subtitle="Your privacy is not just a legal requirement — it is the foundation of the trust this work is built on."
      lastUpdated="June 2025"
    >
      <div className="highlight-box">
        <p>
          <strong>Short version:</strong> We collect only what we need to respond
          to your enquiry and run your sessions. We never sell your data. Everything
          you share is kept confidential within the bounds of our professional and
          ethical obligations.
        </p>
      </div>

      <h2>1. Who we are</h2>
      <p>
        Innerloom is a solo counselling psychology practice operated by{" "}
        <strong>Parishkriti Bamrara</strong>, a certified counselling psychologist based
        in <strong>Dehradun, India</strong>. References to &ldquo;we&rdquo;,
        &ldquo;us&rdquo;, or &ldquo;our&rdquo; in this policy refer to this
        practice.
      </p>
      <p>
        This website is hosted at{" "}
        <strong>{process.env.NEXT_PUBLIC_SITE_URL ?? "innerloom.in"}</strong>.
        You can reach us for any privacy-related questions at{" "}
        <a href="mailto:innerloom16@gmail.com">innerloom16@gmail.com</a>.
      </p>

      <h2>2. What information we collect</h2>
      <p>We collect the following when you submit our contact form:</p>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your phone number (optional)</li>
        <li>The message you write to us</li>
      </ul>
      <p>
        We also automatically collect standard web analytics data through{" "}
        <strong>Plausible Analytics</strong> — a privacy-focused, cookie-free
        analytics tool. This includes approximate country, browser type, and
        pages visited. It does not track individuals and collects no personal
        identifiers.
      </p>
      <p>
        We do <strong>not</strong> use cookies, tracking pixels, or any
        third-party advertising or analytics scripts.
      </p>

      <h2>3. How we use your information</h2>
      <p>The information you submit through the contact form is used solely to:</p>
      <ul>
        <li>Respond to your enquiry</li>
        <li>Schedule and conduct counselling sessions</li>
        <li>Send session-related communications (reminders, notes, follow-ups)</li>
      </ul>
      <p>
        We do not use your information for marketing purposes, and we will never
        share, sell, or rent your personal data to third parties.
      </p>

      <h2>4. Confidentiality in therapy</h2>
      <p>
        All information shared during counselling sessions — whether in person,
        over video call, or in writing — is strictly confidential. We follow the
        ethical guidelines of our professional body and the principles of the
        Mental Healthcare Act, 2017 (India).
      </p>
      <p>
        There are limited circumstances in which confidentiality may need to be
        broken. These include:
      </p>
      <ul>
        <li>
          If we have serious concern that you or someone else is at imminent
          risk of harm
        </li>
        <li>If disclosure is required by a court order</li>
        <li>
          For clinical supervision (in which case your identity is not disclosed)
        </li>
      </ul>
      <p>
        We will always try to discuss this with you first unless doing so would
        put someone at risk.
      </p>

      <h2>5. How we store and protect your data</h2>
      <p>
        Enquiries submitted through the contact form are delivered securely to
        our private email inbox via <strong>Resend</strong>, a transactional
        email service. We do not store form submissions in a public or
        third-party database.
      </p>
      <p>
        Session notes and clinical records are stored securely, accessible only
        to <strong>Parishkriti Bamrara</strong>, and retained for a minimum of 7 years
        as required by professional guidelines, or until you request deletion
        (subject to our legal obligations).
      </p>
      <p>
        Our website is hosted on <strong>Vercel</strong> (USA) and distributed
        via <strong>Cloudflare</strong>. Both services operate under strict data
        security standards. No sensitive therapeutic content is stored on these
        platforms.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Under applicable Indian law (including the Information Technology Act,
        2000 and its rules on sensitive personal data), you have the right to:
      </p>
      <ul>
        <li>Know what personal information we hold about you</li>
        <li>Correct inaccurate information</li>
        <li>
          Request deletion of your personal data (subject to our professional
          record-keeping obligations)
        </li>
        <li>Withdraw consent for us to use your data</li>
      </ul>
      <p>
        To exercise any of these rights, please email us at{" "}
        <a href="mailto:innerloom16@gmail.com">innerloom16@gmail.com</a>. We
        will respond within 30 days.
      </p>

      <h2>7. Third-party services</h2>
      <p>We use the following third-party services to operate this website:</p>
      <ul>
        <li>
          <strong>Resend</strong> — email delivery for contact form submissions
        </li>
        <li>
          <strong>Vercel</strong> — website hosting
        </li>
        <li>
          <strong>Cloudflare</strong> — DNS and content delivery
        </li>
        <li>
          <strong>Plausible Analytics</strong> — privacy-first, cookie-free
          analytics
        </li>
      </ul>
      <p>
        Video sessions are conducted via <strong> Google Meet / Zoom</strong>.
        Please review that platform&rsquo;s own privacy policy for information on
        how your video data is handled.
      </p>

      <h2>8. Children&rsquo;s privacy</h2>
      <p>
        We work with teenagers (13–17) only with the explicit consent of a
        parent or legal guardian. If you are under 18, please have a parent or
        guardian contact us on your behalf.
      </p>
      <p>
        We do not knowingly collect personal information from children under
        the age of 13.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Any changes will be posted
        on this page with an updated date. Continued use of the website after
        changes are posted constitutes your acceptance of the revised policy.
      </p>

      <h2>10. Contact us</h2>
      <p>
        If you have questions about this privacy policy or how we handle your
        data, please contact:
      </p>
      <p>
        <strong>Parishkriti Bamrara</strong>
        <br />
        Innerloom Counselling
        <br />
        <strong>Dehradun, India</strong>
        <br />
        <a href="mailto:innerloom16@gmail.com">innerloom16@gmail.com</a>
      </p>

      <hr />

      <p className="text-[13px] text-[#9A8A7A]">
        This policy is governed by the laws of India. Any disputes arising under
        this policy shall be subject to the jurisdiction of courts in{" "}
        <strong>Dehradun</strong>, India.
      </p>
    </LegalLayout>
  )
}
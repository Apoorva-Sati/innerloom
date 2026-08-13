import type { Metadata } from "next"
import { LegalLayout } from "@/components/layout/LegalLayout"

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms and conditions that govern your use of the Innerloom website " +
    "and counselling services.",
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <LegalLayout
      badge="Legal"
      title="Terms of Use"
      subtitle="Please read these terms carefully before using this website or booking a session."
      lastUpdated="June 2026"
    >
      <div className="highlight-box">
        <p>
          <strong>Short version:</strong> Use this website in good faith. Booking a
          session means agreeing to our cancellation policy. Counselling is not a
          substitute for emergency mental health care — if you are in crisis, please
          contact a helpline or emergency services immediately.
        </p>
      </div>

      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing or using the Innerloom website (
        <strong>{process.env.NEXT_PUBLIC_SITE_URL ?? "innerloom.in"}</strong>) or
        booking a counselling session, you agree to be bound by these Terms of Use.
        If you do not agree, please do not use this website or our services.
      </p>
      <p>
        These terms apply to the website and to all counselling services provided by{" "}
        <strong>Parishkriti Bamrara</strong>, operating as Innerloom, based in{" "}
        <strong>Dehradun, India</strong>.
      </p>

      <h2>2. Nature of the service</h2>
      <p>
        Innerloom provides individual counselling and psychotherapy services. These
        services are offered by a trained and certified counselling psychologist and
        are intended to support your mental and emotional wellbeing.
      </p>
      <p>
        <strong>
          Counselling is not a medical service and does not constitute psychiatric
          treatment or diagnosis.
        </strong>{" "}
        If you require psychiatric assessment, medication, or emergency mental health
        care, you should consult a qualified psychiatrist or visit the nearest hospital.
      </p>
      <p>
        In a mental health crisis or emergency, please contact:
      </p>
      <ul>
        <li>
          <strong>iCall (India):</strong> 9152987821
        </li>
        <li>
          <strong>Vandrevala Foundation:</strong> 1860-2662-345 (24/7)
        </li>
        <li>
          <strong>NIMHANS helpline:</strong> 080-46110007
        </li>
        <li>
          Your nearest hospital emergency department
        </li>
      </ul>

      <h2>3. Eligibility</h2>
      <p>
        You must be at least <strong>18 years old</strong> to book a session
        independently. Clients between the ages of 13 and 17 may access services
        only with the written consent of a parent or legal guardian, who will be
        asked to complete an additional consent form before sessions begin.
      </p>
      <p>
        We do not offer services to individuals under 13 years of age.
      </p>

      <h2>4. Bookings and scheduling</h2>
      <p>
        Sessions are booked by submitting an enquiry through the contact form or via
        WhatsApp. A session is confirmed only after you have received a written
        confirmation from us.
      </p>
      <p>
        The free 15-minute discovery call is available to new clients only and is
        intended to determine whether we are a good fit to work together. It does
        not constitute a full counselling session.
      </p>

      <h2>5. Cancellation and rescheduling</h2>
      <p>
        We ask that you provide at least <strong>24 hours&rsquo; notice</strong> if
        you need to cancel or reschedule a session. This allows us to offer the slot
        to another client.
      </p>
      <ul>
        <li>
          Cancellations with more than 24 hours&rsquo; notice: full refund or
          rescheduling at no charge
        </li>
        <li>
          Cancellations with less than 24 hours&rsquo; notice: the session fee may
          be charged in full
        </li>
        <li>
          No-shows (without any notice): the full session fee will be charged
        </li>
      </ul>
      <p>
        In exceptional circumstances (medical emergencies, bereavement), we will
        use discretion. Please contact us as soon as possible.
      </p>

      <h2>6. Fees and payment</h2>
      <p>
        Session fees are communicated at the time of booking and are subject to
        change. Payment is due before or at the time of each session unless a
        prior arrangement has been made in writing.
      </p>
      <p>
        We currently accept payment via <strong>[UPI]</strong>.
        Receipts are provided on request.
      </p>
      <p>
        We are unable to process insurance claims directly. If your insurer
        covers psychological counselling, we can provide a receipt or letter to
        support your reimbursement claim.
      </p>

      <h2>7. Confidentiality</h2>
      <p>
        All information shared in sessions is confidential. Please refer to our{" "}
        <a href="/privacy">Privacy Policy</a> for full details on how your information
        is collected, stored, and protected, and the limited circumstances in which
        confidentiality may need to be broken.
      </p>

      <h2>8. Online sessions</h2>
      <p>
        Online sessions are conducted via <strong>Google Meet</strong>.
        You are responsible for ensuring you have a stable internet connection and a
        private, confidential space from which to attend.
      </p>
      <p>
        Sessions must not be recorded by the client. Recording by the therapist
        will only ever occur with your explicit prior consent.
      </p>
      <p>
        Technical disruptions (poor connection, power cuts) that interrupt a session
        will be handled on a case-by-case basis. If a session cannot be completed due
        to technical issues on our end, a full reschedule or refund will be offered.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        While we are committed to providing professional, ethical, and high-quality
        counselling services, therapy outcomes cannot be guaranteed. Progress depends
        on many factors, including the nature of the issue, your engagement with the
        process, and external circumstances beyond anyone&rsquo;s control.
      </p>
      <p>
        To the fullest extent permitted by applicable law, Innerloom shall not be
        liable for any indirect, incidental, or consequential damages arising from
        your use of this website or our services.
      </p>
      <p>
        Nothing in these terms limits our liability for gross negligence, wilful
        misconduct, or any liability that cannot be excluded by law.
      </p>

      <h2>10. Intellectual property</h2>
      <p>
        All content on this website — including text, images, design, and
        structure — is the property of Innerloom / <strong>Parishkriti Bamrara</strong>{" "}
        and may not be reproduced, distributed, or used without prior written
        permission.
      </p>

      <h2>11. Links to third-party websites</h2>
      <p>
        This website may contain links to external websites (for example, crisis
        helplines or resource articles). We are not responsible for the content or
        privacy practices of those sites and encourage you to review their policies
        independently.
      </p>

      <h2>12. Changes to these terms</h2>
      <p>
        We reserve the right to update these terms at any time. Updated terms will
        be posted on this page with a revised date. Continued use of the website or
        services after changes are posted constitutes acceptance of the revised terms.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes arising under or
        in connection with these terms shall be subject to the exclusive jurisdiction
        of the courts in <strong>Dehradun</strong>, India.
      </p>

      <h2>14. Contact</h2>
      <p>
        If you have questions about these terms, please contact:
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
        By submitting an enquiry or booking a session, you confirm that you have
        read, understood, and agreed to these Terms of Use and our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </LegalLayout>
  )
}
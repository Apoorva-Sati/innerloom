import type { Metadata } from "next"
import { ContactForm } from "@/components/shared/ContactForm"
import { FadeIn } from "@/components/shared/FadeIn"

export const metadata: Metadata = {
  title: "Book a Session | InnerLoom",
  description:
    "Schedule a 45-minute online counselling session with Parishkriti. " +
    "Pick a time that works for you — confirmed instantly.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/book`,
  },
}

const sessionDetails = [
  { icon: "🎥", title: "Online via video", desc: "Join from anywhere — all you need is a quiet space and a stable connection." },
  { icon: "⏱️", title: "45 minutes", desc: "Each session is a focused, uninterrupted hour for you and your goals." },
  { icon: "🔒", title: "Fully confidential", desc: "Everything shared in session stays between us, in line with professional ethics." },
  { icon: "📅", title: "Flexible scheduling", desc: "Pick a time that fits your week. Reschedule up to 24 hours before the session." },
]

const crisisLines = [
  { name: "iCall (TISS)",          number: "9152987821" },
  { name: "Vandrevala Foundation", number: "1860-2662-345" },
  { name: "AASRA",                 number: "9820466627" },
]

export default function BookPage() {
  return (
    <main>
      {/* Page hero */}
      <FadeIn direction="up">
        <section className="bg-sand px-6 pt-16 pb-12 text-center">
          <p className="mb-3 text-[13px] font-medium tracking-[0.08em] uppercase text-teal-mid">
            Book a session
          </p>
          <h1
            className="
              mb-4 font-display font-light leading-[1.2]
              text-[clamp(32px,5vw,48px)] text-teal
            "
          >
            Ready to begin?
            <br />
            Let&apos;s find your time.
          </h1>
          <p className="mx-auto max-w-130 text-[17px] leading-[1.7] text-brown-mid">
            Fill in the form and pick a slot that works for you.
            You&apos;ll get a confirmation email the moment it&apos;s booked.{" "}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=Hi%2C+I'd+like+to+book+a+session`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal no-underline"
            >
              Prefer WhatsApp? →
            </a>
          </p>
        </section>
      </FadeIn>

      {/* Two-column layout: form + sidebar */}
      <FadeIn direction="up" delay={0.1}>
        <section
          className="
            mx-auto grid max-w-250 items-start gap-12
            px-6 pt-12 pb-20
            grid-cols-1 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]
          "
        >
          {/* Left: booking form */}
          <div>
            <h2 className="mb-6 font-display text-2xl font-normal text-teal">
              Schedule your session
            </h2>
            <ContactForm sessionType="paid" />
          </div>

          {/* Right: sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Session details */}
            <div className="rounded-2xl border border-peach bg-ivory p-6">
              <h3 className="mb-4 font-display text-xl font-normal text-teal">
                What to expect
              </h3>
              {sessionDetails.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${i < sessionDetails.length - 1 ? "mb-4" : ""}`}
                >
                  <span className="shrink-0 text-xl">{item.icon}</span>
                  <div>
                    <p className="mb-0.5 text-sm font-medium text-brown">
                      {item.title}
                    </p>
                    <p className="text-[13px] leading-normal text-brown-mid">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* First time? */}
            <div className="rounded-xl border border-[#B8D8D8] bg-[#EBF4F4] px-5 py-4">
              <p className="text-[13px] leading-[1.6] text-teal">
                🌱 <strong>First time here?</strong> Start with a free 15-minute
                discovery call on the{" "}
                <a href="/contact" className="font-medium underline">
                  contact page
                </a>{" "}
                to make sure we&apos;re a good fit before booking a full session.
              </p>
            </div>

            {/* Confidentiality */}
            <div className="rounded-xl border border-peach bg-ivory px-5 py-4">
              <p className="text-[13px] leading-[1.6] text-brown-mid">
                🔒 <strong className="text-brown">Confidential:</strong> Everything
                you share is private. I follow strict professional and ethical
                guidelines to protect your information.
              </p>
            </div>

            {/* Crisis box */}
            <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-5 py-4">
              <p className="mb-2 text-[13px] font-medium text-[#B91C1C]">
                In crisis? Immediate help is available:
              </p>
              <ul className="m-0 list-none p-0">
                {crisisLines.map((line) => (
                  <li
                    key={line.name}
                    className="py-0.5 text-[13px] text-brown-mid"
                  >
                    <strong className="text-brown">{line.name}:</strong>{" "}
                    <a
                      href={`tel:${line.number.replace(/-/g, "")}`}
                      className="font-medium text-[#B91C1C]"
                    >
                      {line.number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </FadeIn>
    </main>
  )
}

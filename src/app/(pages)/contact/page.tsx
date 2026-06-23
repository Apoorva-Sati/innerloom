import type { Metadata } from "next"
import { ContactForm } from "@/components/shared/ContactForm"

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book an online counselling session with Parishkriti. " +
    "Free 15-minute discovery call available. WhatsApp enquiries welcome.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
  },
}

const steps = [
  {
    icon: "📩",
    title: "I receive your message",
    desc: "Your enquiry is saved securely and I get notified right away.",
  },
  {
    icon: "📞",
    title: "I reach out within 24 hrs",
    desc: "I'll reply by email or call to schedule a free 15-min discovery call.",
  },
  {
    icon: "🌿",
    title: "We begin",
    desc: "If we're a good fit, we book your first full session.",
  },
]

const crisisLines = [
  { name: "iCall (TISS)",          number: "9152987821" },
  { name: "Vandrevala Foundation", number: "1860-2662-345" },
  { name: "AASRA",                 number: "9820466627" },
]

export default function ContactPage() {
  return (
    <main>
      {/* ── Page hero ── */}
      <section className="bg-sand px-6 pt-16 pb-12 text-center">
        <p className="mb-3 text-[13px] font-medium tracking-[0.08em] uppercase text-teal-mid">
          Let&apos;s talk
        </p>
        <h1
          className="
            mb-4 font-display font-light leading-[1.2]
            text-[clamp(32px,5vw,48px)] text-teal
          "
        >
          Reaching out takes courage.
          <br />I&apos;ll make it easy.
        </h1>
        <p className="mx-auto max-w-130 text-[17px] leading-[1.7] text-brown-mid">
          Fill in the form below and I&apos;ll reply within 24 hours. Prefer
          WhatsApp?{" "}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=Hi%2C+I'd+like+to+book+a+session`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal no-underline"
          >
            Message me directly →
          </a>
        </p>
      </section>

      {/* ── Two-column layout: form + sidebar ── */}
      <section
        className="
          mx-auto grid max-w-250 items-start gap-12
          px-6 pt-12 pb-20
          grid-cols-1 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]
        "
      >
        {/* Left: form */}
        <div>
          <h2
            className="
              mb-6 font-display
              text-2xl font-normal text-teal
            "
          >
            Send me a message
          </h2>
          <ContactForm />
        </div>

        {/* Right: sidebar info */}
        <aside className="flex flex-col gap-6">
          {/* What happens next */}
          <div className="rounded-2xl border border-peach bg-ivory p-6">
            <h3
              className="
                mb-4 font-display
                text-xl font-normal text-teal
              "
            >
              What happens next?
            </h3>
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex gap-3 ${i < steps.length - 1 ? "mb-4" : ""}`}
              >
                <span className="shrink-0 text-xl">{step.icon}</span>
                <div>
                  <p className="mb-0.5 text-sm font-medium text-brown">
                    {step.title}
                  </p>
                  <p className="text-[13px] leading-normal text-brown-mid">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Confidentiality note */}
          <div className="rounded-xl border border-[#B8D8D8] bg-[#EBF4F4] px-5 py-4">
            <p className="text-[13px] leading-[1.6] text-teal">
              🔒 <strong>Confidential:</strong> Everything you share is private.
              I follow strict professional and ethical guidelines to protect your
              information.
            </p>
          </div>

          {/* Response time */}
          <div className="rounded-xl border border-peach bg-ivory px-5 py-4">
            <p className="text-[13px] leading-[1.6] text-brown-mid">
              ⏰ <strong className="text-brown">Response time:</strong>{" "}
              I reply within 24 hours on weekdays. For urgent support, please use
              the crisis lines below.
            </p>
          </div>

          {/* Crisis box */}
          <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-5 py-4">
            <p className="mb-2 text-[13px] font-medium text-[#B91C1C]">
              In crisis? Immediate help is available:
            </p>
            <ul className="m-0 list-none p-0">
              {crisisLines.map((line) => (
                <li key={line.name} className="py-0.5 text-[13px] text-brown-mid">
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
    </main>
  )
}
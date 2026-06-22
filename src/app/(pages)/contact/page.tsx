import type { Metadata } from "next"
import { ContactForm } from "@/components/shared/ContactForm"

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book an online or in-person counselling session with Apoorva. " +
    "Free 15-minute discovery call available. WhatsApp enquiries welcome.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
  },
}

export default function ContactPage() {
  return (
    <main>
      {/* ── Page hero ── */}
      <section
        style={{
          background: "var(--color-sand, #EDE5D8)",
          padding: "64px 24px 48px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#5A8A8D",
            marginBottom: "12px",
          }}
        >
          Let&apos;s talk
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 300,
            color: "#3D6B6E",
            marginBottom: "16px",
            lineHeight: 1.2,
          }}
        >
          Reaching out takes courage.
          <br />I&apos;ll make it easy.
        </h1>
        <p
          style={{
            fontSize: "17px",
            color: "#7A6859",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Fill in the form below and I&apos;ll reply within 24 hours. Prefer
          WhatsApp?{" "}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=Hi%2C+I'd+like+to+book+a+session`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#3D6B6E", fontWeight: 500, textDecoration: "none" }}
          >
            Message me directly →
          </a>
        </p>
      </section>

      {/* ── Two-column layout: form + sidebar ── */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "48px 24px 80px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: "48px",
          alignItems: "start",
        }}
      >
        {/* Left: form */}
        <div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "24px",
              fontWeight: 400,
              color: "#3D6B6E",
              marginBottom: "24px",
            }}
          >
            Send me a message
          </h2>
          <ContactForm />
        </div>

        {/* Right: sidebar info */}
        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* What happens next */}
          <div
            style={{
              background: "#F7F2EB",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid #E8D5C4",
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "20px",
                fontWeight: 400,
                color: "#3D6B6E",
                marginBottom: "16px",
              }}
            >
              What happens next?
            </h3>
            {[
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
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: i < 2 ? "16px" : 0,
                }}
              >
                <span style={{ fontSize: "20px", flexShrink: 0 }}>
                  {step.icon}
                </span>
                <div>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#4A3728",
                      marginBottom: "2px",
                    }}
                  >
                    {step.title}
                  </p>
                  <p style={{ fontSize: "13px", color: "#7A6859", lineHeight: 1.5 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Confidentiality note */}
          <div
            style={{
              background: "#EBF4F4",
              borderRadius: "12px",
              padding: "16px 20px",
              border: "1px solid #B8D8D8",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#3D6B6E",
                lineHeight: 1.6,
              }}
            >
              🔒 <strong>Confidential:</strong> Everything you share is private.
              I follow strict professional and ethical guidelines to protect your
              information.
            </p>
          </div>

          {/* Response time */}
          <div
            style={{
              background: "#F7F2EB",
              borderRadius: "12px",
              padding: "16px 20px",
              border: "1px solid #E8D5C4",
            }}
          >
            <p style={{ fontSize: "13px", color: "#7A6859", lineHeight: 1.6 }}>
              ⏰ <strong style={{ color: "#4A3728" }}>Response time:</strong>{" "}
              I reply within 24 hours on weekdays. For urgent support, please use
              the crisis lines below.
            </p>
          </div>

          {/* Crisis box */}
          <div
            style={{
              background: "#FEF2F2",
              borderRadius: "12px",
              padding: "16px 20px",
              border: "1px solid #FECACA",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#B91C1C",
                marginBottom: "8px",
              }}
            >
              In crisis? Immediate help is available:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { name: "iCall (TISS)", number: "9152987821" },
                { name: "Vandrevala Foundation", number: "1860-2662-345" },
                { name: "AASRA", number: "9820466627" },
              ].map((line) => (
                <li
                  key={line.name}
                  style={{
                    fontSize: "13px",
                    color: "#7A6859",
                    padding: "3px 0",
                  }}
                >
                  <strong style={{ color: "#4A3728" }}>{line.name}:</strong>{" "}
                  <a
                    href={`tel:${line.number.replace(/-/g, "")}`}
                    style={{ color: "#B91C1C", fontWeight: 500 }}
                  >
                    {line.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* ── Mobile: stack columns ── */}
      <style>{`
        @media (max-width: 700px) {
          section:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
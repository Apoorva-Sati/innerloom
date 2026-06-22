import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section style={{
      background: "var(--color-sand)",
      padding: "80px 24px",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px", alignItems: "center" }}>

        <div>
          <p style={{ color: "var(--color-teal-mid)",
            fontSize: "14px", fontWeight: 500,
            marginBottom: "12px", letterSpacing: "0.05em",
            textTransform: "uppercase" }}>
            Online & In-person · India
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 300, lineHeight: 1.2,
            color: "var(--color-teal)",
            marginBottom: "20px",
          }}>
            You don't have to carry this alone.
          </h1>
          <p style={{ fontSize: "18px",
            color: "var(--color-brown-mid)",
            marginBottom: "32px", lineHeight: 1.7 }}>
            A safe, confidential space to talk — for young adults,
            students, and professionals ready to feel better.
          </p>
          <div style={{ display: "flex", gap: "12px",
            flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              Book a free 15-min call
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn about me
            </Link>
          </div>
        </div>

        <div>
          <Image
            src="/images/hero-photo.jpg"
            alt="[Name], Counselling Psychologist"
            width={500} height={600}
            priority
            style={{ borderRadius: "var(--radius-xl)",
              width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  )
}
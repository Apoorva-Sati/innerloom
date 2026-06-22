// src/components/home/AboutSnippet.tsx
import Image from "next/image"
import Link from "next/link"

export default function AboutSnippet() {
  return (
    <section
      style={{
        background: "var(--color-peach)",
        padding: "72px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "56px",
          alignItems: "center",
        }}
      >
        {/* Photo */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: "-10px -10px 10px 10px",
              border: "1.5px solid var(--color-terra)",
              borderRadius: "var(--radius-xl)",
              opacity: 0.35,
              pointerEvents: "none",
            }}
          />
          <Image
            src="/images/about-photo.jpg"
            alt="[Name], Counselling Psychologist"
            width={420}
            height={500}
            style={{
              borderRadius: "var(--radius-xl)",
              width: "100%",
              height: "auto",
              display: "block",
              position: "relative",
            }}
          />
        </div>

        {/* Copy */}
        <div>
          <p
            style={{
              color: "var(--color-terra)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            A little about me
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 300,
              lineHeight: 1.25,
              color: "var(--color-teal)",
              marginBottom: "20px",
            }}
          >
            I believe healing happens in a space where you feel truly heard.
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "var(--color-brown-mid)",
              lineHeight: 1.75,
              marginBottom: "14px",
            }}
          >
            I'm a counselling psychologist with a 120-hour CBT certification,
            working with young adults, students, and professionals across India —
            both online and in person.
          </p>

          <p
            style={{
              fontSize: "16px",
              color: "var(--color-brown-mid)",
              lineHeight: 1.75,
              marginBottom: "32px",
            }}
          >
            My approach is warm, collaborative, and rooted in evidence-based
            therapy. I draw on Cognitive Behavioural Therapy alongside other
            methods, tailoring each session to what you actually need.
          </p>

          <Link href="/about" className="btn-secondary" style={{ display: "inline-block" }}>
            Learn more about me →
          </Link>
        </div>
      </div>
    </section>
  )
}
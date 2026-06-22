import Image from "next/image"
import Link  from "next/link"

export function AboutHero() {
  return (
    <section style={{
      background: "var(--color-sand)",
      padding: "80px 24px",
    }}>
      <div style={{
        maxWidth: "900px", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: "56px", alignItems: "center",
      }}>

        <div>
          <p style={{
            color: "var(--color-teal-mid)", fontSize: "13px",
            fontWeight: "500", textTransform: "uppercase",
            letterSpacing: "0.06em", marginBottom: "12px",
          }}>
            About me
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: "300", lineHeight: "1.2",
            color: "var(--color-teal)", marginBottom: "20px",
          }}>
            I'm [Name], and I'm glad you're here.
          </h1>
          <p style={{
            fontSize: "17px", color: "var(--color-brown-mid)",
            lineHeight: "1.8", marginBottom: "14px",
          }}>
            I'm a counselling psychologist based in [City], working with
            young adults, students, and professionals who are navigating
            anxiety, burnout, relationship stress, and life transitions.
          </p>
          <p style={{
            fontSize: "17px", color: "var(--color-brown-mid)",
            lineHeight: "1.8", marginBottom: "32px",
          }}>
            I believe therapy should feel like a conversation — warm,
            non-judgmental, and rooted in what actually works. My training
            is in Cognitive Behavioural Therapy (CBT), but I bring the
            whole person into the room.
          </p>
          <Link href="/contact" className="btn-primary">
            Book a free call
          </Link>
        </div>

        <div>
          <Image
            src="/images/about-photo.jpg"
            alt="[Name], Counselling Psychologist"
            width={320} height={400}
            priority
            style={{
              borderRadius: "var(--radius-xl)",
              width: "100%", height: "auto",
              objectFit: "cover",
            }}
          />
        </div>

      </div>
    </section>
  )
}
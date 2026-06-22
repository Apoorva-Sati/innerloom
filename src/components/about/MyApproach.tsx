const pillars = [
  {
    icon: "🧠",
    title: "Cognitive Behavioural Therapy (CBT)",
    desc: "We work together to identify unhelpful thinking patterns and " +
          "replace them with more balanced, realistic ones — at a pace that " +
          "feels right for you.",
  },
  {
    icon: "💬",
    title: "Person-centred listening",
    desc: "Before techniques, there is understanding. Every session starts " +
          "with you — your words, your story, your experience.",
  },
  {
    icon: "🌿",
    title: "Culturally sensitive care",
    desc: "I understand the unique pressures of growing up in India — family " +
          "expectations, academic stress, and the gap between who you are " +
          "and who you're expected to be.",
  },
  {
    icon: "🔒",
    title: "Confidentiality, always",
    desc: "Everything shared in session stays in session. Your privacy is " +
          "not just ethical practice — it's the foundation of this work.",
  },
]

export function MyApproach() {
  return (
    <section style={{ padding: "72px 24px", background: "var(--color-ivory)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p style={{
          color: "var(--color-teal-mid)", fontSize: "13px",
          fontWeight: "500", textTransform: "uppercase",
          letterSpacing: "0.06em", textAlign: "center",
          marginBottom: "10px",
        }}>How I work</p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px, 4vw, 38px)",
          fontWeight: "300", textAlign: "center",
          color: "var(--color-teal)", marginBottom: "48px",
        }}>
          My approach to therapy
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "24px",
        }}>
          {pillars.map((p) => (
            <div
              key={p.title}
              style={{
                background: "var(--color-sand)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                display: "flex", gap: "16px",
              }}
            >
              <div style={{ fontSize: "28px", flexShrink: "0" }}>{p.icon}</div>
              <div>
                <h3 style={{
                  fontSize: "16px", color: "var(--color-teal)",
                  marginBottom: "8px", fontFamily: "var(--font-display)",
                  fontWeight: "500",
                }}>{p.title}</h3>
                <p style={{
                  fontSize: "14px", color: "var(--color-brown-mid)",
                  lineHeight: "1.7",
                }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
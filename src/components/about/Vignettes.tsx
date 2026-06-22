const stories = [
  {
    persona: "A software engineer, 26",
    challenge: "Burnout & imposter syndrome at a startup",
    outcome:
      "After 8 sessions, she was able to set boundaries with her " +
      "manager, sleep better, and rediscover what she actually loved " +
      "about her work.",
  },
  {
    persona: "A final-year student, 22",
    challenge: "Exam anxiety & family pressure around placements",
    outcome:
      "He learned to separate his self-worth from his results. He " +
      "sat his exams, got placed — and stopped dreading Monday mornings.",
  },
  {
    persona: "A homemaker, 34",
    challenge: "Loss of identity after leaving a career to raise children",
    outcome:
      "Through therapy she reconnected with her values, started a small " +
      "creative project, and stopped waiting for permission to feel fulfilled.",
  },
]

export function Vignettes() {
  return (
    <section style={{ padding: "72px 24px", background: "var(--color-ivory)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p style={{
          color: "var(--color-teal-mid)", fontSize: "13px",
          fontWeight: "500", textTransform: "uppercase",
          letterSpacing: "0.06em", textAlign: "center",
          marginBottom: "10px",
        }}>
          Stories of change
        </p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px, 4vw, 38px)",
          fontWeight: "300", textAlign: "center",
          color: "var(--color-teal)", marginBottom: "12px",
        }}>
          People I've worked with
        </h2>
        <p style={{
          textAlign: "center", fontSize: "13px",
          color: "var(--color-brown-mid)", marginBottom: "48px",
        }}>
          All stories are anonymised composites. Identifying details have been changed.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}>
          {stories.map((s) => (
            <div
              key={s.persona}
              style={{
                background: "var(--color-sand)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                borderTop: "3px solid var(--color-terra)",
              }}
            >
              <p style={{
                fontSize: "12px", color: "var(--color-terra)",
                fontWeight: "600", textTransform: "uppercase",
                letterSpacing: "0.05em", marginBottom: "6px",
              }}>{s.persona}</p>
              <p style={{
                fontSize: "14px", fontWeight: "600",
                color: "var(--color-teal)", marginBottom: "12px",
              }}>{s.challenge}</p>
              <p style={{
                fontSize: "14px", color: "var(--color-brown-mid)",
                lineHeight: "1.7",
              }}>{s.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
const creds = [
  { label: "Education",    value: "M.A. / M.Sc. Applied Psychology — [University]" },
  { label: "Certification", value: "CBT Practitioner — 120-hour accredited course" },
  { label: "Experience",   value: "5+ years · 300+ individual clients" },
  { label: "Modalities",   value: "CBT · ACT · Mindfulness-based techniques" },
  { label: "Languages",    value: "English · Hindi · [your language]" },
  { label: "Sessions",     value: "Online (pan-India) · In-person ([City])" },
]

export function Credentials() {
  return (
    <section style={{
      background: "var(--color-sand)", padding: "72px 24px",
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px, 4vw, 36px)",
          fontWeight: "300", textAlign: "center",
          color: "var(--color-teal)", marginBottom: "40px",
        }}>
          Qualifications & training
        </h2>
        <dl style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {creds.map((c, i) => (
            <div
              key={c.label}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "16px",
                padding: "18px 0",
                borderBottom: i < creds.length - 1
                  ? "1px solid var(--color-peach)"
                  : "none",
                alignItems: "baseline",
              }}
            >
              <dt style={{
                fontSize: "12px", fontWeight: "600",
                color: "var(--color-teal-mid)",
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>
                {c.label}
              </dt>
              <dd style={{
                fontSize: "15px", color: "var(--color-brown)",
                lineHeight: "1.5",
              }}>
                {c.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}   
const creds = [
  { label: "Education",     value: "M.Sc. Applied Psychology — Doon University" },
  { label: "Certification", value: "CBT Practitioner — 120-hour accredited course" },
  // { label: "Experience",    value: "2+ years · 20+ individual clients" },
  { label: "Modalities",   value: "CBT · Mindfulness-based techniques" },
  { label: "Languages",    value: "English · Hindi" },
  { label: "Sessions",     value: "Online (pan-India)" },
]

export function Credentials() {
  return (
    <section className="bg-sand py-18 px-6">
      <div className="max-w-180 mx-auto">
        <h2
          className="
             font-light text-center
            text-teal mb-10
            text-[clamp(26px,4vw,36px)]
          "
        >
          Qualifications &amp; training
        </h2>

        <dl className="flex flex-col">
          {creds.map((c, i) => (
            <div
              key={c.label}
              className={`
                grid gap-4 py-4.5 items-baseline
                grid-cols-[140px_1fr]
                ${i < creds.length - 1 ? "border-b border-peach" : ""}
              `}
            >
              <dt
                className="
                  text-xs font-semibold tracking-wider uppercase
                  text-teal-mid
                "
              >
                {c.label}
              </dt>
              <dd
                className="text-[15px] leading-relaxed text-brown"
              >
                {c.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
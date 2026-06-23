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
    <section className="bg-ivory px-6 py-18">
      <div className="mx-auto max-w-225">
        <p className="mb-2.5 text-center text-[13px] font-medium uppercase tracking-[0.06em] text-teal-mid">
          How I work
        </p>
        <h2
          className="
            mb-12 text-center font-light
            text-[clamp(26px,4vw,38px)] text-teal
          "
        >
          My approach to therapy
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-(--radius-lg) bg-sand p-7"
            >
              <div className="shrink-0 text-[28px]">{p.icon}</div>
              <div>
                <h3 className="mb-2  text-base font-medium text-teal">
                  {p.title}
                </h3>
                <p className="text-sm leading-[1.7] text-brown-mid">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
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
    <section className="bg-ivory px-6 py-18">
      <div className="mx-auto max-w-225">
        <p className="mb-2.5 text-center text-[13px] font-medium uppercase tracking-[0.06em] text-teal-mid">
          Stories of change
        </p>
        <h2
          className="
            mb-3 text-center font-light
            text-[clamp(26px,4vw,38px)] text-teal
          "
        >
          People I've worked with
        </h2>
        <p className="mb-12 text-center text-[13px] text-brown-mid">
          All stories are anonymised composites. Identifying details have been changed.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <div
              key={s.persona}
              className="rounded-(--radius-lg) border-t-[3px] border-t-terra bg-sand p-7"
            >
              <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-wider text-terra">
                {s.persona}
              </p>
              <p className="mb-3 text-sm font-semibold text-teal">
                {s.challenge}
              </p>
              <p className="text-sm leading-[1.7] text-brown-mid">
                {s.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
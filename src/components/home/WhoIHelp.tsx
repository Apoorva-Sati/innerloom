// src/components/home/WhoIHelp.tsx
const audiences = [
  {
    icon: "🎓",
    title: "Students",
    desc: "Exam stress, career anxiety, college transitions, hostel life struggles.",
  },
  {
    icon: "💼",
    title: "Young professionals",
    desc: "Burnout, workplace pressure, imposter syndrome, work-life balance.",
  },
  {
    icon: "🌱",
    title: "Young adults",
    desc: "Self-esteem, relationships, anxiety, finding direction in your 20s and 30s.",
  },
]

export default function WhoIHelp() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl text-center mb-2">Who I help</h2>
      <p className="text-center text-brown-mid mb-10 text-sm">
        You don't need to have it all figured out to reach out.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {audiences.map(a => (
          <div
            key={a.title}
            className="bg-ivory border border-peach rounded-(--radius-lg) p-6"
          >
            <div className="text-3xl mb-3">{a.icon}</div>
            <h3 className="text-xl text-teal mb-2">{a.title}</h3>
            <p className="text-sm text-brown-mid leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
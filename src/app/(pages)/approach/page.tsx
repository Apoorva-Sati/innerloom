import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'My Counselling Approach | CBT & Person-Centred Therapy',
  description:
    'Discover how Parishkriti Bamrara uses Cognitive Behavioural Therapy and person-centred methods to support your mental wellbeing journey.',
}

const principles = [
  {
    title: 'You are the expert on your own life',
    body: 'My role is not to tell you what to do or how to feel. I bring training, tools, and a structured approach — but you bring the lived experience, the context, and the wisdom. Good therapy is a collaboration.',
  },
  {
    title: 'Warmth before technique',
    body: 'The most important ingredient in therapy is the relationship between therapist and client. Before any technique or framework, I prioritise creating a space where you feel genuinely heard, safe, and unjudged.',
  },
  {
    title: 'Evidence-based and human',
    body: "I draw on approaches that have strong research backing — particularly CBT — but I never apply them mechanically. Every person is different, and the work we do together will be tailored to you, not to a checklist.",
  },
  {
    title: 'Progress, not perfection',
    body: "Therapy isn't about becoming a different person. It's about understanding yourself better, loosening the grip of patterns that no longer serve you, and building a life that feels more like your own.",
  },
]

const approaches = [
  {
    name: 'Cognitive Behavioural Therapy (CBT)',
    tag: 'Primary approach',
    color: '#4A7C6F',
    body: "CBT is one of the most well-researched forms of therapy in the world. It works by exploring the relationship between your thoughts, feelings, and behaviours — and helping you notice and shift patterns that keep you stuck. Sessions are structured and goal-oriented. You'll often have small, manageable things to try between sessions. CBT is particularly effective for anxiety, depression, stress, and perfectionism.",
  },
  {
    name: 'Person-centred therapy',
    tag: 'Relational foundation',
    color: '#8BAF8D',
    body: "Developed by Carl Rogers, person-centred therapy holds that people have an innate capacity for growth — and that the right conditions unlock it. I bring unconditional positive regard, empathy, and genuine presence to every session. This isn't a technique I apply; it's how I show up.",
  },
  {
    name: 'Strengths-based approach',
    tag: 'Lens',
    color: '#C17B5C',
    body: "Rather than focusing only on what's wrong, I also pay attention to what's working — your resilience, your values, the ways you've already navigated difficulty. Building on existing strengths is often more sustainable than trying to fix perceived weaknesses.",
  },
  {
    name: 'Psychoeducation',
    tag: 'Tool',
    color: '#8BAF8D',
    body: "Understanding why you feel the way you do is itself therapeutic. I often share information about how the mind and nervous system work — the science behind anxiety, the function of emotions, the impact of sleep and routine. Knowledge reduces shame and builds agency.",
  },
]

const sessionFlow = [
  {
    step: '01',
    title: 'Discovery call',
    body: 'A free 15-minute call to see if we are a good fit. No pressure, no commitment.',
  },
  {
    step: '02',
    title: 'First session',
    body: "We explore what's brought you to therapy, your background, and what you're hoping to change or understand.",
  },
  {
    step: '03',
    title: 'Setting goals',
    body: 'Together we identify what meaningful progress looks like for you — specific, realistic, and yours.',
  },
  {
    step: '04',
    title: 'Ongoing work',
    body: 'Weekly or fortnightly sessions, with reflection and small practices between them. We check in on progress regularly.',
  },
  {
    step: '05',
    title: 'Wrapping up',
    body: "When you're ready, we end thoughtfully — consolidating what you've learned and building confidence in your own tools.",
  },
]

export default function ApproachPage() {
  return (
    <main className="min-h-screen bg-[#F7F2EB]">
      {/* Header */}
      <section className="px-6 py-20 text-center max-w-2xl mx-auto">
        <span className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase mb-4 block">
          My approach
        </span>
        <h1 className="text-4xl font-serif text-[#2C2C2A] mb-4">
          How I work
        </h1>
        <p className="text-[#6B6560] leading-relaxed">
          Therapy works best when you understand what you're walking into.
          Here's a transparent look at my philosophy, the methods I use, and
          what a typical course of therapy looks like.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-20">

        {/* Philosophy */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
            <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase">
              My philosophy
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl border border-[#E8E0D5] p-6"
              >
                <h3 className="font-serif text-lg text-[#2C2C2A] mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-[#6B6560] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Approaches */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
            <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase">
              Methods I draw on
            </h2>
          </div>
          <div className="space-y-4">
            {approaches.map((a) => (
              <div
                key={a.name}
                className="bg-white rounded-2xl border border-[#E8E0D5] p-6 flex gap-5"
              >
                <div
                  className="w-1 flex-shrink-0 rounded-full"
                  style={{ background: a.color }}
                />
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-medium text-[#2C2C2A]">{a.name}</h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: a.color + '20',
                        color: a.color,
                      }}
                    >
                      {a.tag}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B6560] leading-relaxed">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What a session looks like */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
            <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase">
              What working together looks like
            </h2>
          </div>
          <div className="space-y-3">
            {sessionFlow.map((s, i) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl border border-[#E8E0D5] p-6 flex gap-6 items-start"
              >
                <div className="text-2xl font-serif text-[#E8D5C4] flex-shrink-0 w-8">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-medium text-[#2C2C2A] mb-1">{s.title}</h3>
                  <p className="text-sm text-[#6B6560] leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who I work best with */}
        <section className="bg-[#EEF4F0] rounded-2xl p-8 border border-[#C8DDD0]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
            <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase">
              Who I work best with
            </h2>
          </div>
          <p className="text-[#4A4540] leading-relaxed mb-4">
            I work primarily with <strong>young adults, students, and professionals</strong> — people who are functioning on the outside but struggling on the inside. People who are hard on themselves, who overthink, who feel stuck despite doing everything "right."
          </p>
          <p className="text-[#4A4540] leading-relaxed mb-4">
            Common concerns I work with include anxiety, burnout, low self-esteem, relationship stress, life transitions, academic pressure, and the particular kind of exhaustion that comes from performing okayness for too long.
          </p>
          <p className="text-[#4A4540] leading-relaxed">
            I work with clients across India online.
          </p>
        </section>

      </div>

      {/* CTA */}
      <section className="bg-[#EDE5D8] py-16 text-center px-6">
        <h2 className="text-2xl font-serif text-[#2C2C2A] mb-3">
          Sounds like a fit?
        </h2>
        <p className="text-[#6B6560] mb-6 text-sm">
          The first step is just a conversation. Book a free discovery call and
          we'll take it from there.
        </p>
        <Link href="/contact" className="btn-primary inline-block">
          Book a free discovery call
        </Link>
      </section>
    </main>
  )
}
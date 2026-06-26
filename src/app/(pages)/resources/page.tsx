import type { Metadata } from 'next'
import { FadeIn } from '@/components/shared/FadeIn'

export const metadata: Metadata = {
  title: 'Free Mental Health Resources',
  description:
    'Worksheets, self-assessments, reading lists, and crisis helplines curated by a counselling psychologist for clients in India.',
}

const helplines = [
  { name: 'iCall', number: '9152987821', desc: 'Mon–Sat, 8am–10pm', },
  { name: 'Vandrevala Foundation', number: '1860-2662-345', desc: '24/7, free & confidential', },
  { name: 'AASRA', number: '9820466627', desc: '24/7 crisis support', },
  { name: 'NIMHANS', number: '080-46110007', desc: 'Mental health helpline', },
  { name: 'iCall (WhatsApp)', number: '9152987821', desc: 'WhatsApp support available', },
]

const books = [
  {
    title: 'Feeling Good',
    author: 'David D. Burns',
    desc: 'The classic CBT self-help book. Practical, evidence-based, and genuinely useful for understanding and shifting negative thought patterns.',
  },
  {
    title: 'The Body Keeps the Score',
    author: 'Bessel van der Kolk',
    desc: 'A deeply compassionate look at how trauma lives in the body and what healing actually looks like.',
  },
  {
    title: 'Lost Connections',
    author: 'Johann Hari',
    desc: 'A thoughtful exploration of the real causes of anxiety and depression — and what we can do about them.',
  },
  {
    title: 'Maybe You Should Talk to Someone',
    author: 'Lori Gottlieb',
    desc: 'A therapist goes to therapy. Warm, funny, and deeply human — a great introduction to what therapy is really like.',
  },
  {
    title: 'The Gifts of Imperfection',
    author: 'Brené Brown',
    desc: 'On letting go of who you think you should be and embracing who you are. Particularly helpful for perfectionism and self-worth.',
  },
]

const links = [
  {
    name: 'iCall',
    url: 'https://icallhelpline.org',
    desc: 'Free counselling and mental health support by TISS.',
  },
  {
    name: 'White Swan Foundation',
    url: 'https://www.whiteswanfoundation.org',
    desc: 'Mental health information and resources in Indian context.',
  },
  {
    name: 'Therapize India',
    url: 'https://therapizeindia.com',
    desc: 'Find therapists across India.',
  },
  {
    name: 'Mpower',
    url: 'https://mpowerminds.com',
    desc: 'Mental health services and awareness in India.',
  },
]

const worksheets = [
  {
    title: 'Thought record worksheet',
    desc: 'Track and gently challenge unhelpful thoughts using a simple CBT framework.',
  },
  {
    title: 'Mood diary',
    desc: 'A daily log to help you notice patterns in your emotions and what influences them.',
  },
  {
    title: '5-4-3-2-1 grounding exercise',
    desc: 'A quick sensory grounding technique for moments of anxiety or overwhelm.',
  },
  {
    title: 'Values clarification exercise',
    desc: 'Identify what truly matters to you — a helpful starting point for therapy.',
  },
]

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <FadeIn direction="up">
      {/* Header */}
      <section className="px-6 py-20 text-center max-w-2xl mx-auto">
        <span className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase mb-4 block">
          Resources
        </span>
        <h1 className="text-4xl font-serif text-[#2C2C2A] mb-4">
          Free mental health resources
        </h1>
        <p className="text-[#6B6560] leading-relaxed">
          A curated collection of tools, books, and links to support your
          mental wellbeing — whether or not you're currently in therapy.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-16">

        {/* Crisis helplines */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-terra" />
            <h2 className="text-xs font-medium tracking-widest text-terra uppercase">
              If you're in crisis
            </h2>
          </div>
          <div className="bg-[#FDF6F0] border border-peach rounded-2xl p-6 mb-4">
            <p className="text-sm text-[#6B6560] mb-6">
              If you are in immediate distress or having thoughts of harming
              yourself, please reach out to one of these free helplines. You
              don't have to face this alone.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {helplines.map((h) => (
                <div
                  key={h.name}
                  className="bg-white rounded-xl border border-peach p-4"
                >
                  <div className="font-medium text-[#2C2C2A] text-sm mb-1">
                    {h.name}
                  </div>
                  <div className="text-terra font-semibold text-lg mb-1">
                    {h.number}
                  </div>
                  <div className="text-xs text-[#9B9590]">{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Worksheets */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
            <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase">
              Self-help tools
            </h2>
          </div>
          <p className="text-sm text-[#6B6560] mb-6">
            These are simple exercises I often share with clients. You can use
            them on your own or bring them into our sessions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {worksheets.map((w) => (
              <div
                key={w.title}
                className="bg-white rounded-2xl border border-[#E8E0D5] p-6"
              >
                <div className="font-medium text-[#2C2C2A] mb-2">{w.title}</div>
                <div className="text-sm text-[#6B6560] leading-relaxed">
                  {w.desc}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9B9590] mt-4">
            Downloadable PDF versions coming soon. In the meantime, feel free
            to{' '}
            <a href="/contact" className="text-[#4A7C6F] underline">
              reach out
            </a>{' '}
            and I'll send them to you directly.
          </p>
        </section>

        {/* Reading list */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
            <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase">
              Reading list
            </h2>
          </div>
          <p className="text-sm text-[#6B6560] mb-6">
            Books I return to and recommend to clients. A mix of self-help,
            science, and memoir.
          </p>
          <div className="space-y-4">
            {books.map((b) => (
              <div
                key={b.title}
                className="bg-white rounded-2xl border border-[#E8E0D5] p-6 flex gap-4"
              >
                <div className="w-1 shrink-0 rounded-full bg-sage" />
                <div>
                  <div className="font-medium text-[#2C2C2A]">{b.title}</div>
                  <div className="text-xs text-[#9B9590] mb-2">{b.author}</div>
                  <div className="text-sm text-[#6B6560] leading-relaxed">
                    {b.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Helpful links */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#4A7C6F]" />
            <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase">
              Helpful links
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-[#E8E0D5] p-6 hover:shadow-md transition-shadow group"
              >
                <div className="font-medium text-[#2C2C2A] mb-1 group-hover:text-[#4A7C6F] transition-colors">
                  {l.name} ↗
                </div>
                <div className="text-sm text-[#6B6560]">{l.desc}</div>
              </a>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section className="bg-sand py-16 text-center px-6">
        <h2 className="text-2xl font-serif text-[#2C2C2A] mb-3">
          Ready to take the next step?
        </h2>
        <p className="text-[#6B6560] mb-6 text-sm">
          Resources are a great starting point — but nothing replaces the
          support of working with someone one-on-one.
        </p>
        <a href="/contact" className="btn-primary inline-block">
          Book a session
        </a>
      </section>
      </FadeIn>
    </main>
  )
}
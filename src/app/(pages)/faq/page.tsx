import type { Metadata } from 'next'
import { FadeIn } from '@/components/shared/FadeIn'

export const metadata: Metadata = {
  title: 'FAQs | Counselling Psychologist India',
  description:
    'Answers to common questions about therapy, confidentiality, pricing, first sessions, and online counselling in India.',
}

const faqs = [
  {
    category: 'Getting started',
    items: [
      {
        q: 'How do I know if therapy is right for me?',
        a: "If you're feeling stuck, overwhelmed, or like something isn't quite right — therapy can help. You don't need to be in crisis to benefit from counselling. Many people come to therapy simply because they want to understand themselves better, improve their relationships, or navigate a life transition with more ease.",
      },
      {
        q: 'What happens in the first session?',
        a: "The first session is a chance for us to get to know each other. I'll ask about what's brought you to therapy, a little about your background, and what you're hoping to get out of our work together. There's no pressure to share anything you're not ready for. By the end, we'll have a clearer sense of whether we're a good fit and what working together might look like.",
      },
      {
        q: 'Do you offer a free initial consultation?',
        a: 'Yes — I offer a free 15-minute discovery call before we begin. This is a low-pressure conversation where you can ask any questions you have and get a feel for how I work. You can book this through the contact form or WhatsApp.',
      },
    ],
  },
  {
    category: 'Sessions',
    items: [
      {
        q: 'How long is each session?',
        a: 'Each session is 45 minutes long. This is the standard therapeutic hour and gives us enough time to go deep without feeling rushed.',
      },
      { q: 'How often will we meet?', 
        a: 'Most clients start with weekly sessions to build momentum and establish a strong therapeutic foundation. As we make progress, we can adjust the frequency together based on your goals, needs, and what feels most supportive for you.', 
      },
      {
        q: 'Do you offer online sessions?',
        a: 'Yes, all sessions are available online via video call. Online therapy is just as effective as in-person for most concerns and gives you the flexibility to attend from wherever you feel comfortable.',
      },
    ],
  },
  {
    category: 'Confidentiality',
    items: [
      {
        q: 'Is what I share kept confidential?',
        a: "Yes. Everything you share in our sessions is strictly confidential. I will not share your information with anyone without your consent. The only exceptions are situations where there is a serious and imminent risk of harm to yourself or others — in those cases I am ethically required to take action. I'll always discuss this with you openly.",
      },
      {
        q: 'Will my family or employer find out I am in therapy?',
        a: 'No. Your decision to seek therapy and everything discussed in our sessions is completely private. I will not contact your family, employer, or anyone else without your explicit consent.',
      },
    ],
  },
  {
    category: 'Pricing',
    items: [
      {
        q: 'How much do sessions cost?',
        a: 'Please reach out via the contact form or WhatsApp for current session fees. I believe therapy should be accessible, and I am happy to discuss what works for your situation.',
      },
      {
        q: 'What is your cancellation policy?',
        a: 'I ask for at least 24 hours notice if you need to cancel or reschedule a session. Sessions cancelled with less than 24 hours notice may be charged in full. I understand that life happens — if something urgent comes up, please just let me know as soon as you can.',
      },
    ],
  },
  {
    category: 'About therapy',
    items: [
      {
        q: 'What is Cognitive Behavioural Therapy (CBT)?',
        a: "CBT is an evidence-based approach that looks at the connection between your thoughts, feelings, and behaviours. It helps you identify patterns of thinking that may be keeping you stuck, and gently challenges and reframes them. CBT is practical and goal-oriented — you'll often have small things to try between sessions.",
      },
      {
        q: 'How long will I need to be in therapy?',
        a: "This varies from person to person. Some clients find that 8–12 sessions give them the tools they need. Others prefer to work together for longer. We'll regularly check in on your progress and adjust our plan together. There's no pressure to stay longer than feels right for you.",
      },
      {
        q: 'Is therapy the same as talking to a friend?',
        a: "Therapy offers something different from friendship. A therapist brings professional training, a structured approach, and a space that is entirely focused on you — without the reciprocal dynamic of a friendship. There's no judgement, no advice you didn't ask for, and no risk of burdening someone you care about.",
      },
    ],
  },
]

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://innerloom.in'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap((section) =>
    section.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    }))
  ),
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
<FadeIn direction="up">
      {/* Header */}
      <section className="px-6 py-20 text-center max-w-2xl mx-auto">
        <span className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase mb-4 block">
          FAQs
        </span>
        <h1 className="text-4xl font-serif text-[#2C2C2A] mb-4">
          Common questions
        </h1>
        <p className="text-[#6B6560] leading-relaxed">
          Everything you might want to know before reaching out. If your
          question isn't here, feel free to{' '}
          <a href="/contact" className="text-[#4A7C6F] underline">
            get in touch
          </a>
          .
        </p>
      </section>

      {/* FAQ sections */}
      <section className="max-w-2xl mx-auto px-6 pb-24 space-y-12">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase mb-6">
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.items.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white rounded-2xl border border-[#E8E0D5] px-6 py-5 cursor-pointer"
                >
                  <summary className="flex items-center justify-between gap-4 list-none font-medium text-[#2C2C2A] text-base">
                    {faq.q}
                    <span className="text-[#4A7C6F] text-xl shrink-0 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-[#6B6560] leading-relaxed text-sm">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-sand py-16 text-center px-6">
        <h2 className="text-2xl font-serif text-[#2C2C2A] mb-3">
          Still have questions?
        </h2>
        <p className="text-[#6B6560] mb-6 text-sm">
          I'm happy to answer anything before you commit to a session.
        </p>
        <a href="/contact" className="btn-primary inline-block">
          Get in touch
        </a>
      </section></FadeIn>
    </main>
  )
}

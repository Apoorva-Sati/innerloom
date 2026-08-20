// src/components/home/AboutSnippet.tsx
import Image from "next/image"
import Link from "next/link"

export default function AboutSnippet() {
  return (
    <section className="bg-peach px-6 py-18">
      <div
        className="
          mx-auto grid max-w-275 items-center gap-14
          grid-cols-1 md:grid-cols-[1fr_1.6fr]
        "
      >
        {/* Photo */}
        <div className=" mx-auto w-full max-w-sm md:max-w-none">
          <div/>
          <Image
            src="/images/about-photo.jpg"
            alt="Parishkriti, Counselling Psychologist"
            width={420}
            height={500}
            loading="lazy"
            sizes="(max-width: 768px) 90vw, 420px"
            className=" h-auto w-full rounded-(--radius-xl)"
          />
        </div>

        {/* Copy */}
        <div>
          <p className="mb-3.5 text-[13px] font-medium uppercase tracking-[0.08em] text-terra">
            A little about me
          </p>

          <h2
            className="
              mb-5 font-light leading-tight
              text-[clamp(28px,3.5vw,42px)] text-teal
            "
          >
            I believe healing happens in a space where you feel truly heard.
          </h2>

          <p className="mb-3.5 text-base leading-[1.75] text-brown-mid">
            I'm a counselling psychologist with a 120-hour CBT certification,
            working with young adults, students, and professionals across India — online.
          </p>

          <p className="mb-8 text-base leading-[1.75] text-brown-mid">
            My approach is warm, collaborative, and rooted in evidence-based
            therapy. I draw on Cognitive Behavioural Therapy alongside other
            methods, tailoring each session to what you actually need.
          </p>

          <Link href="/about" className="btn-secondary inline-block">
            Learn more about me →
          </Link>
        </div>
      </div>
    </section>
  )
}
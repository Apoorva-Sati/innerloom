import Image from "next/image"
import Link  from "next/link"

export function AboutMe() {
  return (
    <section className="bg-sand px-6 py-18">
      <div
        className="
          mx-auto grid max-w-225 items-center gap-14
          grid-cols-1 md:grid-cols-[1fr_320px]
        "
      >
        <div>
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.06em] `text-teal-mid">
            About me
          </p>
          <h1
            className="
              mb-5  font-light leading-[1.2]
              text-[clamp(32px,5vw,52px)] text-teal
            "
          >
            I'm Parishkriti, and I'm glad you're here.
          </h1>
          <p className="mb-3.5 text-[17px] leading-[1.8] text-brown-mid">
            I work with young adults, students, and professionals who may be 
            feeling overwhelmed by anxiety, stress, burnout, relationship 
            challenges, or life's many transitions. More than anything, 
            I want therapy to feel like a space where you can simply be yourself.
          </p>
          <p className="mb-8 text-[17px] leading-[1.8] text-brown-mid">
            I'm an "it's okay, take your time" person. I don't believe healing can or should 
            be rushed, and I don't believe every therapy session has to follow a fixed script. 
            I believe the process should unfold at your pace, based on what feels right for you. 
            Some days you may have a lot to share, and on others, you may not know where 
            to begin. Both are completely okay.
          </p>
          <p className="mb-8 text-[17px] leading-[1.8] text-brown-mid">
            You don't have to have the right words to begin. You just have 
            to show up—and we'll take it from there, together.         
          </p>
          <Link href="/contact" className="btn-primary">
            Book a free call
          </Link>
        </div>

        <div>
          <Image
            src="/images/hero-photo.jpg"
            alt="Parishkriti, Counselling Psychologist"
            width={320}
            height={400}
            priority
            className="h-auto w-full rounded-(--radius-xl) object-cover"
          />
        </div>
      </div>
    </section>
  )
}

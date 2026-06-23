import Image from "next/image"
import Link  from "next/link"

export function AboutMe() {
  return (
    <section className="bg-sand px-6 py-20">
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
            I'm a counselling psychologist based in Dehradun, working with
            young adults, students, and professionals who are navigating
            anxiety, burnout, relationship stress, and life transitions.
          </p>
          <p className="mb-8 text-[17px] leading-[1.8] text-brown-mid">
            I believe therapy should feel like a conversation — warm,
            non-judgmental, and rooted in what actually works. My training
            is in Cognitive Behavioural Therapy (CBT), but I bring the
            whole person into the room.
          </p>
          <Link href="/contact" className="btn-primary">
            Book a free call
          </Link>
        </div>

        <div>
          <Image
            src="/images/aboutMe-photo.jpeg"
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
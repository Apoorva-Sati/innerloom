import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-sand px-6 py-20">
      <div className="mx-auto grid max-w-275 items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-teal-mid">
            Online · India
          </p>

          <h1
            className="mb-5 text-[clamp(36px,5vw,56px)] font-light leading-[1.2] text-teal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            You don't have to carry this alone.
          </h1>

          <p className="mb-8 text-lg leading-[1.7] text-brown-mid">
            A safe, confidential space to talk — for young adults,
            students, and professionals ready to feel better.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Book a free 15-min call
            </Link>

            <Link href="/about" className="btn-secondary">
              Learn about me
            </Link>
          </div>
        </div>

        <div>
          <Image
            src="/images/aboutMe-photo.jpeg"
            alt="[Name], Counselling Psychologist"
            width={500}
            height={600}
            priority
            className="h-auto w-full rounded-(--radius-xl)"
          />
        </div>
      </div>
    </section>
  );
}
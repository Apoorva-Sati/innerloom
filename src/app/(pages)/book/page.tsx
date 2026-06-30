import type { Metadata } from "next"
import { FadeIn } from "@/components/shared/FadeIn"
import { CalEmbed } from "@/components/booking/CalEmbed"

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book a free 15-minute discovery call with Parishkriti online. " +
    "Pick a time that works for you — confirmed instantly.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/book`,
  },
}

export default function BookPage() {
  return (
    <main>
      {/* Page hero */}
      {/* Booking embed */}
<FadeIn direction="up" delay={0.1}>
  <section className="mx-auto max-w-250 px-6 pt-12 pb-20">
<div className="overflow-hidden bg-sage rounded-2xl pt-8 pl-2.5">
  <CalEmbed
    calLink="innerloom/discovery-call"
    namespace="discovery-call"
    className="w-full"
  />
</div>

    <p className="mx-auto mt-6 max-w-130 text-center text-[13px] leading-[1.6] text-brown-mid">
      Prefer to message first?{" "}
      <a href="/contact" className="font-medium text-teal no-underline">
        Get in touch →
      </a>
    </p>
  </section>
</FadeIn>
    </main>
  )
}
import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="bg-teal px-6 py-20 text-center">
      <div className="mx-auto max-w-170">
        <h2
          className="mb-4.5 text-[clamp(30px,4vw,48px)] font-light leading-[1.2] text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to feel better?
        </h2>

        <p className="mb-9 text-[17px] leading-[1.7] text-white/80">
          Taking the first step is the hardest part. A free 15-minute discovery
          call costs nothing — and it could change everything.
        </p>

        <div className="mb-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-block rounded-(--radius-lg) bg-terra px-8 py-3.5 text-[15px] font-medium text-white no-underline transition-colors duration-200 hover:opacity-90"
          >
            Book a free 15-min call
          </Link>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=Hi%2C+I%27d+like+to+book+a+session`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-(--radius-lg) border-[1.5px] border-white/55 px-8 py-[13px] text-[15px] font-medium text-white no-underline transition-colors duration-200 hover:border-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.428a.75.75 0 00.914.914l5.579-1.471A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 01-4.953-1.354l-.356-.212-3.31.874.874-3.31-.212-.356A9.73 9.73 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12S17.385 21.75 12 21.75z" />
            </svg>
            WhatsApp me
          </a>
        </div>

        <p className="text-[13px] tracking-[0.02em] text-white/55">
          Confidential · No obligation · Response within 24 hours
        </p>
      </div>
    </section>
  );
}
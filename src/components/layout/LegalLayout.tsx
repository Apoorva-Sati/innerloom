import type { ReactNode } from "react";

interface LegalLayoutProps {
  badge: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({
  badge,
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-sand px-6 pb-12 pt-14 text-center">
        <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.08em] text-teal-mid">
          {badge}
        </p>

        <h1
          className="mb-3 text-[clamp(30px,4vw,44px)] font-light leading-[1.2] text-teal"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {title}
        </h1>

        <p className="mx-auto mb-4 max-w-120 text-[15px] leading-[1.6] text-brown-mid">
          {subtitle}
        </p>

        <p className="text-xs tracking-[0.03em] text-[#9A8A7A]">
          Last updated: {lastUpdated}
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-180 px-6 pb-24 pt-14">
        <div className="legal-prose prose max-w-none">
          {children}
        </div>
      </section>
    </main>
  );
}
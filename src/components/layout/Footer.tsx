import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book a session" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER;

  return (
    <footer className="bg-[#2A4A4C] px-6 pb-8 pt-14 text-white/75">
      <div className="mx-auto max-w-250">
        {/* Top Row */}
        <div className="mb-12 grid gap-8 sm:gap-12 md:grid-cols-[1fr_auto_auto]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-2.5 block text-[22px] font-normal tracking-[0.01em] text-white no-underline"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Innerloom
            </Link>

            <p className="max-w-70 text-sm leading-[1.65] text-white/60">
              Warm, CBT-based counselling for young adults, professionals &amp;
              students — online across India.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-3.5 text-[11px] font-medium uppercase tracking-widest text-white/40">
              Pages
            </p>

            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3.5 text-[11px] font-medium uppercase tracking-widest text-white/40">
              Get in touch
            </p>

            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Send a message
                </Link>
              </li>

              {waNumber && (
                <li>
                  <a
                    href={`https://wa.me/${waNumber}?text=Hi%2C+I'd+like+to+book+a+session`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-green-400 transition-colors hover:text-green-300"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.428a.75.75 0 00.914.914l5.579-1.471A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 01-4.953-1.354l-.356-.212-3.31.874.874-3.31-.212-.356A9.73 9.73 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12S17.385 21.75 12 21.75z" />
                    </svg>

                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
          <p className="m-0 text-[13px] text-white/40">
            © {year} Innerloom. All rights reserved.
          </p>

          <ul className="flex gap-5">
            {legalLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="text-[13px] text-white/40 transition-colors hover:text-white/70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
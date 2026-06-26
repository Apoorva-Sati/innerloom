export function CrisisBanner() {
  const items = [
    "iCall: 9152987821",
    "Vandrevala: 1860-2662-345",
    "AASRA: 9820466627",
  ]

  return (
    <div className="bg-crisis text-white py-2 text-[13px]">
      {/* Desktop — static, all visible */}
      <div className="hidden md:block text-center px-4">
        In crisis?{" "}
        <strong>iCall: 9152987821</strong>
        {" · "}
        <strong>Vandrevala: 1860-2662-345</strong>
        {" · "}
        <strong>AASRA: 9820466627</strong>
        {" — "}Available 24/7
      </div>

      {/* Mobile — marquee */}
      <div className="flex items-center gap-2 md:hidden overflow-hidden">
        <span className="shrink-0 pl-3 font-medium whitespace-nowrap">
          In crisis?
        </span>
        <div className="overflow-hidden flex-1">
          <div
            style={{
              display: 'flex',
              gap: '48px',
              animation: 'marquee 18s linear infinite',
              width: 'max-content',
            }}
          >
            {[...items, ...items].map((item, i) => (
              <span key={i} className="shrink-0 font-semibold whitespace-nowrap">
                {item}
                <span className="font-normal opacity-60 ml-3">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="marquee"] { animation: none; overflow-x: auto; }
        }
      `}</style>
    </div>
  )
}
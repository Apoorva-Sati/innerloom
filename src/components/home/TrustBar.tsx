// src/components/home/TrustBar.tsx
const trustItems = [
  { value: "CBT Certified",     label: "120-hour course" },
  { value: "Confidential",      label: "All sessions private" },
  { value: "Online & In-person", label: "Flexible format" },
  { value: "India-wide",        label: "Serving all states" },
]

export default function TrustBar() {
  return (
    <section className="bg-teal py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20">
        {trustItems.map(item => (
          <div key={item.value} className="flex flex-col items-center text-center px-8">
            <span className="font-display text-[18px] text-white font-medium">{item.value}</span>
            <span className="text-[12px] text-white/75 mt-0.5">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
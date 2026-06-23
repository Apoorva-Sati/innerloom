const steps = [
  { num: "1", title: "Reach out",
    desc: "Fill the form or WhatsApp — no judgement, just a hello." },
  { num: "2", title: "Free discovery call",
    desc: "A 15-minute call to see if we're a good fit. Completely free." },
  { num: "3", title: "Begin your journey",
    desc: "Start weekly sessions — online or in-person, your choice." },
]

export default function HowItWorks() {
  return (
    <section className="`bg-sand py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl text-center mb-10">How it works</h2>
        <div className="flex flex-col md:flex-row items-start gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-col md:flex-row items-start flex-1 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-terra flex items-center justify-center text-terra font-display text-lg font-medium flex-shrink-0">
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block w-px h-0 border-t border-dashed border-peach absolute" />
                )}
              </div>
              <div>
                <h3 className="text-lg text-teal mb-1">{step.title}</h3>
                <p className="text-sm text-brown-mid leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
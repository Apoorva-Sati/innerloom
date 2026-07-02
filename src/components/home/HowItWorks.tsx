const steps = [
  {
    num: "1",
    title: "Reach out",
    desc: "Fill out the form or send a WhatsApp message—no judgment, just a hello.",
  },
  {
    num: "2",
    title: "Free discovery call",
    desc: "A free 15-minute call to see if we're the right fit for each other.",
  },
  {
    num: "3",
    title: "Begin your journey",
    desc: "Start your weekly online therapy sessions.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-sand py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl text-center mb-12">How it works</h2>

        <div className="flex flex-col md:flex-row items-start">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-start flex-1">
              <div className="flex flex-col items-center mr-4">
                <div className="w-10 h-10 rounded-full border-2 border-terra flex items-center justify-center text-terra font-display text-lg font-medium">
                  {step.num}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg text-teal mb-2">{step.title}</h3>
                <p className="text-sm text-brown-mid leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden md:block flex-1 border-t border-dashed border-peach mt-5 mx-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
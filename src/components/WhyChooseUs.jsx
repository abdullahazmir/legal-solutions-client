const features = [
  {
    icon: "⏱️",
    title: "Fast response time",
    desc: "Most lawyers on our platform respond within 24 hours of receiving your request.",
  },
  {
    icon: "✅",
    title: "Verified professionals",
    desc: "Every lawyer is verified with valid bar registration before joining the platform.",
  },
  {
    icon: "🔒",
    title: "Private and secure",
    desc: "Your case details and communications are fully encrypted and confidential.",
  },
  {
    icon: "🌐",
    title: "Multiple languages",
    desc: "Find lawyers who speak your language across a wide range of specializations.",
  },
  {
    icon: "🧾",
    title: "Transparent pricing",
    desc: "See consultation fees upfront — no hidden costs or surprise charges.",
  },
  {
    icon: "🎧",
    title: "Dedicated support",
    desc: "Our support team is available to help you through every step of the process.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-black py-20 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs tracking-widest uppercase text-zinc-600 mb-10">
          Why choose us
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-3"
            >
              <span className="text-2xl">{icon}</span>
              <p className="text-sm font-medium text-zinc-100">{title}</p>
              <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
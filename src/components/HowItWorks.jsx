const steps = [
  {
    icon: "🔍",
    title: "Browse lawyers",
    desc: "Search by specialization, location, or language to find the right fit.",
    step: "01",
  },
  {
    icon: "📄",
    title: "Submit your case",
    desc: "Send a consultation request directly to your chosen lawyer.",
    step: "02",
  },
  {
    icon: "💬",
    title: "Get a response",
    desc: "The lawyer reviews your request and accepts or responds with questions.",
    step: "03",
  },
  {
    icon: "🛡️",
    title: "Get legal help",
    desc: "Work with your lawyer to resolve your legal matter with confidence.",
    step: "04",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-black py-20 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs tracking-widest uppercase text-zinc-600 mb-10">
          How it works
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden">
          {steps.map(({ icon, title, desc, step }) => (
            <div key={step} className="bg-zinc-950 p-7 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg">
                {icon}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-100 mb-1">{title}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
              </div>
              <p className="text-xs text-zinc-700 font-medium mt-auto">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
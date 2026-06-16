const services = [
  {
    id: "blood-donation",
    title: "Blood Donation Camps",
    raised: 325000,
    goal: 800000,
    description: "Regular blood donation camps organized in partnership with medical centers to support emergency needs and ensure adequate blood supply for underprivileged patients.",
    image: "/legacy/bd2.jpg",
    icon: "🩸"
  },
  {
    id: "clothes-donation",
    title: "Clothes & Essentials",
    raised: 210000,
    goal: 600000,
    description: "Collecting and distributing new and gently used clothing, winter wear, and essential items to homeless and low-income families during changing seasons.",
    image: "/legacy/bd3.jpg",
    icon: "👕"
  },
  {
    id: "food-donation",
    title: "Food Donation Drive",
    raised: 510000,
    goal: 1200000,
    description: "Weekly nutrition kits including rice, pulses, oil, and dry rations distributed to urban slums and migrant families to combat hunger and malnutrition.",
    image: "/legacy/bd4.jpg",
    icon: "🍲"
  },
  {
    id: "free-education",
    title: "Free Education Program",
    raised: 420000,
    goal: 1000000,
    description: "Evening learning centers with qualified tutors providing free education, books, uniforms, and scholarships to underprivileged children in rural and urban areas.",
    image: "/legacy/bd1.jpg",
    icon: "📚"
  }
];

function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-[2rem] border border-amber-100 bg-gradient-to-br from-[#fff5e8] via-white to-[#fff1db] p-6 shadow-[0_24px_80px_rgba(255,194,122,0.24)] md:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-800">Services</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-900">Impact programs you can fuel</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Pick a service track and chip in. Each card mirrors our active causes and shows progress toward its goal.
          </p>
        </div>
        <a
          href="/ngo/donation#donation-form"
          className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800"
        >
          Go to donate
        </a>
      </div>

      <div className="mt-7 grid gap-4 sm:gap-5 md:grid-cols-2">
        {services.map((item) => (
          <article
            key={item.id}
            className="flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-amber-100/80 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,161,87,0.25)]"
          >
            <div className="relative h-44 w-full overflow-hidden bg-stone-100 sm:h-52">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-amber-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow">
                <span>{item.icon}</span>
                Active
              </div>
              <div className="absolute right-3 bottom-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-800 shadow">
                Goal ₹{item.goal.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="space-y-2">
                <h3 className="font-serif text-xl text-stone-900">{item.title}</h3>
                <p className="text-sm leading-6 text-stone-600">{item.description}</p>
              </div>
              <div className="rounded-xl border border-amber-50 bg-amber-50/60 px-4 py-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  <span>Raised</span>
                  <span className="text-stone-500">Progress</span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-lg font-semibold text-stone-900">₹{item.raised.toLocaleString("en-IN")}</p>
                  <p className="text-xs text-stone-500">/ ₹{item.goal.toLocaleString("en-IN")}</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white">
                  <div
                    className="h-2 rounded-full bg-amber-500 transition-[width] duration-500"
                    style={{ width: `${Math.min((item.raised / item.goal) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/ngo/donation#donation-form"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800 sm:w-auto"
                >
                  Donate Now
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;

import SectionHeading from "../common/SectionHeading";

function NgoAboutSection() {
  const values = [
    {
      icon: "🎯",
      title: "Our Mission",
      description: "Empower underserved communities through education, healthcare, and cultural engagement using music as a tool for social change."
    },
    {
      icon: "💡",
      title: "Our Vision",
      description: "A society where every individual has access to quality education, healthcare, and opportunities for personal and cultural growth."
    },
    {
      icon: "❤️",
      title: "Our Values",
      description: "We believe in compassion, transparency, community partnership, and sustainable development that creates lasting positive impact."
    }
  ];

  const team = [
    {
      name: "Community Leaders",
      role: "Guiding our initiatives",
      desc: "Experienced professionals leading various programs"
    },
    {
      name: "Volunteers",
      role: "Ground execution",
      desc: "Passionate individuals making real difference daily"
    },
    {
      name: "Partners",
      role: "Strategic collaborators",
      desc: "Organizations working together for greater impact"
    }
  ];

  const timeline = [
    { year: "2019", milestone: "NGO Foundation & First Camp" },
    { year: "2020", milestone: "Pandemic Relief Programs Launched" },
    { year: "2021", milestone: "Education Programs Expanded" },
    { year: "2022", milestone: "Health Camps & Nutrition Initiative" },
    { year: "2023", milestone: "Reached 10,000+ Beneficiaries" },
    { year: "2024", milestone: "National Recognition & Partnerships" }
  ];

  return (
    <section className="space-y-10">
      {/* Main About Content */}
      <div className="rounded-[2rem] border border-white/40 bg-gradient-to-br from-white/80 to-emerald-50/40 p-8 shadow-lg md:p-10">
        <SectionHeading
          eyebrow="About DMS Aarohi NGO"
          title="Building Stronger Communities"
          text="Founded with a heart to serve, DMS Aarohi NGO combines the power of music and culture with social service. We're dedicated to reaching the most underserved communities and creating transformative opportunities."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-4xl">{value.icon}</p>
              <h3 className="mt-3 font-serif text-xl text-stone-900">{value.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {[
          { number: "5+", text: "Years of Impact" },
          { number: "10K+", text: "Lives Transformed" },
          { number: "6", text: "Active Programs" },
          { number: "200+", text: "Dedicated Volunteers" }
        ].map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 text-center shadow-sm"
          >
            <p className="font-serif text-4xl font-bold text-emerald-900">
              {stat.number}
            </p>
            <p className="mt-2 text-sm text-stone-700">{stat.text}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="rounded-[2rem] border border-white/40 bg-white/50 p-8 shadow-lg md:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Our Team
          </p>
          <h2 className="mt-2 font-serif text-3xl text-stone-900">
            Meet the People Behind Our Mission
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member, index) => (
            <div
              key={index}
              className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm"
            >
              <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600" />
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-emerald-700">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {member.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-[2rem] border border-white/40 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 p-8 text-white shadow-lg md:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
            Our Journey
          </p>
          <h2 className="mt-2 font-serif text-3xl">
            Milestones of Change
          </h2>
        </div>

        <div className="relative space-y-6">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-1 bg-emerald-400/30" />

          {timeline.map((item, index) => (
            <div key={index} className="relative flex gap-6 pl-16">
              <div className="absolute left-0 top-2 h-9 w-9 rounded-full border-4 border-emerald-700 bg-emerald-400/30" />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-emerald-200">
                  {item.year}
                </p>
                <p className="mt-1 text-lg text-white">{item.milestone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="rounded-[2rem] border border-amber-200/60 bg-gradient-to-br from-amber-50 to-orange-50/60 p-8 text-center md:p-10">
        <h3 className="font-serif text-2xl text-stone-900 md:text-3xl">
          Join Our Community of Change-Makers
        </h3>
        <p className="mt-3 text-stone-600">
          Whether you want to donate, volunteer, or partner with us, there's a way for everyone to contribute.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <a
            href="#contact"
            className="rounded-full bg-emerald-900 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            Get Involved
          </a>
          <a
            href="#services"
            className="rounded-full border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-900 transition hover:bg-stone-50"
          >
            View Our Programs
          </a>
        </div>
      </div>
    </section>
  );
}

export default NgoAboutSection;

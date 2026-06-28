import { Link } from "react-router-dom";
import SectionHeading from "../../components/common/SectionHeading";
import ScrollReveal from "../../components/common/ScrollReveal";
import { objectives, highlights } from "../../data/siteContent";

const milestones = [
  { year: "2013", title: "Society Founded", desc: "DMS Aarohi Musical Society was registered under the Societies Registration Act, 1860 with a vision to promote Indian music." },
  { year: "2018", title: "Voice of Delhi NCR — Season 1", desc: "The flagship competition was launched, bringing together hundreds of singing talents from across the Delhi NCR region." },
  { year: "2019", title: "Season 2", desc: "Season 2 expanded to more localities, featuring celebrity judges and bigger prize pools." },
  { year: "2021", title: "Voice of Rajasthan — Season 3", desc: "A special edition — Voice of Rajasthan — expanded DMS Aarohi's reach beyond Delhi NCR." },
  { year: "2023", title: "Season 4 — Online Auditions", desc: "Season 4 introduced online auditions for the first time, significantly expanding participant reach." },
  { year: "2026", title: "Season 5 — Grand Finale", desc: "Voice of Delhi NCR Season 5 — Grand Finale on 4th July 2026 at Pearey Lal Bhawan, ITO, New Delhi." },
];

const stats = [
  { number: "13+", label: "Years of Service" },
  { number: "5,000+", label: "Total Participants" },
  { number: "5", label: "Successful Seasons" },
  { number: "100+", label: "Events Organized" },
];

function MusicSocietyOverviewPage() {
  return (
    <div className="space-y-20 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Page Hero */}
      <ScrollReveal direction="up">
        <div className="text-center max-w-4xl mx-auto pt-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            About Us
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 mb-6 leading-tight">
            DMS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              Aarohi
            </span>{" "}
            Musical Society
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            A registered musical society dedicated to discovering, nurturing, and elevating singing talent across Delhi NCR and beyond.
          </p>
        </div>
      </ScrollReveal>

      {/* Stats Row */}
      <ScrollReveal direction="up">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 text-center border border-orange-100 shadow-[0_10px_30px_rgba(234,88,12,0.05)]">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-1">{stat.number}</div>
              <div className="text-xs text-stone-500 font-bold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* About DMS Aarohi */}
      <ScrollReveal direction="up">
        <div className="bg-gradient-to-br from-white/90 via-[#fff8ef] to-orange-50/60 rounded-[2.5rem] p-8 sm:p-14 border border-orange-100 shadow-[0_20px_60px_rgba(234,88,12,0.06)] relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400/10 blur-[80px]"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-600 mb-3">Our Story</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-6 leading-tight">
                Promoting Music & Nurturing Talent Since 2013
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                DMS Aarohi Musical Society was founded with a singular vision — to create a transparent, merit-based platform where raw singing talent gets the recognition it deserves.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                Registered under the Societies Registration Act, 1860, the society has organized multiple seasons of its flagship competition <strong>"Voice of Delhi NCR"</strong>, along with live concerts, cultural evenings, and musical workshops.
              </p>
              <div className="space-y-3">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p className="text-stone-700 text-sm font-medium">{h}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img src="/legacy/about_group.png" alt="DMS Aarohi Musical Society" className="w-full h-80 object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-3xl -z-10 rotate-6 opacity-60 blur-sm"></div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Mission, Vision, Values */}
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          {
            icon: "🎵",
            title: "Our Mission",
            desc: "To promote Indian classical and contemporary music by providing a structured, transparent platform for emerging singing talents.",
            color: "from-amber-400 to-orange-500",
          },
          {
            icon: "🌟",
            title: "Our Vision",
            desc: "To become India's most respected musical society — a place where tradition meets innovation and every voice gets a chance to shine.",
            color: "from-rose-400 to-orange-500",
          },
          {
            icon: "❤️",
            title: "Our Values",
            desc: "Excellence, authenticity, transparency, and community engagement through the universal language of music.",
            color: "from-pink-400 to-rose-500",
          },
        ].map((item, i) => (
          <ScrollReveal key={i} direction="up" delay={i * 0.1}>
            <div className="group relative overflow-hidden rounded-[2rem] border border-white bg-white p-7 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all backdrop-blur-md">
              <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${item.color}`}></div>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-stone-100 text-3xl shadow-sm transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Objectives */}
      <ScrollReveal direction="up">
        <div className="bg-stone-900 rounded-[2.5rem] p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Our Purpose</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">Objectives of the Society</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/10 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-sm shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed font-medium">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Society Journey / Timeline */}
      <div>
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Our History"
              title="The Society Journey"
              text="From a small musical society to one of Delhi's most celebrated talent platforms."
            />
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-amber-300 -translate-x-0.5 sm:-translate-x-0"></div>
          
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.05}>
                <div className={`relative flex items-center gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Year bubble */}
                  <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-xs shadow-lg z-10">
                    {m.year.slice(2)}
                  </div>
                  
                  {/* Content Card */}
                  <div className={`ml-20 sm:ml-0 sm:w-5/12 ${i % 2 === 0 ? "sm:mr-auto sm:pr-16" : "sm:ml-auto sm:pl-16"}`}>
                    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-orange-200 transition-all">
                      <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-1">{m.year}</p>
                      <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">{m.title}</h3>
                      <p className="text-stone-600 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <ScrollReveal direction="up">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2.5rem] p-10 text-center border border-orange-100">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
            Be Part of Our Journey
          </h2>
          <p className="text-stone-600 mb-8 max-w-lg mx-auto">
            Season 5 is here! Register now for a chance to perform on Delhi's biggest musical stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold hover:shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:-translate-y-1 transition-all"
            >
              Register for Season 5
            </Link>
            <Link
              to="/voice-of-delhi-ncr"
              className="px-8 py-4 rounded-full border-2 border-stone-300 text-stone-700 font-bold hover:border-orange-400 hover:text-orange-600 transition-all"
            >
              View All Seasons
            </Link>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}

export default MusicSocietyOverviewPage;
import { useState } from "react";
import JoinUsForm from "../../components/forms/JoinUsForm";
import ScrollReveal from "../../components/common/ScrollReveal";

const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    title: "Grand Stage",
    desc: "Perform in front of thousands at Delhi's top venues like Talkatora Stadium.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "Trophies & Honours",
    desc: "Certificates, trophies and recognition for winners across all categories.",
    color: "bg-amber-100 text-amber-600"
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>
      </svg>
    ),
    title: "TV & Media Coverage",
    desc: "Get featured on YouTube, news channels and media for national recognition.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Expert Mentorship",
    desc: "Get guided by veteran singers, musicians and industry professionals.",
    color: "bg-emerald-100 text-emerald-600"
  }
];

const steps = [
  { num: "1", label: "Fill Form", desc: "Complete the registration form below with your details" },
  { num: "2", label: "Team Contacts You", desc: "Our team will reach out to confirm your participation" },
  { num: "3", label: "Grand Finale", desc: "Perform live on the grand stage on 4th July 2026!" }
];

function MusicSocietyJoinUsPage() {
  const [status, setStatus] = useState({ type: "", message: "" });

  return (
    <div className="min-h-screen">

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-16 sm:py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-400 rounded-full blur-[100px]" />
        </div>
        {/* Floating music notes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["♪", "♫", "🎵", "♬", "🎶"].map((note, i) => (
            <span
              key={i}
              className="absolute text-white/10 text-4xl animate-float select-none"
              style={{ left: `${10 + i * 20}%`, top: `${20 + (i % 3) * 25}%`, animationDelay: `${i * 1.2}s` }}
            >
              {note}
            </span>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Season 4 — Grand Finale
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Register for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Voice of Delhi NCR
            </span>
          </h1>
          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of talented singers across Delhi-NCR. Fill the form below and take your first step toward the grand stage.
          </p>

          {/* Process Steps */}
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center gap-2">
                {idx < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-5 left-[60%] w-full h-px bg-white/10" />
                )}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-sm z-10 shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                  {step.num}
                </div>
                <p className="text-white font-bold text-xs">{step.label}</p>
                <p className="text-stone-400 text-[10px] text-center leading-tight hidden sm:block">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 xl:gap-12 items-start">

          {/* ── Registration Form Card ── */}
          <ScrollReveal direction="left">
            <div className="bg-white rounded-[2rem] border border-stone-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
              {/* Card header */}
              <div className="px-8 sm:px-10 pt-8 sm:pt-10 pb-6 border-b border-stone-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight mb-1">Voice of Delhi NCR <br/><span className="text-orange-600 text-xl sm:text-2xl">Registration</span></h2>
                    <p className="text-stone-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Season 4 — 2026</p>
                  </div>
                </div>
                {status.message && (
                  <div className={`flex items-start gap-3 rounded-2xl border px-5 py-4 text-sm font-medium ${
                    status.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}>
                    <span className="text-lg shrink-0">{status.type === "success" ? "✅" : "❌"}</span>
                    <span>{status.message}</span>
                  </div>
                )}
              </div>

              {/* Form body */}
              <div className="px-8 sm:px-10 py-8 sm:py-10">
                <JoinUsForm showClose={false} onClose={() => {}} onStatusChange={setStatus} />
              </div>
            </div>
          </ScrollReveal>

          {/* ── Sidebar ── */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="space-y-6">

              {/* Benefits card */}
              <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-[2rem] p-7 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">Perks of Joining</p>
                  <h3 className="font-serif text-2xl font-bold mb-6 text-white">Why Participate?</h3>
                  <ul className="space-y-5">
                    {benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${b.color}`}>
                          {b.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-0.5">{b.title}</h4>
                          <p className="text-stone-400 text-xs leading-relaxed">{b.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Event info card */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-[2rem] p-7 shadow-md">
                <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">Current Season</p>
                <div className="space-y-3">
                  {[
                    ["📅", "Event Date", "4 July 2026"],
                    ["📍", "Venue", "Pearey Lal Bhawan, ITO, New Delhi"],
                    ["🎤", "Category", "Junior (8–15 yrs) & Senior (16–35 yrs)"],
                    ["💰", "Prize", "Trophies & Certificates"],
                    ["✅", "Entry Fee", "Free Entry"]
                  ].map(([icon, label, value], idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/70 rounded-xl border border-white/50">
                      <span className="text-lg shrink-0">{icon}</span>
                      <div>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{label}</p>
                        <p className="text-stone-800 font-semibold text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* ── Need Help Banner ── */}
        <ScrollReveal direction="up">
          <div className="mt-12 bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-3 drop-shadow-md">Need Help?</h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                Trouble registering or have a question about the Voice of Delhi NCR talent hunt? Our support team is ready to assist you.
              </p>
            </div>
            
            <div className="shrink-0 relative z-10 flex flex-col items-center w-full md:w-auto">
              <a
                href="mailto:dmsaarohi@gmail.com"
                className="w-full md:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold shadow-lg hover:scale-105 transition-transform"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                Email Support
              </a>
              <p className="mt-4 text-stone-400 text-xs font-medium">or call: <a href="tel:+919810225442" className="text-white font-bold hover:text-orange-400 transition-colors">+91-9810225442</a></p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

export default MusicSocietyJoinUsPage;

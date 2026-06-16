import { highlights } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";

function HeroSection() {
  const stats = [
    ["2013", "Year of inception"],
    ["12A / 80G", "Covered under Income Tax provisions"],
    ["Delhi", "Based in New Delhi, India"]
  ];

  return (
    <section
      id="home"
      className="grid gap-8 rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:grid-cols-[1.15fr_0.85fr] md:p-14"
    >
      <div className="space-y-8">
        <SectionHeading
          eyebrow="DMS Aarohi Musical Society"
          title="Music, culture, and social purpose on one shared platform."
          text="DMS AAROHI is a voluntary non-profitable organisation devoted to the dissemination and enjoyment of music, especially Indian classical music, with registration number SOCIETY/WEST/2013/8900890."
        />

        <div className="flex flex-wrap items-center gap-3">
          <a
            className="music-pulse rounded-full bg-gradient-to-r from-orange-700 to-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            href="#contact"
          >
            Contact Us
          </a>
          {/* <a
            className="rounded-full border border-stone-300 bg-white/70 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:-translate-y-0.5 hover:bg-white"
            href="#about"
          >
            Learn More
          </a> */}
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-stone-200 bg-orange-50/80 px-4 py-4 text-sm leading-6 text-stone-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[1.75rem] border border-stone-700/20 bg-[linear-gradient(180deg,rgba(35,74,60,0.95),rgba(18,33,39,0.94)),linear-gradient(135deg,rgba(213,139,73,0.3),transparent)] p-7 text-white">
        <div className="mb-5 grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-center text-sm text-white/70 backdrop-blur">
            <img
              className="h-full w-full object-cover"
              src="/legacy/current_event.jpg"
              alt="Featured event"
              fetchpriority="high"
              decoding="async"
              width="1024"
              height="683"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-center text-sm text-white/70 backdrop-blur">
            <img
              className="h-full w-full object-cover"
              src="/legacy/Joinus.jpg"
              alt="Join us banner"
              loading="lazy"
              decoding="async"
              width="700"
              height="933"
            />
          </div>
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/70">Featured Program</p>
        <h2 className="mt-3 font-serif text-4xl leading-tight">Music pulse across Delhi-NCR & beyond.</h2>
        <p className="mt-4 text-base leading-7 text-white/80">
          Stage-forward talent hunts like Voice of Delhi-NCR plus concerts and workshops to celebrate the golden era of music.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div key={label} className="border-t border-white/20 pt-4">
              <strong className="block text-xl">{value}</strong>
              <span className="text-sm text-white/70">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

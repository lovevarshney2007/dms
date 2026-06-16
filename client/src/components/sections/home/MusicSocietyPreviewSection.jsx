import { Link } from "react-router-dom";
import SectionHeading from "../../common/SectionHeading";

function MusicSocietyPreviewSection() {
  const links = [
    { title: "Talents", to: "/music-society/talents", desc: "Emerging voices, mentoring, and stage readiness." },
    { title: "Events", to: "/music-society/events", desc: "Upcoming event details and participation." },
    { title: "Shows", to: "/music-society/shows", desc: "Concerts and musical evenings." },
    { title: "Join Us", to: "/music-society/join-us", desc: "Register as singer, volunteer, sponsor, or audience." }
  ];

  return (
    <section id="music-society" className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Music Society"
          title="Talents, events, shows, and join-us flow."
          text="This section contains the full Music Society experience exactly as structured: Talents, Events, Shows, Join Us."
        />
        <Link
          to="/music-society"
          className="rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
        >
          Open Music Society
        </Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {links.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="group rounded-[1.75rem] border border-stone-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-700">Music Society</p>
            <h3 className="mt-3 font-serif text-3xl text-stone-900">{item.title}</h3>
            <p className="mt-3 text-base leading-7 text-stone-600">{item.desc}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-stone-800">Open {item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MusicSocietyPreviewSection;

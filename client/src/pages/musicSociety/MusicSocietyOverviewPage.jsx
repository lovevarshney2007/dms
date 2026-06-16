import { Link } from "react-router-dom";
import SectionHeading from "../../components/common/SectionHeading";
import PerformancesSection from "../../components/sections/PerformancesSection";
import HeroSection from "../../components/sections/HeroSection";

function MusicSocietyOverviewPage() {
  const cards = [
    {
      title: "Talents",
      text: "Highlighting emerging voices, mentoring, and the society’s focus on creating stage opportunities.",
      to: "/music-society/talents"
    },
    {
      title: "Events",
      text: "Upcoming programs, event flow, and participation details for the talent hunt and music evenings.",
      to: "/music-society/events"
    },
    {
      title: "Shows",
      text: "A view of concerts, performances, and musical showcases curated by DMS Aarohi.",
      to: "/music-society/shows"
    },
    {
      title: "Join Us",
      text: "Join as singer, volunteer, sponsor, coordinator, or audience for upcoming events.",
      to: "/music-society/join-us"
    }
  ];

  return (
    <div className="space-y-7">
      <HeroSection />

      <section className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
        <div className="grid gap-7 md:grid-cols-[1.05fr_0.95fr]">
          <SectionHeading
            eyebrow="Music Society"
            title="Programs built around talent, stage experience, and golden-era music."
            text="Explore talents, events, shows, and the join-us flow under the Music Society section."
          />
          <div className="rounded-[1.75rem] border border-stone-200 bg-white/80 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-700">Quick Actions</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {cards.map((card) => (
                <Link
                  key={card.title}
                  to={card.to}
                  className="rounded-2xl border border-stone-200 bg-orange-50/70 px-4 py-4 text-sm font-semibold text-stone-800 transition hover:-translate-y-0.5 hover:bg-orange-50"
                >
                  {card.title}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Use these shortcuts to jump into the section you need. The same forms (Join Us, Contact, Donation) are
              stored in MongoDB.
            </p>
          </div>
        </div>
      </section>

      <PerformancesSection />

      {/* <section className="grid gap-5 md:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.75rem] border border-stone-200 bg-[#fff8ef]/90 p-7 shadow-[0_18px_60px_rgba(84,42,24,0.10)]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-700">Music Society</p>
            <h3 className="mt-3 font-serif text-3xl text-stone-900">{card.title}</h3>
            <p className="mt-4 text-base leading-7 text-stone-600">{card.text}</p>
            <Link
              to={card.to}
              className="mt-6 inline-flex rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Open {card.title}
            </Link>
          </article>
        ))}
      </section> */}
    </div>
  );
}

export default MusicSocietyOverviewPage;

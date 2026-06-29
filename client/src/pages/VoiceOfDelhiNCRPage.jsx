import { useParams, Link } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";
import QuickLinksSection from "../components/sections/home/QuickLinksSection";

const seasons = [
  {
    id: "season-1",
    title: "Voice of Delhi NCR",
    subtitle: "Season 1",
    year: "2018",
    status: "completed",
    color: "from-amber-500 to-orange-600",
    lightBg: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    winner: "Peehu Srivastava",
    winnerImg: "/team/Peehu Srivastava (Brand Ambassador).png",
    description:
      "The first edition of Voice of Delhi NCR launched DMS Aarohi's flagship competition, bringing together hundreds of singing talents from across the Delhi NCR region for the very first time.",
    highlights: [
      "First ever singing competition by DMS Aarohi",
      "Hundreds of participants from Delhi NCR",
      "Grand Finale at a prestigious Delhi venue",
    ],
    youtube: "https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ",
    poster: "/legacy/poster.png",
  },
  {
    id: "season-2",
    title: "Voice of Delhi NCR",
    subtitle: "Season 2",
    year: "2019",
    status: "completed",
    color: "from-orange-500 to-red-500",
    lightBg: "from-orange-50 to-red-50",
    borderColor: "border-orange-200",
    winner: "Grand Finale Champion",
    winnerImg: "/legacy/about_group.png",
    description:
      "Season 2 expanded the competition to reach more cities and localities within Delhi NCR, featuring bigger stages and more competitive rounds than ever before.",
    highlights: [
      "Expanded to more Delhi NCR localities",
      "Celebrity judges panel",
      "Bigger prize pool",
    ],
    youtube: "https://youtu.be/kom0cU5fUFE",
    poster: "/legacy/current_event.jpg",
  },
  {
    id: "season-3",
    title: "Voice of Rajasthan",
    subtitle: "Season 3",
    year: "2021",
    status: "completed",
    color: "from-rose-500 to-pink-600",
    lightBg: "from-rose-50 to-pink-50",
    borderColor: "border-rose-200",
    winner: "Grand Finale Champion",
    winnerImg: "/legacy/KT.jpg",
    description:
      "A special edition — Voice of Rajasthan — expanded DMS Aarohi's reach beyond Delhi, celebrating the rich musical heritage of Rajasthan and discovering incredible talent from the region.",
    highlights: [
      "Special edition — Voice of Rajasthan",
      "First competition outside Delhi NCR",
      "Celebrated Rajasthani musical heritage",
    ],
    youtube: "https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ",
    poster: "/legacy/KT.jpg",
  },
  {
    id: "season-4",
    title: "Voice of Delhi NCR",
    subtitle: "Season 4",
    year: "2023",
    status: "completed",
    color: "from-violet-500 to-purple-600",
    lightBg: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    winner: "Grand Finale Champion",
    winnerImg: "/legacy/patrons.jpg",
    description:
      "Season 4 returned to Delhi NCR with unprecedented scale — featuring online auditions, multi-city live battles, and a spectacular Grand Finale that brought together the finest voices of the region.",
    highlights: [
      "Online auditions for the first time",
      "Multi-city live battles",
      "Spectacular Grand Finale",
    ],
    youtube: "https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ",
    poster: "/legacy/patrons.jpg",
  },
  {
    id: "season-5",
    title: "Voice of Delhi NCR",
    subtitle: "Season 5",
    year: "2026",
    status: "upcoming",
    color: "from-orange-500 to-amber-400",
    lightBg: "from-orange-50 to-amber-50",
    borderColor: "border-orange-300",
    winner: null,
    winnerImg: null,
    grandFinale: "4th July 2026",
    venue: "Pearey Lal Bhawan, ITO, New Delhi",
    description:
      "The most anticipated season is here! Voice of Delhi NCR Season 5 is bringing back the magic with online auditions, live competitions, and the Grand Finale on 4th July 2026. Registrations are now open!",
    highlights: [
      "Grand Finale: 4th July 2026",
      "Venue: Pearey Lal Bhawan, ITO, New Delhi",
      "Registrations: OPEN",
      "Junior & Senior Categories",
    ],
    youtube: null,
    poster: "/legacy/poster.png",
  },
];

function VoiceOfDelhiNCRPage() {
  const { season: seasonParam } = useParams();
  const selectedSeason = seasonParam
    ? seasons.find((s) => s.id === seasonParam)
    : null;

  if (selectedSeason) {
    return <SeasonDetailPage season={selectedSeason} />;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Page Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Competition Archive
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 mb-6 leading-tight">
              Voice of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Delhi NCR
              </span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
              DMS Aarohi's flagship singing competition — discovering, nurturing,
              and celebrating extraordinary vocal talent from across the region
              since 2018.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Row */}
        <ScrollReveal direction="up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: "5", label: "Seasons Completed / Running" },
              { num: "5,000+", label: "Total Participants" },
              { num: "4+", label: "States Covered" },
              { num: "₹1L+", label: "Total Prize Money" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 text-center border border-orange-100 shadow-[0_10px_30px_rgba(234,88,12,0.05)]"
              >
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-1">
                  {stat.num}
                </div>
                <div className="text-xs text-stone-500 font-bold uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Quick Links Nav */}
        <div className="pt-4">
          <QuickLinksSection />
        </div>

        {/* Seasons Grid */}
        <div>
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <SectionHeading
                eyebrow="Our Legacy"
                title="All Seasons"
                text="Every season has a story — explore the journey of each competition."
              />
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasons.map((season, idx) => (
              <ScrollReveal
                key={season.id}
                direction="up"
                delay={idx * 0.08}
              >
                <Link
                  to={`/voice-of-delhi-ncr/${season.id}`}
                  className="group relative bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(234,88,12,0.18)] hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                  {/* Poster Image */}
                  <div className="h-60 sm:h-72 w-full relative overflow-hidden shrink-0">
                    <img src={season.poster} alt={season.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/50 to-stone-900/10"></div>

                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md ${season.status === 'upcoming' ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-white' : 'bg-white/15 text-white border border-white/25 backdrop-blur-sm'}`}>
                        {season.status === "upcoming" ? (
                          <><span className="animate-pulse">🔥</span> Registrations Open</>
                        ) : (
                          <><span className="text-emerald-400">✔</span> Completed</>
                        )}
                      </span>
                    </div>
                    <span className="absolute top-4 right-4 text-white font-black text-xs tracking-wider bg-black/40 px-2.5 py-1.5 rounded-lg backdrop-blur-md border border-white/10">{season.year}</span>

                    {/* Title at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-orange-400 text-[11px] font-bold tracking-widest uppercase mb-1">{season.subtitle}</p>
                      <h2 className="text-white font-serif text-2xl font-bold leading-tight drop-shadow-lg">
                        {season.title.includes("Delhi") ? "Voice of Delhi NCR" : "Voice of Rajasthan"}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white flex-1 p-5 flex flex-col gap-4">
                    {/* Winner / Upcoming Info */}
                    {season.status === "upcoming" ? (
                      <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl p-3.5">
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg shrink-0">🎤</div>
                        <div>
                          <p className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Grand Finale</p>
                          <p className="text-orange-600 font-black text-base leading-tight">{season.grandFinale}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-amber-50/70 border border-amber-100 rounded-2xl p-3.5">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow shrink-0">
                          <img src={season.winnerImg} alt={season.winner} className="w-full h-full object-cover object-top" />
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">🏆 Winner</p>
                          <p className="font-bold text-stone-900 text-sm truncate">{season.winner}</p>
                        </div>
                      </div>
                    )}

                    {/* Description snippet */}
                    <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">{season.description}</p>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      {season.youtube ? (
                        <span className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-xs rounded-xl group-hover:shadow-md transition-all">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
                          Watch Highlights
                        </span>
                      ) : (
                        <span className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs rounded-xl group-hover:shadow-[0_8px_20px_rgba(234,88,12,0.3)] transition-all">
                          🎤 Register Now — Free Entry
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <ScrollReveal direction="up">
          <div className="bg-stone-900 rounded-[2.5rem] p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500 rounded-full blur-[100px]"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500 rounded-full blur-[100px]"></div>
            </div>
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-4">
                Ready to be the next champion?
              </h2>
              <p className="text-stone-300 mb-8">
                Season 5 registrations are open. Grand Finale: 4th July 2026 at
                Pearey Lal Bhawan, ITO, New Delhi.
              </p>
              <Link
                to="/register"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(249,115,22,0.4)]"
              >
                Register for Season 5
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}

// Season Detail Sub-page
function SeasonDetailPage({ season }) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Back Link */}
        <Link
          to="/voice-of-delhi-ncr"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-orange-600 transition font-bold text-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back to All Seasons
        </Link>

        {/* Season Hero */}
        <ScrollReveal direction="up">
          <div
            className={`bg-gradient-to-br ${season.lightBg} rounded-[2.5rem] p-8 sm:p-14 border ${season.borderColor} relative overflow-hidden`}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${
                    season.status === "upcoming"
                      ? "bg-orange-500 text-white animate-pulse"
                      : "bg-stone-900 text-white"
                  }`}
                >
                  {season.status === "upcoming" ? "🔥 Live Now" : "✅ Season Completed"}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-2 font-bold">
                  {season.title}
                </h1>
                <p className="text-orange-600 font-bold text-xl mb-6">
                  {season.subtitle} — {season.year}
                </p>
                <p className="text-stone-600 leading-relaxed text-lg">
                  {season.description}
                </p>
                {season.status === "upcoming" && (
                  <Link
                    to="/register"
                    className="mt-8 inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold hover:shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:-translate-y-1 transition-all"
                  >
                    Register Now
                  </Link>
                )}
              </div>
              <div className="relative">
                <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={season.poster}
                    alt={season.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Highlights */}
        <ScrollReveal direction="up">
          <div className="grid sm:grid-cols-2 gap-4">
            {season.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">
                  {i + 1}
                </div>
                <p className="font-semibold text-stone-800">{h}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Winner / Upcoming */}
        {season.status === "completed" && (
          <ScrollReveal direction="up">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[2.5rem] p-10 border border-amber-100 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-4">
                🏆 Hall of Fame
              </p>
              <h2 className="font-serif text-3xl text-stone-900 mb-6">
                Season Winner
              </h2>
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto mb-4">
                <img
                  src={season.winnerImg}
                  alt={season.winner}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-black text-2xl text-stone-900">
                {season.winner}
              </p>
              {season.youtube && (
                <a
                  href={season.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
                >
                  Watch Season Highlights on YouTube
                </a>
              )}
            </div>
          </ScrollReveal>
        )}

        {season.status === "upcoming" && (
          <ScrollReveal direction="up">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2.5rem] p-10 border border-orange-200 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-4 animate-pulse">
                🔥 Season 5 is Live!
              </p>
              <h2 className="font-serif text-3xl text-stone-900 mb-4">
                Grand Finale Details
              </h2>
              <p className="font-black text-4xl text-orange-600 mb-2">
                {season.grandFinale}
              </p>
              <p className="text-stone-600 mb-8">{season.venue}</p>
              <Link
                to="/register"
                className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(234,88,12,0.3)]"
              >
                Register Now — Free Entry
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </>
  );
}

export default VoiceOfDelhiNCRPage;

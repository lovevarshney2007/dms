import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

// Change 9: Updated seasons list with correct names and years
const fallbackSeasons = [
  {
    id: "season-4",
    title: "Voice of Delhi NCR",
    subtitle: "Season 4 Grand Finale",
    year: "2026",
    status: "grand-finale",
    color: "from-orange-500 to-amber-400",
    lightBg: "from-orange-50 to-amber-50",
    borderColor: "border-orange-300",
    winner: null,
     winnerImg: "/images/logoth.png",
    grandFinale: "4th July 2026",
    venue: "Pearey Lal Bhawan (Gandhi Memorial Hall), ITO, New Delhi",
    description:
      "The most anticipated Grand Finale is here! Voice of Delhi NCR Season 4 culminates in a spectacular Grand Finale on 4th July 2026. Watch the finest voices of Delhi-NCR, including Junior & Senior Category Finalists, compete for the ultimate title. Live music by the DO-RE-MI band!",
    highlights: [
      "Grand Finale: 4th July 2026 • 5:00 PM – 9:30 PM",
      "Venue: Pearey Lal Bhawan, ITO, New Delhi",
      "Junior & Senior Categories",
      "Live music by DO-RE-MI Band",
    ],
    youtube: null,
    poster: "/seasons/season_4_poster.png",
    finalists: {
      junior: [
        "Aarna Agrawal","Adaa Srivastava","Ayami Aadhya","Devarsh Sharma","Dhruv Pandit",
        "Lavishka Sharma","Mandeep Singh","Netra Singh","Praharsh Kashyap","Priyanshi",
        "Shreyas Thakur","Varin Kakkar","Advita Mittal","Keshav Pandit"
      ],
      senior: [
        "Arijit Roy","Bhoomi Tyagi","Chandreyi Banerjee","Deepshikha Mitra","Kuvam Sethi",
        "Maanvi Dwivedi","Manoneet Munesha","Nagma Ali","Nitin Mishra","Ruchika Chatterjee",
        "Sakshi Kumari","Soumava Mukhopadhyay","Srishti Sargam"
      ],
      superSenior: [
        "Chetan P. Barodia (Dr.)","Khushjit Singh","Mandeep Negi","P. Kumar (Dr.)",
        "Pritika Singh Gupta","Rahul Agarwal","Rajat Chakraborthy","Rajesh Kapoor",
        "Rajesh Laxmi Chand","Vineet Sharma"
      ]
    }
  },
  {
    id: "season-3",
    title: "Voice of Delhi NCR",
    subtitle: "Season 3",
    year: "2024",
    status: "completed",
    color: "from-rose-500 to-orange-500",
    lightBg: "from-rose-50 to-orange-50",
    borderColor: "border-rose-200",
    winner: "Multiple Category Winners",
    winnerImg: "/images/logoth.png",
    description:
      "Voice of Delhi NCR Season 3 delivered spectacular performances and discovered incredible singing talent from across Delhi NCR. The Grand Finale was a memorable celebration of music and artistry.",
    highlights: [
      "Voice of Delhi NCR Season 3 — 2024",
      "Grand Finale at a prestigious Delhi venue",
      "Multiple categories — Junior, Senior & Super Senior",
      "Winner: Khushi Singh",
    ],
    youtube: "https://www.youtube.com/watch?v=RCOXwxmZ9ik&t=5527s",
    poster: "/seasons/season_3_poster.jpeg",
    winners: {
      overall: [
        { category: "Winner", name: "Khushi Singh" }
      ]
    }
  },
  {
    id: "season-rajasthan",
    title: "Voice of Rajasthan",
    subtitle: "Season 1",
    year: "2021",
    status: "completed",
    color: "from-purple-500 to-pink-600",
    lightBg: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    winner: "Grand Finale Champion",
    winnerImg: "/images/logoth.png",
    description:
      "A special edition — Voice of Rajasthan Season 1 — expanded DMS Aarohi's reach beyond Delhi, celebrating the rich musical heritage of Rajasthan and discovering incredible talent from the region.",
    highlights: [
      "Special edition — Voice of Rajasthan",
      "First competition outside Delhi NCR",
      "Celebrated Rajasthani musical heritage",
    ],
    youtube: "https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ",
    poster: "/seasons/season_3_poster_rajsathan.png",
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
    winner: "Multiple Category Winners",
    winnerImg: "/images/logoth.png",
    description:
      "Season 2 expanded the competition to reach more cities and localities within Delhi NCR, featuring bigger stages, more competitive rounds, and multiple categories including a special Specially Abled category.",
    highlights: [
      "Expanded to more Delhi NCR localities",
      "Special Specially Abled category introduced",
      "Celebrity judges panel",
      "Bigger prize pool",
    ],
    youtube: "https://www.youtube.com/watch?v=r2VYf94YPNU&t=617s",
    poster: "/seasons/season_2_poster.png",
    winners: {
      littleStars: [
        { position: "Winner", name: "Adya Mishra" },
        { position: "1st Runner-up", name: "Dhaani Saikia" },
        { position: "2nd Runner-up", name: "Moksh Gulhati" }
      ],
      speciallyAbled: [
        { position: "Winner", name: "Shipra Kumari" },
        { position: "1st Runner-up", name: "Pratik Saraf" },
        { position: "2nd Runner-up", name: "Md. Arif" }
      ],
      rockStars: [
        { position: "Winner", name: "Shubham Gupta" },
        { position: "1st Runner-up", name: "Manjeet Tanwar" },
        { position: "2nd Runner-up", name: "Shraddha Shree" }
      ],
      superStars: [
        { position: "Winner", name: "Sanjukta Kakkar" },
        { position: "1st Runner-up", name: "Amritpal Singh" },
        { position: "2nd Runner-up", name: "Rahul Aggarwal" }
      ],
      viewersChoice: ["Yashaswini Dagar", "Aastha Sharma", "Muskan Srivastava", "Nishant Sharma"]
    }
  },
  {
    id: "season-1",
    title: "Voice of Delhi NCR",
    subtitle: "Season 1",
    year: "2018",
    status: "completed",
    color: "from-amber-500 to-orange-600",
    lightBg: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    winner: "Multiple Category Winners",
     winnerImg: "/images/logoth.png",
    description:
      "The first edition of Voice of Delhi NCR launched DMS Aarohi's flagship competition, bringing together hundreds of singing talents from across the Delhi NCR region for the very first time.",
    highlights: [
      "First ever singing competition by DMS Aarohi",
      "Hundreds of participants from Delhi NCR",
      "Grand Finale at a prestigious Delhi venue",
    ],
    youtube: "https://www.youtube.com/watch?v=r2VYf94YPNU&t=617s",
    poster: "/seasons/season_1_poster.jpeg",
    winners: {
      littleStars: [
        { position: "Winner", name: "Peehu Srivastava" },
        { position: "1st Runner-up (Tie)", name: "Anshiki Jadia" },
        { position: "1st Runner-up (Tie)", name: "Siddhant Agrawal" },
        { position: "2nd Runner-up (Tie)", name: "Biren Dang" },
        { position: "2nd Runner-up (Tie)", name: "Shivam Khanna" },
      ],
      rockStars: [
        { position: "Winner", name: "Paakhi Saikia" },
        { position: "1st Runner-up", name: "Jai Kishan" },
        { position: "2nd Runner-up (Tie)", name: "Kritarth Singh" },
        { position: "2nd Runner-up (Tie)", name: "Atul Kumar" },
      ],
      superStars: [
        { position: "Winner", name: "Prasenjit Mukherjee" },
        { position: "1st Runner-up (Tie)", name: "Dr. P. Kumar" },
        { position: "1st Runner-up (Tie)", name: "Rohit Bakshi" },
        { position: "2nd Runner-up (Tie)", name: "Sanjay Kakkar" },
        { position: "2nd Runner-up (Tie)", name: "Ashish Gupta" },
      ]
    }
  },
];

function VoiceOfDelhiNCRPage() {
  const [seasons, setSeasons] = useState(fallbackSeasons);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/content/season")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mappedSeasons = fallbackSeasons.map(fallback => {
            const d = data.find(item => String(item.year) === String(fallback.year)) || {};
            return {
              id: fallback.id,
              title: d.title || fallback.title,
              subtitle: d.subtitle || fallback.subtitle,
              year: fallback.year, // Priority to fallback year
              description: d.meta?.description || d.description || fallback.description,
              status: d.meta?.status || fallback.status || "completed",
              color: d.meta?.color || fallback.color,
              lightBg: d.meta?.lightBg || fallback.lightBg,
              borderColor: d.meta?.borderColor || fallback.borderColor,
              winner: fallback.winner || d.meta?.winner || null,
              winnerImg: fallback.winnerImg || d.meta?.winnerImg || null,
              youtube: fallback.youtube || d.meta?.youtube || null,
              poster: fallback.poster || d.meta?.poster || d.imageUrl || "/legacy/poster.png",
              grandFinale: d.meta?.grandFinale || fallback.grandFinale || null,
              venue: d.meta?.venue || fallback.venue || null,
              highlights: d.meta?.highlights || fallback.highlights || [],
              winners: fallback.winners || d.meta?.winners || null,
              finalists: fallback.finalists || d.meta?.finalists || null,
            };
          });
          setSeasons(mappedSeasons);
        }
      })
      .catch(console.error);
  }, []);

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

        {/* Change 8: Updated Stats Row */}
        <ScrollReveal direction="up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: "5", label: "Successful Seasons" },
              { num: "Since 2013", label: "Promoting Music" },
              { num: "Voice of Delhi NCR", label: "Flagship Competition" },
              { num: "Live Shows", label: "Musical Events" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 text-center border border-orange-100 shadow-[0_10px_30px_rgba(234,88,12,0.05)]"
              >
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-1">
                  {stat.num}
                </div>
                <div className="text-xs text-stone-500 font-bold uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

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
                  onClick={scrollToTop}
                  className="group relative bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(234,88,12,0.18)] hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                  {/* Poster Image */}
                  <div className="h-60 sm:h-72 w-full relative overflow-hidden shrink-0">
                    <img src={season.poster} alt={season.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/50 to-stone-900/10"></div>

                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md ${
                        season.status === 'grand-finale'
                          ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-white'
                          : 'bg-white/15 text-white border border-white/25 backdrop-blur-sm'
                      }`}>
                        {season.status === "grand-finale" ? (
                          <><span className="animate-pulse">🔥</span> Grand Finale — 4 July 2026</>
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
                        {season.title}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white flex-1 p-5 flex flex-col gap-4">
                    {/* Winner / Grand Finale / Completed Info */}
                    {season.status === "grand-finale" ? (
                      <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl p-3.5">
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg shrink-0 animate-pulse">🎤</div>
                        <div>
                          <p className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Grand Finale</p>
                          <p className="text-orange-600 font-black text-base leading-tight">{season.grandFinale} • 5:00 PM – 9:30 PM</p>
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
                      {season.status === "grand-finale" ? (
                        <span className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs rounded-xl group-hover:shadow-[0_8px_20px_rgba(234,88,12,0.3)] transition-all">
                          🎟️ Free Entry — Explore
                        </span>
                      ) : season.youtube ? (
                        <span className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-xs rounded-xl group-hover:shadow-md transition-all">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
                          Watch Highlights
                        </span>
                      ) : (
                        <span className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs rounded-xl group-hover:shadow-[0_8px_20px_rgba(234,88,12,0.3)] transition-all">
                          🎤 View Season Details
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
                Season 6 Is Coming!
              </h2>
              <p className="text-stone-300 mb-8">
                Stay tuned for the upcoming Season 6 of Voice of Delhi NCR. <strong className="text-orange-400">Register now to be part of the journey!</strong>
              </p>
              <Link
                to="/register"
                onClick={scrollToTop}
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(249,115,22,0.4)]"
              >
                🎤 Register for Upcoming Season
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
          onClick={scrollToTop}
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
                    season.status === "grand-finale"
                      ? "bg-orange-500 text-white animate-pulse"
                      : "bg-stone-900 text-white"
                  }`}
                >
                  {season.status === "grand-finale" ? "🔥 Grand Finale — Live Now" : "✅ Season Completed"}
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
                {season.status === "grand-finale" && (
                  <Link
                    to="/contact"
                    onClick={scrollToTop}
                    className="mt-8 inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold hover:shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:-translate-y-1 transition-all"
                  >
                    🎟️ Free Entry — Join Us
                  </Link>
                )}

                {/* YouTube link for completed seasons */}
                {season.status === "completed" && season.youtube && (
                  <a
                    href={season.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
                    Watch Season Highlights on YouTube
                  </a>
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

        {/* Season 4 Finalists — Change 10 */}
        {season.id === "season-4" && season.finalists && (
          <ScrollReveal direction="up">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2.5rem] p-8 sm:p-12 border border-orange-100">
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-3">🎤 Grand Finale Participants</p>
                <h2 className="font-serif text-3xl text-stone-900 font-bold">Season 4 Finalists</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Junior */}
                <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm">🌟</span>
                    Junior Category
                  </h3>
                  <div className="space-y-2">
                    {season.finalists.junior.map((name, i) => (
                      <div key={i} className="flex items-center gap-2 py-1.5 border-b border-stone-50 last:border-0">
                        <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</span>
                        <span className="text-stone-800 text-sm font-medium">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Senior */}
                <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">🌟</span>
                    Senior Category
                  </h3>
                  <div className="space-y-2">
                    {season.finalists.senior.map((name, i) => (
                      <div key={i} className="flex items-center gap-2 py-1.5 border-b border-stone-50 last:border-0">
                        <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</span>
                        <span className="text-stone-800 text-sm font-medium">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Super Senior */}
                <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm">🌟</span>
                    Super Senior Category
                  </h3>
                  <div className="space-y-2">
                    {season.finalists.superSenior.map((name, i) => (
                      <div key={i} className="flex items-center gap-2 py-1.5 border-b border-stone-50 last:border-0">
                        <span className="w-5 h-5 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</span>
                        <span className="text-stone-800 text-sm font-medium">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Season 1 Winners — Change 10 */}
        {season.id === "season-1" && season.winners && (
          <ScrollReveal direction="up">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[2.5rem] p-8 sm:p-12 border border-amber-100">
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-3">🏆 Hall of Fame</p>
                <h2 className="font-serif text-3xl text-stone-900 font-bold">Voice of Delhi NCR — Season 1 Winners</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {/* Little Stars */}
                <WinnerCategoryCard title="⭐ Little Stars" winners={season.winners.littleStars} />
                {/* Rock Stars */}
                <WinnerCategoryCard title="⭐ Rock Stars" winners={season.winners.rockStars} />
                {/* Super Stars */}
                <WinnerCategoryCard title="⭐ Super Stars" winners={season.winners.superStars} />
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Season 2 Winners — Change 10 */}
        {season.id === "season-2" && season.winners && (
          <ScrollReveal direction="up">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-[2.5rem] p-8 sm:p-12 border border-orange-100">
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">🏆 Hall of Fame</p>
                <h2 className="font-serif text-3xl text-stone-900 font-bold">Voice of Delhi NCR — Season 2 Winners</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <WinnerCategoryCard title="⭐ Little Stars" winners={season.winners.littleStars} />
                <WinnerCategoryCard title="♿ Specially Abled" winners={season.winners.speciallyAbled} />
                <WinnerCategoryCard title="⭐ Rock Stars" winners={season.winners.rockStars} />
                <WinnerCategoryCard title="⭐ Super Stars" winners={season.winners.superStars} />
              </div>
              {/* Viewers' Choice */}
              <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-4">🎖️ Viewers' Choice Winners</h3>
                <div className="flex flex-wrap gap-3">
                  {season.winners.viewersChoice.map((name, i) => (
                    <span key={i} className="px-4 py-2 bg-orange-50 text-orange-700 border border-orange-100 rounded-full text-sm font-bold">{name}</span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Season 3 Winner */}
        {season.id === "season-3" && season.winner && (
          <ScrollReveal direction="up">
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-[2.5rem] p-10 border border-rose-100 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-rose-700 mb-4">🏆 Hall of Fame</p>
              <h2 className="font-serif text-3xl text-stone-900 mb-4">Season 3 Winner</h2>
              <p className="font-black text-4xl text-orange-600 mb-6">Khushi Singh</p>
              {season.youtube && (
                <a
                  href={season.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
                  Watch Voice of Delhi NCR Season 3 — Grand Finale
                </a>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Season 4 Grand Finale Info */}
        {season.status === "grand-finale" && (
          <ScrollReveal direction="up">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2.5rem] p-10 border border-orange-200 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-4 animate-pulse">
                🔥 Season 4 Grand Finale — Live Now!
              </p>
              <h2 className="font-serif text-3xl text-stone-900 mb-4">
                Grand Finale Details
              </h2>
              <p className="font-black text-4xl text-orange-600 mb-2">
                {season.grandFinale} • 5:00 PM – 9:30 PM
              </p>
              <p className="text-stone-600 mb-8">{season.venue}</p>
              <Link
                to="/contact"
                onClick={scrollToTop}
                className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(234,88,12,0.3)]"
              >
                🎟️ Free Entry — Contact Us
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </>
  );
}

// Helper: Winner Category Card
function WinnerCategoryCard({ title, winners }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
      <h3 className="font-serif font-bold text-base text-stone-900 mb-4">{title}</h3>
      <div className="space-y-2">
        {winners.map((w, i) => (
          <div key={i} className="flex items-center gap-2 py-1.5 border-b border-stone-50 last:border-0">
            <span className={`text-xs font-black shrink-0 w-6 ${i === 0 ? 'text-amber-500' : 'text-stone-400'}`}>
              {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
            </span>
            <div>
              <p className="text-[10px] text-stone-400 uppercase font-bold">{w.position}</p>
              <p className="text-stone-800 text-sm font-bold">{w.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoiceOfDelhiNCRPage;

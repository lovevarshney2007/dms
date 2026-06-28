import { Link } from "react-router-dom";
import PlaylistsSection from "../../components/sections/PlaylistsSection";
import SectionHeading from "../../components/common/SectionHeading";
import ScrollReveal from "../../components/common/ScrollReveal";

function MusicSocietyShowsPage() {
  const upcomingShow = {
    title: "Musical Evening & Alumni Meet",
    date: "August 15, 2026 • 6:30 PM",
    location: "Dilli Haat, INA, New Delhi",
    description: "Join us for an exclusive evening of soulful melodies and energetic band performances featuring our top talents and returning alumni.",
    image: "/legacy/current_event.jpg"
  };

  const glimpses = [
    "/legacy/KT.jpg",
    "/legacy/poster.png",
    "/legacy/image1.jpeg",
    "/legacy/patrons.jpg"
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24">
      
      {/* 1. Page Header & About Our Shows */}
      <ScrollReveal direction="up" className="relative grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-stone-900 to-stone-800 rounded-[3rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>DMS Aarohi</span>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Shows</span>
          </h1>
          <div className="space-y-4 text-stone-300 text-lg leading-relaxed">
            <p>Welcome to the heart of DMS Aarohi's musical journey. Throughout the year, we host a variety of musical evenings, live concerts, and grand stage programs.</p>
            <p>Our shows are meticulously curated to give emerging talents a premium stage to shine. From classical solo acts to electrifying group fusions, every show is designed to mesmerize our audience and create unforgettable memories.</p>
          </div>
          <Link to="/register" className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(249,115,22,0.3)]">
            Perform in our next show
          </Link>
        </div>
        <div className="relative h-80 lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
          <img src="/legacy/bd2.jpg" alt="Our Shows" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent flex items-end p-8">
            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">Featured Highlight</div>
              <p className="font-serif font-bold text-3xl mb-1">Grand Finale 2024</p>
              <p className="text-stone-300 text-sm font-medium flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Talkatora Stadium, New Delhi
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Upcoming Shows */}
      <section>
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Mark your calendars"
              title="Upcoming Shows"
              text="Be a part of our next big musical extravaganza."
            />
          </div>
          <div className="relative max-w-4xl mx-auto bg-white rounded-[2.5rem] p-6 sm:p-8 border border-stone-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row gap-8 items-center overflow-hidden group hover:shadow-[0_20px_60px_rgba(234,88,12,0.1)] transition-shadow">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-50 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-100 transition-colors"></div>
            
            <div className="w-full sm:w-2/5 shrink-0 h-64 sm:h-80 rounded-[2rem] overflow-hidden shadow-lg relative">
              <img src={upcomingShow.image} alt={upcomingShow.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4">
                <div className="px-4 py-2 bg-white/90 backdrop-blur-md text-orange-600 text-xs font-black uppercase tracking-widest rounded-full shadow-lg border border-white/50 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  Next Show
                </div>
              </div>
            </div>
            <div className="w-full sm:w-3/5 relative z-10 sm:pr-8">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4 leading-tight">{upcomingShow.title}</h3>
              
              <div className="space-y-3 mb-6 bg-stone-50 rounded-2xl p-4 border border-stone-100">
                <p className="text-stone-700 font-bold flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </span>
                  {upcomingShow.date}
                </p>
                <p className="text-stone-700 font-bold flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  {upcomingShow.location}
                </p>
              </div>
              
              <p className="text-stone-500 text-sm leading-relaxed mb-8">{upcomingShow.description}</p>
              
              <button className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-2">
                Get Free Passes
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Past Shows (PlaylistsSection with YouTube links) */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="max-w-6xl mx-auto">
          <PlaylistsSection />
        </div>
      </ScrollReveal>

      {/* 4. Stage Glimpses (Gallery to fill page) */}
      <section>
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Behind the scenes"
              title="Stage Glimpses"
              text="A sneak peek into the energy and passion of our live concerts."
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {glimpses.map((img, idx) => (
              <div key={idx} className={`relative group rounded-3xl overflow-hidden shadow-lg ${idx === 0 || idx === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={img} alt="Stage Glimpse" className="w-full h-full object-cover min-h-[200px] group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 flex items-center justify-center text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}

export default MusicSocietyShowsPage;
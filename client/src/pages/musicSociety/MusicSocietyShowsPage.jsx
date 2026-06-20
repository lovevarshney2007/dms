import { Link } from "react-router-dom";
import PlaylistsSection from "../../components/sections/PlaylistsSection";
import SectionHeading from "../../components/common/SectionHeading";

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
      <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-stone-100">
        <div>
          <span className="text-sm font-bold uppercase tracking-widest text-orange-600 mb-4 block">DMS Aarohi</span>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-stone-900 mb-6">
            Our Shows
          </h1>
          <div className="space-y-4 text-stone-600 text-lg leading-relaxed">
            <p>
              Welcome to the heart of DMS Aarohi's musical journey. Throughout the year, we host a variety of musical evenings, live concerts, and grand stage programs. 
            </p>
            <p>
              Our shows are meticulously curated to give emerging talents a premium stage to shine. From classical solo acts to electrifying group fusions, every show is designed to mesmerize our audience and create unforgettable memories. 
            </p>
          </div>
          <Link to="/music/register" className="inline-block mt-8 px-8 py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg">
            Perform in our next show
          </Link>
        </div>
        <div className="relative h-80 lg:h-full min-h-[400px] rounded-[2rem] overflow-hidden shadow-xl">
          <img src="/legacy/bd2.jpg" alt="Our Shows" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-8">
            <div className="text-white">
              <p className="font-bold text-xl">Grand Finale 2024</p>
              <p className="text-stone-300 text-sm">Talkatora Stadium, New Delhi</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Upcoming Shows */}
      <section>
        <div className="text-center mb-12">
          <SectionHeading
            eyebrow="Mark your calendars"
            title="Upcoming Shows"
            text="Be a part of our next big musical extravaganza."
          />
        </div>
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2.5rem] p-6 sm:p-10 border border-orange-100 shadow-[0_20px_60px_rgba(234,88,12,0.1)] flex flex-col sm:flex-row gap-8 items-center">
          <div className="w-full sm:w-1/3 shrink-0 rounded-[1.5rem] overflow-hidden shadow-lg">
            <img src={upcomingShow.image} alt={upcomingShow.title} className="w-full h-48 sm:h-full object-cover" />
          </div>
          <div className="w-full sm:w-2/3">
            <div className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4 animate-pulse">Next Show</div>
            <h3 className="font-serif text-3xl font-bold text-stone-900 mb-2">{upcomingShow.title}</h3>
            <p className="text-stone-500 font-medium flex items-center gap-2 mb-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {upcomingShow.date}
            </p>
            <p className="text-stone-500 font-medium flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {upcomingShow.location}
            </p>
            <p className="text-stone-600 mb-6 line-clamp-2">{upcomingShow.description}</p>
            <button className="px-6 py-2.5 bg-white border-2 border-stone-900 text-stone-900 font-bold rounded-xl hover:bg-stone-900 hover:text-white transition-colors">
              Get Free Passes
            </button>
          </div>
        </div>
      </section>

      {/* 3. Past Shows (PlaylistsSection with YouTube links) */}
      <div className="max-w-6xl mx-auto">
        <PlaylistsSection />
      </div>

      {/* 4. Stage Glimpses (Gallery to fill page) */}
      <section>
        <div className="text-center mb-12">
          <SectionHeading
            eyebrow="Behind the scenes"
            title="Stage Glimpses"
            text="A sneak peek into the energy and passion of our live concerts."
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {glimpses.map((img, idx) => (
            <div key={idx} className={`rounded-3xl overflow-hidden shadow-lg ${idx === 0 || idx === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img src={img} alt="Stage Glimpse" className="w-full h-full object-cover min-h-[200px] hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default MusicSocietyShowsPage;
import UpcomingEventSection from "../../components/sections/UpcomingEventSection";
import SectionHeading from "../../components/common/SectionHeading";
import { pastEvents } from "../../data/siteContent";

function MusicSocietyEventsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24">
      
      {/* 1. Page Header */}
      <div className="text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-2 block">DMS Aarohi</span>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-stone-900">
          Music Events
        </h1>
        <p className="mt-4 text-stone-600 max-w-2xl mx-auto text-lg">
          Join our live competitions, grand concerts, and exclusive workshops. Be a part of the vibrant music community.
        </p>
      </div>

      {/* 2. Upcoming Events (Dynamic & Static) */}
      <section>
        <UpcomingEventSection />
      </section>

      {/* 3. Past Events */}
      <section>
        <div className="text-center mb-12">
          <SectionHeading
            eyebrow="Memories"
            title="Past Events & Concerts"
            text="Take a look back at some of our most memorable shows and grand finales."
          />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEvents.map((event) => (
            <a 
              key={event.id} 
              href={event.youtubeLink || "https://youtube.com"} 
              target="_blank" 
              rel="noreferrer"
              className="group flex flex-col rounded-[2rem] bg-white border border-stone-100 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* YouTube Icon Overlay on Hover */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  Past Event
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-stone-500 text-sm font-medium mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {event.date}
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-start gap-2 text-stone-600 mt-auto pt-4 border-t border-stone-100">
                  <svg className="mt-0.5 shrink-0 text-orange-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="text-sm font-medium">{event.location}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}

export default MusicSocietyEventsPage;

import { useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";

const categories = ["All", "Photos", "Videos", "Stage Performances", "Event Highlights"];

const galleryItems = [
  // Photos
  { id: 1, type: "Photos", title: "Grand Finale Moments", image: "/legacy/show.png", season: "Season 4" },
  { id: 2, type: "Photos", title: "Stage Performances", image: "/legacy/patrons.jpg", season: "Season 4" },
  { id: 3, type: "Photos", title: "Artists Backstage", image: "/legacy/current_event.jpg", season: "Season 3" },
  { id: 4, type: "Photos", title: "Crowd Energy", image: "/legacy/about_group.png", season: "Season 2" },
  { id: 5, type: "Photos", title: "Award Ceremony", image: "/legacy/patrons.jpg", season: "Season 1" },
  { id: 6, type: "Photos", title: "Opening Night", image: "/legacy/image1.jpeg", season: "Season 4" },
  // Stage Performances
  { id: 7, type: "Stage Performances", title: "Solo Performance", image: "/legacy/current_event.jpg", season: "Season 5" },
  { id: 8, type: "Stage Performances", title: "Voice of Rajasthan", image: "/legacy/KT.jpg", season: "Season 3" },
  { id: 9, type: "Stage Performances", title: "Group Fusion Act", image: "/legacy/show.png", season: "Season 2" },
  // Event Highlights
  { id: 10, type: "Event Highlights", title: "Grand Finale 2024", image: "/legacy/Joinus.jpg", season: "Season 4" },
  { id: 11, type: "Event Highlights", title: "Registration Launch", image: "/legacy/poster.png", season: "Season 5" },
  { id: 12, type: "Event Highlights", title: "Winners Felicitation", image: "/legacy/about_group.png", season: "Season 3" },
  // Videos
  { id: 13, type: "Videos", title: "Season 4 Highlights", image: "/legacy/show.png", season: "Season 4", isVideo: true, videoUrl: "https://www.youtube.com/live/r2VYf94YPNU?si=JObK4t3qQ_0VOrxE" },
  { id: 14, type: "Videos", title: "Season 3 Grand Finale", image: "/legacy/KT.jpg", season: "Season 3", isVideo: true, videoUrl: "https://youtu.be/kom0cU5fUFE" },
  { id: 15, type: "Videos", title: "DMS Aarohi Channel", image: "/legacy/current_event.jpg", season: "All Seasons", isVideo: true, videoUrl: "https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ" },
];

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.type === activeCategory);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Page Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Visual Journey
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Gallery
              </span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Relive the magic of DMS Aarohi Musical Society — from spectacular grand finales to soul-stirring solo performances.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal direction="up">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-[0_4px_15px_rgba(234,88,12,0.3)] scale-105"
                    : "bg-white border border-stone-200 text-stone-700 hover:border-orange-300 hover:text-orange-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              delay={idx * 0.05}
              className={`group relative rounded-2xl overflow-hidden shadow-md border border-stone-100 ${
                idx % 7 === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div className="aspect-square w-full h-full min-h-[160px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
                <p className="text-orange-300 text-xs font-bold uppercase tracking-wider mt-1">{item.season}</p>
              </div>

              {/* Video Play Icon */}
              {item.isVideo && (
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center hover:bg-white/50 transition">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </a>
              )}

              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-stone-700 backdrop-blur">
                  {item.isVideo ? "▶ Video" : "📸 Photo"}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* YouTube CTA */}
        <ScrollReveal direction="up">
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-red-500 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px]"></div>
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="black" />
                </svg>
              </div>
              <h2 className="font-serif text-3xl text-white font-bold mb-4">
                Watch Full Season Highlights
              </h2>
              <p className="text-stone-400 mb-8 max-w-lg mx-auto">
                All our seasons, grand finales, and behind-the-scenes content is available on our YouTube channel.
              </p>
              <a
                href="https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors shadow-[0_8px_20px_rgba(220,38,38,0.4)]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="black" />
                </svg>
                Visit Our YouTube Channel
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </>
  );
}

export default GalleryPage;

import SectionHeading from "../common/SectionHeading";

function PlaylistsSection() {
  const playlists = [
    { title: "DMS AAROHI TALENT HUNT", videoCount: 2, image: "/legacy/current_event.jpg", url: "https://www.youtube.com/watch?v=RCOXwxmZ9ik&list=PLukJPZtf5VqEAGQguTl-nUwungVK-bOPI" },
    { title: "Karaoke", videoCount: 1, image: "/legacy/image1.jpeg", url: "https://www.youtube.com/playlist?list=PLukJPZtf5VqEFoEugUorOZlv71ZpRjh1d" },
    { title: "Pankaj Mathur Songs", videoCount: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvWzzmBZpd9EclGoSuBeFktoo1cNNe9bHdV8edHpzZ9Q&s=10", url: "https://www.youtube.com/playlist?list=PLukJPZtf5VqFN2AM9yeK4ZJnOptaYboWc" },
    { title: "Dms Aarohi", videoCount: 133, image: "/legacy/current_event.jpg", url: "https://www.youtube.com/playlist?list=PLukJPZtf5VqGJCeiTkBmEYglsoHjXoJ4k" }
  ];

  return (
    <section id="playlists" className="mt-8 rounded-[2.5rem] border border-orange-100 bg-[#fff8ef] p-8 shadow-[0_20px_60px_rgba(234,88,12,0.05)] md:p-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <SectionHeading
          eyebrow="Our Channel"
          title="YouTube Playlists"
          text="Watch full playlists of our talent hunts, karaoke sessions, and more."
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
        {playlists.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-2 bg-white rounded-3xl p-5 shadow-sm hover:shadow-2xl border border-stone-100"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-stone-900 shadow-md">
              <img 
                src={item.image} 
                alt={item.title} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
              />
              
              {/* Playlist Side Overlay (like YouTube) */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="mb-2"><path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"/></svg>
                <span className="text-sm font-bold text-center tracking-widest uppercase">{item.videoCount} videos</span>
              </div>
              
              {/* Play All Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center gap-3 text-white font-bold text-lg bg-black/60 px-6 py-3 rounded-full backdrop-blur-md shadow-2xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  PLAY ALL
                </div>
              </div>
            </div>
            
            <div className="px-2 pt-2">
              <h3 className="font-serif text-2xl font-bold text-stone-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-base text-stone-500 mt-2 font-medium flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-orange-600">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </span>
                View full playlist on YouTube
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default PlaylistsSection;

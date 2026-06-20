import SectionHeading from "../common/SectionHeading";

function PerformancesSection() {
  const videos = [
    { title: "Live Performance 1", url: "https://www.youtube.com/embed/Wp5nRq0UdpU?si=wsb0xpEwD0S_hoNd", channelUrl: "https://www.youtube.com/@dmsaarohi" },
    { title: "Live Performance 2", url: "https://www.youtube.com/embed/RCOXwxmZ9ik?si=KQj8eTU7dOPZJp07", channelUrl: "https://www.youtube.com/@dmsaarohi" },
    { title: "Live Performance 3", url: "https://www.youtube.com/embed/F14ZS93PEB0?si=oagB3bdZWtPbcpnA", channelUrl: "https://www.youtube.com/@dmsaarohi" }
  ];

  return (
    <section id="performances" className="mt-8 rounded-[2.5rem] border border-orange-100 bg-[#fff8ef] p-8 shadow-[0_20px_60px_rgba(234,88,12,0.05)] md:p-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <SectionHeading
          eyebrow="Latest Performances"
          title="Relive the golden moments."
          text="Watch some of the best performances from our recent concerts and talent hunts."
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((item, idx) => (
          <article
            key={item.url}
            className="group relative overflow-hidden rounded-[2rem] border border-white bg-white/60 p-4 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-md"
          >
            <div className="mb-4 overflow-hidden rounded-2xl border border-stone-200 bg-black shadow-inner">
              <div className="relative pb-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={item.url}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
            
            <div className="px-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600 mb-1">Performance {idx + 1}</p>
              <h3 className="font-serif text-lg text-stone-900 md:text-xl font-bold">{item.title}</h3>
              
              <a
                href={item.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-orange-500/30"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                Subscribe
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PerformancesSection;

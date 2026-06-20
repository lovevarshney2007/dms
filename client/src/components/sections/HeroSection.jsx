import { Link } from "react-router-dom";

function HeroSection() {
  const stats = [
    ["2013", "Year of inception"],
    ["12A / 80G", "Income Tax Exempt"],
    ["Delhi NCR", "Base Location"]
  ];

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-stone-950 p-8 shadow-2xl md:p-16 lg:p-20 mt-4 md:mt-8">
      {/* Background Glows */}
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-600/20 blur-[100px]"></div>
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[120px]"></div>
      <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[url('/legacy/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        
        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-300">DMS Aarohi Musical Society</span>
          </div>

          <h1 className="font-serif text-5xl leading-tight text-white md:text-6xl lg:text-7xl">
            Music, culture & <br/>
            <span className="bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">social purpose.</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-stone-300">
            A voluntary non-profitable organisation devoted to the dissemination and enjoyment of Indian classical music. 
            Empowering voices across Delhi-NCR & beyond since 2013.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/music/register"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(234,88,12,0.4)]"
            >
              <span className="relative z-10">Join Us Now</span>
              <svg className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <a
              href="#performances"
              className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/50 px-8 py-4 font-bold text-stone-200 transition-all hover:bg-stone-800 hover:text-white backdrop-blur-sm"
            >
              <svg className="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Watch Performances
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 border-t border-stone-800 pt-8 mt-8">
            {stats.map(([value, label], idx) => (
              <div key={idx}>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-stone-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Images (Overlapping Composition) */}
        <div className="relative hidden lg:block h-[500px] xl:h-[600px] w-full">
          {/* Back Image */}
          <div className="absolute right-0 top-0 h-[350px] xl:h-[400px] w-[250px] xl:w-[300px] rotate-6 overflow-hidden rounded-3xl border-8 border-stone-900 shadow-2xl transition-transform duration-700 hover:rotate-12 hover:scale-105">
            <div className="absolute inset-0 bg-orange-900/20 mix-blend-overlay z-10"></div>
            <img src="/legacy/Joinus.jpg" alt="Join us" className="h-full w-full object-cover grayscale-[20%] transition-all hover:grayscale-0" />
          </div>
          {/* Front Image */}
          <div className="absolute bottom-10 left-0 h-[300px] xl:h-[350px] w-[320px] xl:w-[380px] -rotate-3 overflow-hidden rounded-3xl border-8 border-stone-900 shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-transform duration-700 hover:-rotate-6 hover:scale-105">
            <img src="/legacy/current_event.jpg" alt="Featured event" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-block rounded-full bg-orange-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md mb-2">
                Featured
              </div>
              <h3 className="font-serif text-lg xl:text-xl text-white">Voice of Delhi-NCR</h3>
            </div>
          </div>
          
          {/* Floating Music Note */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 animate-bounce drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13"/><path d="M6 15a3 3 0 1 0 3 3v-3H6zm12-2a3 3 0 1 0 3 3v-3h-3z"/></svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;

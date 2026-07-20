import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ from = 0, to, duration = 2 }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Portal() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-inter overflow-hidden">
      {/* Background Overlays */}
      <div className="absolute inset-0 noise-bg opacity-30 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 hero-glow-orange opacity-30 pointer-events-none" />
      <div className="absolute inset-0 hero-glow-green opacity-20 pointer-events-none" />
      
      {/* Spiral Wave Pattern (matches screenshot better than generic wave) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: `repeating-radial-gradient(circle at center, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px)`,
          backgroundSize: '100% 100%'
        }} 
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0B0B] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
        
        {/* 1. HERO SECTION */}
        <section className="pt-16 pb-8 flex flex-col items-center text-center">
          
          {/* Logo Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative border border-white/10 rounded-[3rem] px-10 py-5 bg-black/60 backdrop-blur-xl shadow-2xl mb-8 flex items-center justify-center"
          >
            {/* Glowing particles effect */}
            <div className="absolute -left-2 top-2 w-2 h-2 bg-[#FF9A2E] rounded-full shadow-[0_0_10px_#FF9A2E] opacity-70 animate-pulse" />
            <div className="absolute right-4 bottom-2 w-1.5 h-1.5 bg-[#FF9A2E] rounded-full shadow-[0_0_8px_#FF9A2E] opacity-50 animate-pulse" />
            <div className="absolute top-1 right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white] opacity-30 animate-ping" />
            
            <img src="/DMS_Logo1.png" alt="DMS Aarohi" className="h-16 object-contain" />
          </motion.div>

          {/* MUSIC • COMMUNITY • IMPACT */}
          <p className="tracking-[0.4em] text-xs font-semibold text-gray-400 mb-12 uppercase">
            Music • Community • Impact
          </p>

          {/* Heading and Paragraph Block */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-16">
            <h1 className="text-5xl lg:text-7xl font-outfit font-extrabold leading-[1.1] tracking-tight text-left">
              <span className="block text-white">One Family.</span>
              <span className="block text-[#FF9A2E]">
                Two Journeys.
              </span>
            </h1>
            
            <p className="max-w-[320px] text-gray-300 text-lg leading-relaxed text-left lg:ml-8 font-inter mt-4 lg:mt-0">
              Discover talent, inspire communities, and become part of a legacy built through music and service.
            </p>
          </div>

          <p className="text-xl text-gray-400 font-inter tracking-wide mt-8">
            Music That Inspires.
          </p>
        </section>

        {/* 2. TWO JOURNEY CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 mt-8">
          
          {/* Card 1: Talent */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(255,154,46,0.15)' }}
            transition={{ duration: 0.5 }}
            className="group relative h-[600px] rounded-[28px] overflow-hidden border border-white/5 bg-[#111]"
          >
            <img 
              src="/images/homebg.jpg" 
              alt="Talent Platform" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-10 flex flex-col items-start text-left">
              <span className="px-4 py-1.5 rounded-full bg-[#FF9A2E]/10 border border-[#FF9A2E]/20 text-[#FF9A2E] text-[10px] font-bold uppercase tracking-[0.15em] mb-4">
                Talent Platform
              </span>
              <h2 className="text-4xl font-outfit font-extrabold text-white mb-3 tracking-tight">Discover Your Talent</h2>
              <p className="text-gray-300 mb-8 max-w-sm font-inter text-sm leading-relaxed">
                Singing competitions, live performances, workshops and artist development across multiple cities.
              </p>
              
              <div className="flex flex-col w-full gap-3">
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF9A2E] to-[#FF8c1c] text-white font-bold text-[15px] hover:shadow-[0_0_20px_rgba(255,154,46,0.3)] transition-all transform group-hover:scale-[1.02]">
                  Join as a Performer
                </button>
                <button className="w-full py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-[15px] hover:bg-white/10 transition-all flex items-center justify-center gap-2 group/btn">
                  Explore Talent Hunt <span className="text-gray-400 group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Social */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(34,197,94,0.15)' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative h-[600px] rounded-[28px] overflow-hidden border border-white/5 bg-[#111]"
          >
            <img 
              src="/images/about_group.jpg" 
              alt="Social Initiative" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-10 flex flex-col items-start text-left">
              <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-4">
                Social Initiative
              </span>
              <h2 className="text-4xl font-outfit font-extrabold text-white mb-3 tracking-tight">Make a Difference</h2>
              <p className="text-gray-300 mb-8 max-w-sm font-inter text-sm leading-relaxed">
                Join our initiatives in blood donation, education, community welfare and social impact.
              </p>
              
              <div className="flex flex-col w-full gap-3">
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF9A2E] to-[#FF8c1c] text-white font-bold text-[15px] hover:shadow-[0_0_20px_rgba(255,154,46,0.3)] transition-all transform group-hover:scale-[1.02]">
                  Become a Volunteer
                </button>
                <button className="w-full py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-[15px] hover:bg-white/10 transition-all flex items-center justify-center gap-2 group/btn">
                  Explore Initiatives <span className="text-gray-400 group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </motion.div>

        </section>

        {/* 3. STATISTICS SECTION */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[28px] py-14 px-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] opacity-10 pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
              
              <div className="flex flex-col items-center justify-center text-center p-2">
                <span className="text-2xl mb-4">🏆</span>
                <div className="text-3xl font-outfit font-extrabold text-white mb-2"><Counter to={14} />+</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Years of Legacy</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-2">
                <span className="text-2xl mb-4">🎤</span>
                <div className="text-3xl font-outfit font-extrabold text-white mb-2">Multiple</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Talent Competitions</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-2">
                <span className="text-2xl mb-4">❤️</span>
                <div className="text-3xl font-outfit font-extrabold text-white mb-2"><Counter to={500} />+</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Volunteers</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-2">
                <span className="text-2xl mb-4">🌍</span>
                <div className="text-3xl font-outfit font-extrabold text-white mb-2"><Counter to={100} />+</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Community Initiatives</div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* 4. FOOTER */}
        <footer className="pt-16 pb-12 mt-20 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 max-w-5xl mx-auto">
            
            {/* Left Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-4 mb-5">
                <img src="/DMS_Logo1.png" alt="Logo" className="h-10 object-contain filter grayscale brightness-200 opacity-80" />
              </div>
              <h3 className="text-lg font-outfit font-bold tracking-widest mb-2 text-white">DMS AAROHI</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4">
                Music • Community • Impact
              </p>
              <p className="text-gray-400 text-xs mb-10">
                Inspiring Talent. Creating Impact.
              </p>
              <p className="text-gray-600 text-[10px] tracking-wider">
                © 2026 DMS Aarohi
              </p>
            </div>

            {/* Middle Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left pt-2">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-white">Explore</h4>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors mb-3">Talent Hunt</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors mb-3">Social Initiative</a>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left pt-2">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-white">Connect</h4>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors mb-3">Instagram</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors mb-3">YouTube</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors mb-3">Facebook</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors mb-3">Email</a>
            </div>

          </div>

          <div className="flex flex-col items-center justify-center mt-12 opacity-30">
            <span className="text-[9px] uppercase tracking-[0.3em] mb-2 font-semibold">Discover More</span>
            <span className="animate-bounce text-xs">↓</span>
          </div>
        </footer>

      </div>
    </div>
  );
}

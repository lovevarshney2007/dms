import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Premium3DCard = ({ children, cursorColor, glowColor, hoverShadow }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  function handleMouseMove(event) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(mouseXPos);
    y.set(mouseYPos);

    rotateX.set(yPct * -10); // Softer rotation for a more premium feel
    rotateY.set(xPct * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  }

  const backgroundStr = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`group relative h-full w-full rounded-[24px] p-6 sm:p-10 flex flex-col transition-all duration-500 ease-out hover:-translate-y-2 ${hoverShadow}`}
      data-cursor-color={cursorColor}
    >
      {/* Dynamic Border Glow */}
      <motion.div
        className="absolute inset-0 z-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: backgroundStr }}
      />

      {/* Base Glass Background & Inner Shadow */}
      <div
        className="absolute inset-[1px] z-0 rounded-[24px] bg-[rgba(18,18,18,0.7)] backdrop-blur-2xl border border-[rgba(255,255,255,0.08)] group-hover:border-[rgba(255,255,255,0.15)] shadow-2xl transition-all duration-500"
      />

      {/* Content wrapper with translateZ for parallax effect */}
      <div
        className="relative z-10 flex flex-col h-full"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
};

const FeatureCards = () => {
  return (
    <section className="px-6 pb-16 max-w-[1440px] mx-auto relative z-10 mt-8 w-full perspective-[2000px]">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[56px] items-stretch">

        {/* Left: Talent Hunt */}
        <Premium3DCard
          cursorColor="orange"
          glowColor="rgba(255,140,0,0.12)"
          hoverShadow="hover:shadow-[0_30px_60px_-15px_rgba(255,140,0,0.2)]"
        >
          {/* 16:9 Image */}
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 relative border border-white/5 shadow-inner transition-all duration-500 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-white/10">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXOHzAQp0ZXpRT3g_pYyk_Y9pBbKlTz07CQSIV9QagKA&s=10"
              alt="Singer on stage with microphone"
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
          </div>

          <div className="glass-pill self-start px-4 py-1.5 mb-5 rounded-full border-[#FF8C00]/30 bg-[#FF8C00]/10 text-[#FF8C00] text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(255,140,0,0.1)]">
            Talent Platform
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-md tracking-tight">
            Discover Your Talent
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-medium mb-8 leading-relaxed max-w-md line-clamp-3">
            Singing competitions, live performances, workshops and artist development across multiple cities.
          </p>

          <div className="mt-auto flex flex-col w-full">
            {/* Subtle Inline Stats */}
            <div className="w-full border-y border-white/5 py-4 mb-8 flex flex-row justify-around sm:justify-start sm:gap-16 items-center bg-white/[0.01] transition-colors duration-500 group-hover:bg-white/[0.03]">
              <div className="flex items-center gap-3 group/stat">
                <div className="text-2xl group-hover/stat:scale-110 group-hover/stat:-translate-y-1 transition-transform duration-300 drop-shadow-md">🏆</div>
                <div className="flex flex-col">
                  <div className="text-lg sm:text-xl font-bold text-white leading-tight">14+</div>
                  <div className="text-[10px] sm:text-xs text-white/50 font-bold uppercase tracking-widest group-hover/stat:text-white/80 transition-colors">Years</div>
                </div>
              </div>

              <div className="flex items-center gap-3 group/stat">
                <div className="text-2xl group-hover/stat:scale-110 group-hover/stat:-translate-y-1 transition-transform duration-300 drop-shadow-md">🎤</div>
                <div className="flex flex-col">
                  <div className="text-lg sm:text-xl font-bold text-white leading-tight">2500+</div>
                  <div className="text-[10px] sm:text-xs text-white/50 font-bold uppercase tracking-widest group-hover/stat:text-white/80 transition-colors">Artists</div>
                </div>
              </div>
            </div>

            {/* Premium Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <a
                href="https://dms-ten-gamma.vercel.app/"
                className="flex-1 relative overflow-hidden font-bold rounded-lg px-6 py-3.5 transition-all duration-300 flex items-center justify-center group/btn bg-gradient-to-r from-[#FF8C00] to-[#FF4500] text-white shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:shadow-[0_0_40px_rgba(255,140,0,0.6)] hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center">
                  Explore Talent Hunt <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
              </a>
              <a
                href="https://dms-ten-gamma.vercel.app/register"
                className="flex-1 relative overflow-hidden font-bold rounded-lg px-6 py-3.5 transition-all duration-300 flex items-center justify-center group/btn2 bg-white/[0.03] border border-white/10 text-white/80 hover:bg-white/[0.08] hover:border-white/30 hover:text-white hover:-translate-y-1 shadow-sm"
              >
                <span className="relative z-10">Register Now</span>
              </a>
            </div>
          </div>
        </Premium3DCard>

        {/* Right: NGO */}
        <Premium3DCard
          cursorColor="emerald"
          glowColor="rgba(16,185,129,0.12)"
          hoverShadow="hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.2)]"
        >
          {/* 16:9 Image */}
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 relative border border-white/5 shadow-inner transition-all duration-500 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-white/10">
            <img
              src="/ngo/child-education.jpg"
              alt="Community volunteering and helping"
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
          </div>

          <div className="glass-pill self-start px-4 py-1.5 mb-5 rounded-full border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            Social Initiative
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-md tracking-tight">
            Make a Difference
          </h2>
          <p className="text-base sm:text-lg text-white/60 font-medium mb-8 leading-relaxed max-w-md line-clamp-3">
            Join our initiatives in blood donation, education, community welfare and social impact.
          </p>

          <div className="mt-auto flex flex-col w-full">
            {/* Subtle Inline Stats */}
            <div className="w-full border-y border-white/5 py-4 mb-8 flex flex-row justify-around sm:justify-start sm:gap-16 items-center bg-white/[0.01] transition-colors duration-500 group-hover:bg-white/[0.03]">
              <div className="flex items-center gap-3 group/stat">
                <div className="text-2xl group-hover/stat:scale-110 group-hover/stat:-translate-y-1 transition-transform duration-300 drop-shadow-md">❤️</div>
                <div className="flex flex-col">
                  <div className="text-lg sm:text-xl font-bold text-white leading-tight">100+</div>
                  <div className="text-[10px] sm:text-xs text-white/50 font-bold uppercase tracking-widest group-hover/stat:text-white/80 transition-colors">Volunteers</div>
                </div>
              </div>

              <div className="flex items-center gap-3 group/stat">
                <div className="text-2xl group-hover/stat:scale-110 group-hover/stat:-translate-y-1 transition-transform duration-300 drop-shadow-md">🌍</div>
                <div className="flex flex-col">
                  <div className="text-lg sm:text-xl font-bold text-white leading-tight">70+</div>
                  <div className="text-[10px] sm:text-xs text-white/50 font-bold uppercase tracking-widest group-hover/stat:text-white/80 transition-colors">Initiatives</div>
                </div>
              </div>
            </div>

            {/* Premium Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <a
                href="https://dms-ngo.vercel.app/"
                className="flex-1 relative overflow-hidden font-bold rounded-lg px-6 py-3.5 transition-all duration-300 flex items-center justify-center group/btn bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center">
                  Explore NGO <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
              </a>
              <a
                href="https://dms-ngo.vercel.app/#volunteer"
                className="flex-1 relative overflow-hidden font-bold rounded-lg px-6 py-3.5 transition-all duration-300 flex items-center justify-center group/btn2 bg-white/[0.03] border border-white/10 text-white/80 hover:bg-white/[0.08] hover:border-white/30 hover:text-white hover:-translate-y-1 shadow-sm"
              >
                <span className="relative z-10">Become a Volunteer</span>
              </a>
            </div>
          </div>
        </Premium3DCard>

      </div>
    </section>
  );
};

export default FeatureCards;

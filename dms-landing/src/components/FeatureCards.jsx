import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GlassButton = ({ children, variant, className, as = "button", ...props }) => {
  const base = "relative overflow-hidden font-bold rounded-lg px-6 py-3 transition-all duration-300 flex items-center justify-center group/btn";
  const variants = {
    primary: "bg-gradient-to-r from-[#FF8C00] to-[#FF4500] text-white shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:shadow-[0_0_35px_rgba(255,140,0,0.6)] hover:-translate-y-1",
    secondary: "bg-white/[0.03] text-white hover:bg-white/[0.08] hover:-translate-y-1"
  };
  
  const Component = as;
  
  return (
    <Component className={`${base} ${variants[variant]} ${className}`} {...props}>
      <div className="relative z-10 flex items-center">{children}</div>
      <div className="absolute inset-0 bg-white opacity-0 group-active/btn:opacity-20 transition-opacity duration-300" />
    </Component>
  );
};

const Premium3DCard = ({ children, cursorColor, glowColor }) => {
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
    
    // Rotate slightly
    rotateX.set(yPct * -15);
    rotateY.set(xPct * 15);
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
      className="group relative h-full w-full rounded-2xl p-8 sm:p-12 flex flex-col transition-all duration-500 ease-out"
      data-cursor-color={cursorColor}
    >
      {/* Dynamic Border Glow */}
      <motion.div
        className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: backgroundStr }}
      />
      
      {/* Base Glass Background & Inner Shadow */}
      <div 
        className="absolute inset-[1px] z-0 rounded-2xl bg-[rgba(18,18,18,0.65)] backdrop-blur-xl border border-[rgba(255,255,255,0.05)] shadow-2xl transition-all duration-500 group-hover:shadow-black/50"
      />
      
      {/* Content wrapper with translateZ for parallax effect */}
      <div 
        className="relative z-10 flex flex-col h-full"
        style={{ transform: "translateZ(30px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
};

const FeatureCards = () => {
  return (
    <section className="px-6 pb-8 max-w-[1440px] mx-auto relative z-10 mt-8 w-full perspective-[2000px]">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[56px]">
        
        {/* Left: Talent Hunt */}
        <Premium3DCard cursorColor="orange" glowColor="rgba(255,140,0,0.15)">
          <div className="w-full h-[240px] sm:h-[320px] rounded-2xl overflow-hidden mb-8 relative border border-white/5">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXOHzAQp0ZXpRT3g_pYyk_Y9pBbKlTz07CQSIV9QagKA&s=10" 
              alt="Singer on stage with microphone" 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
          </div>

          <div className="glass-pill self-start px-4 py-1.5 mb-6 rounded-full border-[#FF8C00]/30 bg-[#FF8C00]/10 text-[#FF8C00] text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(255,140,0,0.1)]">
            Talent Platform
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Discover Your Talent
          </h2>
          <p className="text-lg text-white/70 font-medium mb-10 leading-relaxed max-w-md">
            Singing competitions, live performances, workshops and artist development across multiple cities.
          </p>
          
          <div className="mt-auto flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <GlassButton as="a" href="https://dms-ten-gamma.vercel.app/" target="_blank" rel="noopener noreferrer" variant="primary">
              Explore Platform
            </GlassButton>
            <GlassButton as="a" href="https://dms-ten-gamma.vercel.app/" target="_blank" rel="noopener noreferrer" variant="secondary" className="group/btn2">
              View Artists <ArrowRight className="w-5 h-5 ml-1 transition-transform duration-300 group-hover/btn2:translate-x-1" />
            </GlassButton>
          </div>
        </Premium3DCard>

        {/* Right: NGO */}
        <Premium3DCard cursorColor="emerald" glowColor="rgba(16,185,129,0.15)">
          <div className="w-full h-[240px] sm:h-[320px] rounded-2xl overflow-hidden mb-8 relative border border-white/5">
            <img 
              src="/ngo/child-education.jpg" 
              alt="Community volunteering and helping" 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
          </div>

          <div className="glass-pill self-start px-4 py-1.5 mb-6 rounded-full border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            Social Initiative
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Make a Difference
          </h2>
          <p className="text-lg text-white/70 font-medium mb-10 leading-relaxed max-w-md">
            Join our initiatives in blood donation, education, community welfare and social impact.
          </p>
          
          <div className="mt-auto flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <GlassButton as="a" href="https://dms-homepage.vercel.app/" target="_blank" rel="noopener noreferrer" variant="primary" className="!from-[#10B981] !to-[#059669] !shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:!shadow-[0_0_35px_rgba(16,185,129,0.6)]">
              Explore Initiatives
            </GlassButton>
            <GlassButton as="a" href="https://dms-homepage.vercel.app/" target="_blank" rel="noopener noreferrer" variant="secondary" className="group/btn2">
              Get Involved <ArrowRight className="w-5 h-5 ml-1 transition-transform duration-300 group-hover/btn2:translate-x-1" />
            </GlassButton>
          </div>
        </Premium3DCard>

      </div>
    </section>
  );
};

export default FeatureCards;

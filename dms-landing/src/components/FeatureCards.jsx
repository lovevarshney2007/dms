import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';

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

const FeatureCards = () => {
  return (
    <section className="px-6 pb-[100px] max-w-[1440px] mx-auto relative z-10 mt-8 w-full">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[56px]">
        
        {/* Left: Talent Hunt */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="group h-full"
        >
          <GlassCard className="h-full w-full p-8 sm:p-12 flex flex-col border-white/5 shadow-lg group-hover:shadow-[0_0_80px_rgba(255,140,0,0.2)] group-hover:border-[#FF8C00]/50 transition-all duration-500 group-hover:-translate-y-[10px] relative overflow-hidden bg-[#050505]/40">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C00]/0 to-[#FF8C00]/0 group-hover:from-[#FF8C00]/5 transition-colors duration-500 pointer-events-none" />

            <div className="flex flex-col h-full z-20">
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
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
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
            </div>
          </GlassCard>
        </motion.div>

        {/* Right: NGO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group h-full"
        >
          <GlassCard className="h-full w-full p-8 sm:p-12 flex flex-col border-white/5 shadow-lg group-hover:shadow-[0_0_80px_rgba(16,185,129,0.2)] group-hover:border-[#10B981]/50 transition-all duration-500 group-hover:-translate-y-[10px] relative overflow-hidden bg-[#050505]/40">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/0 to-[#10B981]/0 group-hover:from-[#10B981]/5 transition-colors duration-500 pointer-events-none" />

            <div className="flex flex-col h-full z-20">
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
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
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
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
};

export default FeatureCards;

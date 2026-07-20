import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play, Heart } from 'lucide-react';

const rotatingWords = [
  "Music",
  "Community",
  "Impact",
  "Hope",
  "Dreams",
  "Talent"
];

// Magnetic Button Component
const MagneticButton = ({ children, className, variant = 'primary', ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX * 0.3);
    y.set(mouseY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses = "relative overflow-hidden font-bold rounded-full px-8 py-4 transition-all duration-300 flex items-center justify-center group";
  const variants = {
    primary: "bg-gradient-to-r from-[#FF8C00] to-[#FF4500] text-white shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:shadow-[0_0_40px_rgba(255,140,0,0.6)]",
    secondary: "bg-white/[0.05] border border-white/[0.08] backdrop-blur-md text-white hover:bg-white/[0.1] hover:border-white/[0.2] shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="relative z-10 flex items-center">{children}</div>
      {/* Ripple/Glow Effect */}
      <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-300" />
    </motion.button>
  );
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] pt-32 pb-16 px-6 relative z-10 text-center w-full">
      
      {/* Background Audio Waveform (Subtle) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
        <div className="flex items-end gap-1 sm:gap-2 h-32 md:h-64">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 sm:w-2 bg-white rounded-t-full"
              animate={{
                height: [
                  `${Math.random() * 20 + 10}%`,
                  `${Math.random() * 80 + 20}%`,
                  `${Math.random() * 20 + 10}%`
                ]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-[1000px] flex flex-col items-center relative z-10"
      >
        {/* Animated Gradient Shine Headline */}
        <div className="relative overflow-hidden mb-6">
          <h1 className="text-[56px] sm:text-[72px] md:text-[96px] lg:text-[110px] font-[800] leading-[1.05] tracking-tighter text-white">
            DMS Aarohi
          </h1>
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] w-[200%]"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          />
        </div>
        
        {/* Subheading with Rotating Text */}
        <div className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-white/90 mb-10 flex items-center justify-center gap-3 h-[60px]">
          <span>One Family.</span>
          <div className="relative w-[220px] sm:w-[280px] md:w-[320px] h-[50px] md:h-[60px] overflow-hidden text-left flex items-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={currentIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                className="absolute inset-0 flex items-center bg-gradient-to-r from-[#FF8C00] to-[#10B981] bg-clip-text text-transparent"
              >
                {rotatingWords[currentIndex]}.
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-[700px] mb-12"
        >
          Discover extraordinary talent, serve the community, and become part of our legacy. Experience the perfect harmony of art and social impact.
        </motion.p>

        {/* Magnetic Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <MagneticButton variant="primary">
            Explore Talent
            <Play className="w-4 h-4 ml-2 fill-current" />
          </MagneticButton>
          <MagneticButton variant="secondary">
            Join Initiative
            <Heart className="w-4 h-4 ml-2 text-[#10B981]" />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

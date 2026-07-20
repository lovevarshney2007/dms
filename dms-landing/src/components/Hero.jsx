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
const MagneticButton = ({ children, className, variant = 'primary', href, ...props }) => {
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
    x.set(mouseX * 0.4);
    y.set(mouseY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses = "relative overflow-hidden font-bold rounded-full px-8 py-4 transition-all duration-500 flex items-center justify-center group";
  const variants = {
    primary: "bg-[length:200%_auto] bg-gradient-to-r from-[#FF8C00] via-[#FF4500] to-[#FF8C00] animate-[gradient_3s_linear_infinite] text-white shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:shadow-[0_0_50px_rgba(255,140,0,0.8)] hover:scale-105",
    secondary: "bg-white/[0.05] border border-white/[0.08] backdrop-blur-md text-white hover:bg-white/[0.1] hover:border-white/[0.3] shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
  };

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      ref={ref}
      href={href}
      target={href && href.startsWith('http') ? '_blank' : undefined}
      rel={href && href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="relative z-10 flex items-center">{children}</div>
      {/* Ripple/Glow Effect */}
      <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 ease-out opacity-0 group-hover:opacity-10 rounded-full" />
    </MotionComponent>
  );
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  
  // Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleHeroMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const parallaxX1 = useTransform(smoothX, [-1000, 1000], [-15, 15]);
  const parallaxY1 = useTransform(smoothY, [-1000, 1000], [-15, 15]);
  
  const parallaxX2 = useTransform(smoothX, [-1000, 1000], [-8, 8]);
  const parallaxY2 = useTransform(smoothY, [-1000, 1000], [-8, 8]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleHeroMouseMove}
      className="flex flex-col items-center justify-center min-h-[85vh] pt-32 pb-16 px-6 relative z-10 text-center w-full"
    >
      
      {/* Background Audio Waveform (Subtle) & Floating Elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none overflow-hidden">
        {/* Floating notes */}
        <motion.div 
          animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[15%] top-[20%] text-6xl"
        >
          ♪
        </motion.div>
        <motion.div 
          animate={{ y: [20, -20, 20], rotate: [0, -15, 15, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[20%] top-[30%] text-8xl"
        >
          ♫
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[25%] bottom-[30%] w-32 h-32 rounded-full border-[1px] border-white/50"
        />

        <div className="flex items-end gap-1 sm:gap-2 h-32 md:h-64 mt-32">
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
        style={{ x: parallaxX1, y: parallaxY1 }}
      >
        {/* Animated Gradient Shine Headline */}
        <div className="relative overflow-hidden mb-6 py-2">
          <h1 className="text-[56px] sm:text-[72px] md:text-[96px] lg:text-[110px] font-[800] leading-[1.05] tracking-tighter bg-gradient-to-b from-white via-[#d8d8d8] to-white bg-clip-text text-transparent drop-shadow-sm">
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
          style={{ x: parallaxX2, y: parallaxY2 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-[700px] mb-12"
        >
          Discover extraordinary talent, serve the community, and become part of our legacy. Experience the perfect harmony of art and social impact.
        </motion.p>

        {/* Magnetic Buttons */}
        <motion.div 
          style={{ x: parallaxX2, y: parallaxY2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <MagneticButton variant="primary" href="https://dms-ten-gamma.vercel.app/">
            Explore Talent
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          <MagneticButton variant="secondary" href="https://dms-homepage.vercel.app/">
            Join Initiative
            <Heart className="w-4 h-4 ml-2 text-[#10B981] group-hover:scale-110 transition-transform" />
          </MagneticButton>
        </motion.div>
      </motion.div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </section>
  );
};

export default Hero;

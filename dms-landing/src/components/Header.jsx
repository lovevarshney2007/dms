import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Header = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex flex-col items-center justify-center ${scrolled
          ? 'py-3 bg-[#050505]/40 backdrop-blur-[20px] border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : 'py-10'
        }`}
    >
      <div className={`transition-all duration-500 flex flex-col items-center justify-center ${scrolled ? 'scale-75' : 'scale-100'}`}>
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="glass-pill rounded-full px-6 sm:px-8 py-3 flex items-center justify-center relative overflow-hidden mb-3 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md pointer-events-none" />
          <img src="/images/DMS_Logo1%20(1).png" alt="DMS Aarohi" className="h-[40px] sm:h-[46px] object-contain drop-shadow-lg relative z-10 scale-110" />
        </motion.a>

        <div className={`text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[4px] sm:tracking-[8px] text-white/70 relative z-10 text-center transition-opacity duration-500 ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          Music • Community • Impact
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

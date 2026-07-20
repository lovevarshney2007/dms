import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LogoBanner = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex flex-col items-center pt-8"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="glass-pill rounded-full px-8 py-3 flex items-center gap-3 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* Micro glowing particles simulation could go here */}
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]" />
        </div>
        
        <Sparkles className="w-5 h-5 text-[#FFC15A]" />
        <span className="text-xl font-bold tracking-wide">DMS Aarohi</span>
        <Sparkles className="w-5 h-5 text-[#FFC15A]" />
      </motion.div>
      
      <div className="mt-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[8px] text-white/70">
        Music • Community • Impact
      </div>
    </motion.div>
  );
};

export default LogoBanner;

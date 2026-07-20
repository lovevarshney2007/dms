import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const SectionDivider = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-24 relative opacity-60 hover:opacity-100 transition-opacity duration-500">
      <div className="flex items-center gap-4 text-white/40 uppercase tracking-[4px] text-[10px] font-bold mb-4">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
        <span className="flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Explore Both Experiences
          <Sparkles className="w-3 h-3" />
        </span>
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
      </div>
      
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent"
      />
    </div>
  );
};

export default SectionDivider;

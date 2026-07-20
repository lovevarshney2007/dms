import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const SectionDivider = () => {
  return (
    <div className="w-full flex items-center justify-center py-16 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 bg-[#050505] p-2 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      >
        <Sparkles className="w-4 h-4 text-white/40" />
      </motion.div>
    </div>
  );
};

export default SectionDivider;

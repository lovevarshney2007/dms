import { motion } from 'framer-motion';

const ngoWords = ["Community", "NGO", "Blood Donation", "Education", "Social Impact"];
const talentWords = ["Music", "Workshops", "Talent Hunt", "Live Events", "Performances"];

const MarqueeSection = ({ words }) => (
  <div className="w-full sm:w-1/2 overflow-hidden relative flex items-center py-2 sm:py-0">
    {/* Gradient Fades for smooth entry/exit */}
    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#050505] to-transparent z-10" />
    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#050505] to-transparent z-10" />
    
    <div className="flex whitespace-nowrap opacity-40">
      <motion.div 
        className="flex gap-8 px-4"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Duplicate the array twice to ensure seamless looping */}
        {[...words, ...words, ...words, ...words].map((word, idx) => (
          <span key={idx} className="text-white text-sm font-medium tracking-wider uppercase flex items-center gap-8">
            {word}
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </span>
        ))}
      </motion.div>
    </div>
  </div>
);

const Marquee = () => {
  return (
    <div className="w-full py-4 border-y border-white/5 bg-[#050505] relative z-10">
      <div className="flex flex-col sm:flex-row max-w-[1440px] mx-auto">
        <MarqueeSection words={ngoWords} />
        <div className="hidden sm:block w-px bg-white/5 mx-4" />
        <MarqueeSection words={talentWords} />
      </div>
    </div>
  );
};

export default Marquee;


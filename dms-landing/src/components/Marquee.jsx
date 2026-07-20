import { motion } from 'framer-motion';

const words = [
  "Music", "Community", "NGO", "Workshops", "Talent Hunt", 
  "Live Events", "Performances", "Blood Donation", "Education", "Social Impact"
];

const Marquee = () => {
  return (
    <div className="w-full overflow-hidden py-4 border-y border-white/5 bg-[#050505] relative z-10 flex items-center">
      {/* Gradient Fades for smooth entry/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      
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
          {[...words, ...words, ...words].map((word, idx) => (
            <span key={idx} className="text-white text-sm font-medium tracking-wider uppercase flex items-center gap-8">
              {word}
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;

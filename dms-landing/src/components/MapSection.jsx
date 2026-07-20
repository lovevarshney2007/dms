import { motion } from 'framer-motion';

const pins = [
  { name: 'Delhi', cx: '350', cy: '250', delay: 0.1 },
  { name: 'Noida', cx: '360', cy: '260', delay: 0.2 },
  { name: 'Ghaziabad', cx: '370', cy: '240', delay: 0.3 },
  { name: 'Lucknow', cx: '450', cy: '350', delay: 0.4 },
  { name: 'Jaipur', cx: '250', cy: '300', delay: 0.5 },
  { name: 'Agra', cx: '350', cy: '330', delay: 0.6 },
];

const MapSection = () => {
  return (
    <section className="py-24 relative z-10 w-full max-w-[1200px] mx-auto px-6 overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Our Presence
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/60 text-lg max-w-2xl mx-auto"
        >
          Connecting talent and communities across India.
        </motion.p>
      </div>

      <div className="relative w-full aspect-[4/3] md:aspect-[2/1] max-w-[900px] mx-auto rounded-3xl border border-white/5 bg-[#050505]/50 backdrop-blur-sm p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden group">
        
        {/* Decorative Grid Background inside map */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Abstract SVG Map representation for high performance and stylized look */}
        <motion.svg 
          viewBox="0 0 800 800" 
          className="w-full h-full opacity-30 text-white stroke-current"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Extremely simplified, elegant bezier representation of India */}
          <path 
            d="M 300 50 C 400 0, 450 100, 500 150 C 650 150, 750 300, 700 450 C 650 600, 550 700, 400 750 C 350 780, 250 750, 200 650 C 100 550, 50 450, 100 350 C 150 200, 200 100, 300 50 Z" 
            fill="none" 
            strokeWidth="2"
            className="drop-shadow-lg"
          />
          <path 
            d="M 350 250 Q 400 400, 500 500 T 600 600" 
            fill="none" 
            strokeWidth="1"
            strokeDasharray="4 8"
            className="opacity-50"
          />
        </motion.svg>

        {/* Animated Pins */}
        {pins.map((pin, index) => (
          <motion.div 
            key={index}
            className="absolute group/pin cursor-pointer"
            style={{ left: `${(parseInt(pin.cx) / 800) * 100}%`, top: `${(parseInt(pin.cy) / 800) * 100}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + pin.delay, type: "spring", stiffness: 200 }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              {/* Pulsing ring */}
              <div className="absolute w-8 h-8 bg-[#FF8C00] rounded-full animate-ping opacity-20" />
              {/* Inner dot */}
              <div className="relative w-3 h-3 bg-[#FF8C00] rounded-full shadow-[0_0_15px_#FF8C00]" />
              
              {/* Tooltip */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded text-white text-xs whitespace-nowrap shadow-lg">
                  {pin.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Overlay Stats */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2 pointer-events-none">
          <div className="bg-[#050505]/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-white/80 text-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            2500+ Artists
          </div>
          <div className="bg-[#050505]/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-white/80 text-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FF8C00] animate-pulse" />
            500+ Volunteers
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;

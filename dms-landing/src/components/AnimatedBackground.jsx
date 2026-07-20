import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const symbols = ['✦', '♪', '♫', '°', '⋆'];

const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate 15 static particle data once
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 20 + 25, // 25-45s
      delay: Math.random() * -30,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
      {/* Layer 1: Deep Radial Gradient */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{
          background: 'radial-gradient(circle at center, #0a0a0a, #050505 100%)'
        }}
      />

      {/* Layer 2: Unified Connected Gradient Lighting */}
      <div 
        className="absolute inset-[-50%] opacity-20 mix-blend-screen pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #FF8C00 0deg, #8B5CF6 120deg, #10B981 240deg, #FF8C00 360deg)',
          filter: 'blur(100px)',
          animation: 'spinBackground 30s linear infinite'
        }}
      />
      
      {/* Center ambient light to soften the conic center */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #8B5CF6 0%, transparent 60%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Layer 3: Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 4: Tiny Animated Particles (Notes, Stars) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-white/10 flex items-center justify-center font-serif leading-none"
            style={{
              fontSize: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, 80, -80, 0],
              rotate: [0, 360, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spinBackground {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default AnimatedBackground;

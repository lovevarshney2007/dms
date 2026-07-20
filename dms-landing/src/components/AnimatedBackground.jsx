import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate static particle data once
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 40 + 20, // 20-60s
      delay: Math.random() * -30,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
      {/* Layer 1: Deep Radial Gradient */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at top, #111111, #050505 80%)'
        }}
      />

      {/* Layer 2: Animated Blurred Gradient Blobs */}
      {/* Orange Glow - Top Left */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-15 pointer-events-none animate-blob"
        style={{ 
          background: '#FF8C00',
          filter: 'blur(150px)',
          animationDuration: '25s' 
        }}
      />
      {/* Emerald Glow - Bottom Right */}
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-15 pointer-events-none animate-blob animation-delay-4000"
        style={{ 
          background: '#10B981',
          filter: 'blur(150px)',
          animationDuration: '28s',
          animationDirection: 'reverse'
        }}
      />
      {/* Purple Glow - Center */}
      <div 
        className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full mix-blend-screen opacity-[0.12] pointer-events-none animate-blob animation-delay-2000"
        style={{ 
          background: '#8B5CF6',
          filter: 'blur(150px)',
          animationDuration: '30s'
        }}
      />

      {/* Layer 3: Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 4: Tiny Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white opacity-15"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, -50, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Define CSS keyframes globally for this component since we are using inline styles for blobs */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob infinite ease-in-out alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />
    </div>
  );
};

export default AnimatedBackground;

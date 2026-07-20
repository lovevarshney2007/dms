import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const AnimatedCounter = ({ from, to, suffix, duration = 2 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration, ease: "easeOut" });
    }
  }, [inView, count, to, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const StatItem = ({ icon, end, suffix, subtitle, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className="flex flex-col items-center text-center p-6 group transition-all duration-300 hover:-translate-y-2 cursor-default"
  >
    <motion.div 
      initial={{ scale: 0.5, y: 20 }}
      whileInView={{ scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", bounce: 0.6, delay: delay + 0.2 }}
      className="text-4xl mb-4"
    >
      {icon}
    </motion.div>
    
    <div 
      className={`text-[48px] font-bold text-white mb-2 leading-none transition-all duration-500`}
      style={{ textShadow: `0 0 20px ${color}` }}
    >
      <AnimatedCounter from={0} to={end} suffix={suffix} />
    </div>
    
    <div className="text-white/70 text-xs font-bold tracking-[3px] uppercase mt-2 group-hover:text-white transition-colors duration-300 max-w-[160px]">
      {subtitle}
    </div>
  </motion.div>
);

const Stats = () => {
  const stats = [
    { icon: '🏆', end: 14, suffix: '+', subtitle: 'Years of Excellence', delay: 0, color: 'rgba(255,215,0,0.4)' },
    { icon: '🎤', end: 2500, suffix: '+', subtitle: 'Artists Empowered', delay: 0.1, color: 'rgba(255,140,0,0.4)' },
    { icon: '❤️', end: 500, suffix: '+', subtitle: 'Volunteers', delay: 0.2, color: 'rgba(220,38,38,0.4)' },
    { icon: '🌍', end: 100, suffix: '+', subtitle: 'Social Initiatives', delay: 0.3, color: 'rgba(16,185,129,0.4)' },
  ];

  return (
    <section className="px-6 pb-[140px] max-w-[1440px] mx-auto relative z-10 w-full">
      <div className="relative rounded-[30px] w-full p-[1px] overflow-hidden group/stats">
        
        {/* Animated Gradient Border via background rotation */}
        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,140,0,0)_0%,rgba(255,140,0,0.5)_50%,rgba(16,185,129,0.5)_100%)] opacity-30 group-hover/stats:opacity-100 transition-opacity duration-500" />
        
        <div className="relative glass-panel rounded-[29px] w-full py-12 px-8 bg-[#050505]/80 backdrop-blur-xl border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Faint Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <StatItem 
                key={idx}
                icon={stat.icon}
                end={stat.end}
                suffix={stat.suffix}
                subtitle={stat.subtitle}
                delay={stat.delay}
                color={stat.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;

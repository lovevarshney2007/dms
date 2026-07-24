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
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, type: "spring", bounce: 0.5 }}
    className="flex flex-col items-center text-center p-8 group transition-all duration-500 hover:-translate-y-3 cursor-default relative overflow-hidden rounded-[24px] bg-[#050505]/60 backdrop-blur-xl border border-white/5 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
  >
    {/* Inner glow */}
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
      style={{ background: `radial-gradient(circle at top, ${color}, transparent)` }}
    />
    
    <motion.div 
      initial={{ scale: 0.2, y: 30, rotate: -20 }}
      whileInView={{ scale: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", bounce: 0.7, delay: delay + 0.3 }}
      className="text-4xl mb-4 relative z-10"
    >
      {icon}
    </motion.div>
    
    <div 
      className={`text-[48px] font-bold text-white mb-2 leading-none transition-all duration-500 relative z-10 drop-shadow-md`}
      style={{ textShadow: `0 0 20px ${color}` }}
    >
      <AnimatedCounter from={0} to={end} suffix={suffix} />
    </div>
    
    <div className="text-white/60 text-xs font-bold tracking-[3px] uppercase mt-2 group-hover:text-white transition-colors duration-300 max-w-[160px] relative z-10">
      {subtitle}
    </div>
  </motion.div>
);

const Stats = () => {
  const stats = [
    { icon: '🏆', end: 14, suffix: '+', subtitle: 'Years of Excellence', delay: 0, color: 'rgba(255,215,0,0.4)' },
    { icon: '🎤', end: 2500, suffix: '+', subtitle: 'Artists Empowered', delay: 0.1, color: 'rgba(255,140,0,0.4)' },
    { icon: '❤️', end: 100, suffix: '+', subtitle: 'Volunteers', delay: 0.2, color: 'rgba(220,38,38,0.4)' },
    { icon: '🌍', end: 70, suffix: '+', subtitle: 'Social Initiatives', delay: 0.3, color: 'rgba(16,185,129,0.4)' },
  ];

  return (
    <section className="px-6 pb-[140px] max-w-[1440px] mx-auto relative z-10 w-full">
      {/* Faint Grid Background over the whole stats area */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.3] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
    </section>
  );
};

export default Stats;

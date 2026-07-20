import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorSpotlight = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [color, setColor] = useState('rgba(255,255,255,0.08)');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    // Only show on devices with a mouse
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target.closest('[data-cursor-color]');
      if (target) {
        const type = target.getAttribute('data-cursor-color');
        if (type === 'orange') setColor('rgba(255,140,0,0.15)');
        else if (type === 'emerald') setColor('rgba(16,185,129,0.15)');
      } else {
        setColor('rgba(255,255,255,0.08)');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-50 mix-blend-screen transition-colors duration-500"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
      }}
    />
  );
};

export default CursorSpotlight;

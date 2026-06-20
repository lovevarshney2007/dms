// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ScrollReveal({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.6,
  className = "",
  id
}) {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut" 
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}

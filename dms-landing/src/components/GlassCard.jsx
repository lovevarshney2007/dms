import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      className={`glass-panel rounded-[32px] overflow-hidden relative group ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;

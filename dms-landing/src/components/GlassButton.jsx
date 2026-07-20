import { motion } from 'framer-motion';

const GlassButton = ({ variant = 'primary', children, className = '', ...props }) => {
  const isPrimary = variant === 'primary';
  const baseClass = isPrimary ? 'glass-button-primary' : 'glass-button-secondary';
  
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`h-[60px] rounded-[18px] px-8 font-semibold flex items-center justify-center gap-2 ${baseClass} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlassButton;

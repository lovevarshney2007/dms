import { motion } from 'framer-motion';

const SectionTitle = ({ children, className = '' }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-center text-gray-400 text-sm font-medium tracking-[4px] uppercase ${className}`}
    >
      {children}
    </motion.h2>
  );
};

export default SectionTitle;

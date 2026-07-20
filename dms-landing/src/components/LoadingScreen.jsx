import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: logo, 1: waveform, 2: fade out

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1500); // show logo for 1.5s
    const t2 = setTimeout(() => setStage(2), 3000); // show waveform for 1.5s
    const t3 = setTimeout(() => onComplete(), 3800); // allow fade out
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
        >
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">DMS Aarohi</h1>
              </motion.div>
            )}
            {stage === 1 && (
              <motion.div
                key="waveform"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-end gap-1 h-16"
              >
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-white rounded-t-full"
                    animate={{
                      height: ["20%", "100%", "20%"]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.05
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

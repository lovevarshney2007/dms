import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import CursorSpotlight from './components/CursorSpotlight';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import FeatureCards from './components/FeatureCards';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Global link interception for smooth transitions
  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.href && !target.hasAttribute('download') && target.target !== '_blank') {
        const url = new URL(target.href);
        // We want all internal and external links to open in the same tab, unless explicitly marked as _blank
        // Avoid intercepting anchor links (e.g., #about)
        if (url.pathname !== window.location.pathname || url.origin !== window.location.origin) {
          e.preventDefault();
          setIsTransitioning(true);
          setTimeout(() => {
            window.location.href = target.href;
          }, 300);
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-[#050505] text-white selection:bg-white/20 selection:text-white overflow-x-hidden relative">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <CursorSpotlight />
      <AnimatedBackground />
      <Header />
      
      <motion.main 
        className="relative z-10 flex flex-col items-center w-full"
        animate={{ 
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 0.95 : 1,
          filter: isTransitioning ? "blur(10px)" : "blur(0px)"
        }}
        transition={{ duration: 0.3 }}
      >
        <Hero />
        <Marquee />
        <FeatureCards />
        
        <SectionDivider />
        
      </motion.main>
      <Footer />
    </div>
  );
}

export default App;

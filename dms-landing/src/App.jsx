import AnimatedBackground from './components/AnimatedBackground';
import CursorSpotlight from './components/CursorSpotlight';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import Stats from './components/Stats';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

function App() {
  return (
    <div className="min-h-screen font-sans bg-[#050505] text-white selection:bg-white/20 selection:text-white overflow-x-hidden relative">
      <CursorSpotlight />
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <FeatureCards />
        
        <SectionDivider />
        
        <Stats />
        
      </main>
      <Footer />
    </div>
  );
}

export default App;

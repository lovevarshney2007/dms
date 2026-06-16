import Footer from "./Footer";
import Navbar from "./Navbar";
import NgoNavbar from "./NgoNavbar";
import MusicNavbar from "./MusicNavbar";
import { useLocation } from "react-router-dom";

function PageShell({ basePath = "/", children, isNgo = false, isMusic = false }) {
  const location = useLocation();
  const showNgoNavbar = isNgo || location.pathname.startsWith("/ngo");
  const showMusicNavbar =
    isMusic || location.pathname.startsWith("/music-society") || location.pathname.startsWith("/music");
  
  return (
    <div
      // CHANGED: pt-[76px] md:pt-[84px] add kiya taaki fixed navbar ke peeche content na chhupe
      className={`relative min-h-screen pt-[76px] md:pt-[84px] bg-[radial-gradient(circle_at_top_left,rgba(171,63,45,0.18),transparent_28%),radial-gradient(circle_at_right_center,rgba(204,160,87,0.24),transparent_24%),linear-gradient(180deg,#f8f0e4_0%,#efe1cf_100%)] text-stone-900 flex flex-col`}
      style={{ scrollPaddingTop: "5rem" }}
    >
      {/* Floating Music Notes Background */}
      <div className="music-notes-container hidden sm:block"> {/* Mobile par performance ke liye hide kar sakte hain ya block rakh sakte hain */}
        <div className="floating-note">🎵</div>
        <div className="floating-note">🎶</div>
        <div className="floating-note">♫</div>
        <div className="floating-note">♪</div>
        <div className="floating-note">🎼</div>
        <div className="floating-note">🎶</div>
        <div className="floating-note">🎵</div>
      </div>

      {/* Navbars */}
      {showNgoNavbar ? <NgoNavbar /> : showMusicNavbar ? <MusicNavbar /> : <Navbar basePath={basePath} />}
      
      {/* Main Content */}
      <main className="relative z-10 flex flex-col gap-10 sm:gap-16 md:gap-20 flex-grow">
        {children}
      </main>
      
      <Footer />

      {/* Floating Action Pill */}
      <a 
        href="/music/register" 
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full shadow-[0_4px_20px_rgba(234,88,12,0.4)] hover:scale-105 transition-all animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-white"></span>
        </span>
        <span className="font-bold text-xs md:text-sm tracking-wide">Register</span>
      </a>
    </div>
  );
}

export default PageShell;
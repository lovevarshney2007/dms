import { Link } from "react-router-dom";
import Footer from "./Footer";
import MusicNavbar from "./MusicNavbar";

function PageShell({ basePath = "/", children }) {
  return (
    <div
      className={`relative min-h-screen pt-[76px] md:pt-[84px] bg-[radial-gradient(circle_at_top_left,rgba(171,63,45,0.18),transparent_28%),radial-gradient(circle_at_right_center,rgba(204,160,87,0.24),transparent_24%),linear-gradient(180deg,#f8f0e4_0%,#efe1cf_100%)] text-stone-900 flex flex-col`}
      style={{ scrollPaddingTop: "5rem" }}
    >
      {/* Floating Music Notes Background */}
      <div className="music-notes-container hidden sm:block">
        <div className="floating-note">🎵</div>
        <div className="floating-note">🎶</div>
        <div className="floating-note">♫</div>
        <div className="floating-note">♪</div>
        <div className="floating-note">🎼</div>
        <div className="floating-note">🎶</div>
        <div className="floating-note">🎵</div>
      </div>

      {/* Unified Navbar for all pages */}
      <MusicNavbar />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col gap-6 sm:gap-10 md:gap-14 flex-grow">
        {children}
      </main>

      <Footer />

      {/* Floating Register Pill */}
      <Link
        to="/register"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full shadow-[0_4px_20px_rgba(234,88,12,0.4)] hover:scale-105 transition-all animate-bounce"
        style={{ animationDuration: "2s" }}
      >
        <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-white"></span>
        </span>
        <span className="font-bold text-xs md:text-sm tracking-wide">Register</span>
      </Link>
    </div>
  );
}

export default PageShell;
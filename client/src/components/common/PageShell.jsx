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
      <main className="relative z-10 flex flex-col gap-0 flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default PageShell;
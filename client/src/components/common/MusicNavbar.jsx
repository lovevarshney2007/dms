import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function MusicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const sectionBasePath = location.pathname.startsWith("/music-society") ? "/music-society" : "/music";
  const isMusicLanding = location.pathname === "/music" || location.pathname === "/music-society";

  const navItems = [
    { label: "Main Home", href: "/" },
    { label: "Music Home", href: isMusicLanding ? "#home" : `${sectionBasePath}#home` },
    { label: "About Us", href: isMusicLanding ? "#about" : `${sectionBasePath}#about` },
    { label: "Events", href: isMusicLanding ? "#events" : `${sectionBasePath}#events` },
    { label: "Performances", href: isMusicLanding ? "#performances" : `${sectionBasePath}#performances` },
    { label: "Gallery", href: isMusicLanding ? "#gallery" : `${sectionBasePath}#gallery` },
    { label: "Contact Us", href: isMusicLanding ? "#contact" : `${sectionBasePath}#contact` }
  ];

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-orange-300/40 bg-gradient-to-r from-orange-900/95 via-orange-800/95 to-amber-900/95 shadow-lg backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:gap-6 sm:px-6 md:px-8">
          {/* Logo & Brand */}
          <Link to="/" className="relative flex items-center gap-3">
            <div className="soundwave-container">
              <span className="soundwave-ring ring-1" />
              <span className="soundwave-ring ring-2" />
              <span className="soundwave-ring ring-3" />
              <img
                className="relative z-10 h-11 w-11 rounded-full border border-orange-300 bg-white object-cover shadow-lg"
                src="/legacy/tal_logo1.png"
                alt="DMS Aarohi Music Society"
                decoding="async"
                width="44"
                height="44"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-sm font-bold text-white">DMS Aarohi Music</p>
              <p className="text-xs text-orange-200">Musical Society</p>
            </div>
            <div className="block sm:hidden">
              <p className="font-serif text-xs font-bold text-white">DMS Aarohi</p>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="ml-auto block rounded-lg border border-orange-400/50 bg-white/15 p-2 text-orange-200 shadow-sm transition hover:bg-white/25 md:hidden backdrop-blur-sm"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3.5 py-2 text-sm font-semibold text-orange-100 transition hover:bg-white/15 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Join Button */}
          <a
            href="#contact"
            className="hidden md:inline-flex rounded-lg bg-gradient-to-r from-white/20 to-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:from-white/30 hover:to-white/20 border border-white/30 items-center gap-2"
          >
            <span>🎵</span>
            <span className="hidden lg:inline">Join Us</span>
          </a>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-orange-300/30 bg-gradient-to-b from-orange-800/95 to-orange-900/95 px-4 py-3 backdrop-blur-sm md:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-semibold text-orange-100 transition hover:bg-white/15 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-gradient-to-r from-white/20 to-white/10 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:from-white/30 hover:to-white/20 border border-white/30 flex items-center justify-center gap-2"
              >
                <span>🎵</span>
                <span>Join Us</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 sm:h-20" />
    </>
  );
}

export default MusicNavbar;

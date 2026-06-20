import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function MusicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(""); 
  const location = useLocation();
  const sectionBasePath = location.pathname.startsWith("/music-society") ? "/music-society" : "/music";
  const isMusicLanding = location.pathname === "/music" || location.pathname === "/music-society";

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "events", "performances", "gallery", "contact"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "main-home", label: "Main Home", href: "/" },
    { id: "home", label: "Music Home", href: isMusicLanding ? "#home" : `${sectionBasePath}#home` },
    { id: "about", label: "About Us", href: isMusicLanding ? "#about" : `${sectionBasePath}#about` },
    { id: "events", label: "Events", href: isMusicLanding ? "#events" : `${sectionBasePath}#events` },
    { id: "performances", label: "Performances", href: isMusicLanding ? "#performances" : `${sectionBasePath}#performances` },
    { id: "gallery", label: "Gallery", href: isMusicLanding ? "#gallery" : `${sectionBasePath}#gallery` },
    { id: "contact", label: "Contact Us", href: isMusicLanding ? "#contact" : `${sectionBasePath}#contact` }
  ];

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/40 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-nowrap items-center justify-between gap-2 md:gap-4 px-4 py-3 md:px-6 md:py-4">
          
          <Link to="/" className="relative flex items-center gap-2 md:gap-3 shrink-0">
            <div className="soundwave-container scale-[0.7] sm:scale-75 md:scale-100 origin-left">
              <span className="soundwave-ring ring-1" />
              <span className="soundwave-ring ring-2" />
              <span className="soundwave-ring ring-3" />
              <img
                className="relative z-10 h-10 w-10 md:h-11 md:w-11 object-contain drop-shadow-sm"
                src="/legacy/tal_logo1.png"
                alt="Talent Hunt logo"
                decoding="async"
              />
            </div>
            <div className="flex flex-col shrink-0">
              <p className="font-serif text-base md:text-xl font-bold text-stone-900 leading-tight">DMS Aarohi</p>
              <p className="text-[10px] md:text-sm text-stone-600 leading-tight whitespace-nowrap">Music Society</p>
            </div>
          </Link>

          <button
            type="button"
            className="md:hidden flex items-center justify-center p-2 rounded-lg border border-stone-300 bg-stone-100 text-stone-800 shadow-sm transition hover:bg-stone-200 shrink-0 ml-auto"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav
            className={`${
              menuOpen ? "flex" : "hidden"
            } absolute left-0 top-full w-full flex-col gap-4 border-t border-stone-200 bg-white/95 px-5 py-6 text-sm font-semibold text-stone-700 shadow-xl max-h-[80vh] overflow-y-auto md:max-h-none md:static md:flex md:w-auto md:flex-row md:items-center md:gap-5 md:border-none md:bg-transparent md:p-0 md:shadow-none`}
          >
            {navItems.map((item) => {
              const isPageNavigation = item.href === "/";
              const commonClasses = `relative py-2 md:py-1 text-[15px] font-semibold transition-colors duration-300 group block ${
                activeSection === item.id || (activeSection === "" && item.id === "home")
                  ? "text-orange-600"
                  : "text-stone-700 hover:text-orange-500"
              }`;
              const underlineClasses = `absolute left-0 bottom-0 md:-bottom-1 h-[2px] bg-orange-500 transition-all duration-300 ${
                activeSection === item.id || (activeSection === "" && item.id === "home") 
                  ? "w-12 md:w-full" 
                  : "w-0 group-hover:w-12 md:group-hover:w-full"
              }`;

              if (isPageNavigation) {
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={commonClasses}
                  >
                    {item.label}
                    <span className={underlineClasses}></span>
                  </Link>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={commonClasses}
                >
                  {item.label}
                  <span className={underlineClasses}></span>
                </a>
              );
            })}

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-4 md:mt-0 md:ml-2 pt-4 md:pt-0 border-t md:border-none border-stone-200">
              <Link to="/music/register" onClick={() => setMenuOpen(false)} className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-3 md:py-2.5 rounded-full hover:shadow-[0_4px_15px_rgba(234,88,12,0.3)] hover:-translate-y-0.5 text-[15px] font-bold transition-all text-center">
                Register
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default MusicNavbar;

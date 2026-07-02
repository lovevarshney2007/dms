import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function MusicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  // Scroll shadow effect on navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section scroll detection — only active on homepage
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("");
      return;
    }
    const sectionIds = [
      "hero",
      "about",
      "current-competition",
      "competitions",
      "performances",
      "events",
      "shows",
      "gallery",
      "success-stories",
      "ambassador",
      "jury",
      "sponsors",
      "contact",
    ];
    const onScroll = () => {
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      label: "Home",
      href: "/",
      type: "route",
      isActive: isHomePage && (activeSection === "" || activeSection === "hero"),
    },
    {
      label: "About",
      href: "/about",
      type: "route",
      isActive: location.pathname === "/about" || (isHomePage && activeSection === "about"),
    },
    {
      label: "Competitions",
      href: "/voice-of-delhi-ncr",
      type: "route",
      isActive: location.pathname.startsWith("/voice-of-delhi-ncr") || (isHomePage && (activeSection === "current-competition" || activeSection === "competitions")),
    },
    {
      label: "Shows",
      href: "/shows",
      type: "route",
      isActive: location.pathname === "/shows" || (isHomePage && (activeSection === "shows" || activeSection === "performances" || activeSection === "events")),
    },
    {
      label: "Gallery",
      href: "/gallery",
      type: "route",
      isActive: location.pathname === "/gallery" || (isHomePage && activeSection === "gallery"),
    },
    {
      label: "Success Stories",
      href: "/success-stories",
      type: "route",
      isActive: location.pathname === "/success-stories" || (isHomePage && (activeSection === "success-stories" || activeSection === "ambassador" || activeSection === "jury")),
    },
    {
      label: "Contact",
      href: "/contact",
      type: "route",
      isActive:
        location.pathname === "/contact" || (isHomePage && (activeSection === "contact" || activeSection === "sponsors")),
    },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b border-white/40 bg-white/90 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-nowrap items-center justify-between gap-2 md:gap-4 px-4 py-3 md:px-6 md:py-4">
          {/* Logo */}
          <Link to="/" className="relative flex items-center shrink-0 group">
            <div className="relative flex items-center justify-center py-1 px-2">
              {/* Soundwave Rings Animation */}
              <div className="absolute inset-0 border-2 border-orange-600 rounded-full animate-ping opacity-40"></div>
              <div className="absolute inset-[-4px] border-2 border-orange-500 rounded-full animate-pulse opacity-60 delay-75"></div>
              
              <img
                className="h-9 w-auto md:h-11 object-contain brightness-0 relative z-10 group-hover:scale-105 transition-transform duration-300"
                src="/images/logo.png"
                alt="DMS Aarohi Musical Society"
                decoding="async"
              />
            </div>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center p-2 rounded-lg border border-stone-300 bg-stone-100 text-stone-800 shadow-sm transition hover:bg-stone-200 shrink-0 ml-auto"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6"
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
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Nav links */}
          <nav
            className={`${
              menuOpen ? "flex" : "hidden"
            } absolute left-0 top-full w-full flex-col gap-4 border-t border-stone-200 bg-white/95 px-5 py-6 text-sm font-semibold text-stone-700 shadow-xl max-h-[80vh] overflow-y-auto md:max-h-none md:static md:flex md:w-auto md:flex-row md:items-center md:gap-5 md:border-none md:bg-transparent md:p-0 md:shadow-none`}
          >
            {navItems.map((item) => {
              const linkClass = `relative py-2 md:py-1 text-[15px] font-semibold transition-colors duration-300 group block ${
                item.isActive
                  ? "text-orange-600"
                  : "text-stone-700 hover:text-orange-500"
              }`;
              const underlineClass = `absolute left-0 bottom-0 md:-bottom-1 h-[2px] bg-orange-500 rounded-full transition-all duration-300 ${
                item.isActive
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`;

              if (item.type === "anchor") {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={linkClass}
                  >
                    {item.label}
                    <span className={underlineClass}></span>
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                  className={linkClass}
                >
                  {item.label}
                  <span className={underlineClass}></span>
                </Link>
              );
            })}

            {/* Register CTA button */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-4 md:mt-0 md:ml-2 pt-4 md:pt-0 border-t md:border-none border-stone-200">
              <Link
                to="/register"
                onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-3 md:py-2.5 rounded-full hover:shadow-[0_4px_15px_rgba(234,88,12,0.3)] hover:-translate-y-0.5 text-[15px] font-bold transition-all text-center whitespace-nowrap"
              >
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

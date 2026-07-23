import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TALENT_URL = "https://dms-ten-gamma.vercel.app/";
const NGO_URL = "https://dms-ngo.vercel.app/";

const NAV = [
  { label: "Home", to: "home" },
  { label: "About", to: "about" },
  { label: "Talent Hunt", to: "talent-hunt" },
  { label: "Social Initiative", to: "social-initiative" },
  { label: "Team", to: "team" },
  { label: "Contact", to: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        height: 64,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div className="wrap" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <ScrollLink to="home" smooth duration={600} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" alt="DMS Aarohi"
              style={{
                height: 40,
                objectFit: "contain",
                filter: scrolled
                  ? "none"
                  : "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
              }} />
            <div style={{ lineHeight: 1.2 }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16,
                color: scrolled ? "#111827" : "#fff",
              }}>
                DMS Aarohi
              </div>
              <div style={{ fontSize: 9.5, letterSpacing: "1.5px", textTransform: "uppercase", color: scrolled ? "#9CA3AF" : "rgba(255,255,255,0.65)" }}>
                Music &amp; Social
              </div>
            </div>
          </ScrollLink>

          {/* Desktop links */}
          <div className="desk-nav" style={{ display: "flex", gap: 2 }}>
            {NAV.map(l => (
              <ScrollLink key={l.to} to={l.to} smooth duration={700} offset={-64} spy
                style={{
                  padding: "6px 12px", borderRadius: 7, cursor: "pointer",
                  fontSize: 13.5, fontWeight: 500,
                  color: scrolled ? "#4B5563" : "rgba(255,255,255,0.85)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = scrolled ? "#F3F4F6" : "rgba(255,255,255,0.12)"; e.currentTarget.style.color = scrolled ? "#111" : "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = scrolled ? "#4B5563" : "rgba(255,255,255,0.85)"; }}
              >
                {l.label}
              </ScrollLink>
            ))}
          </div>

          {/* CTA */}
          <div className="desk-nav" style={{ display: "flex", gap: 8 }}>
            <a href={`${TALENT_URL}register`} target="_blank" rel="noopener noreferrer"
              className="btn btn-outline" style={{ padding: "8px 18px", fontSize: 13, background: scrolled ? undefined : "rgba(255,255,255,0.1)", border: scrolled ? undefined : "1.5px solid rgba(255,255,255,0.4)", color: scrolled ? undefined : "#fff" }}>
              Register
            </a>
            <a href={`${NGO_URL}#volunteer-cta`} target="_blank" rel="noopener noreferrer"
              className="btn btn-green" style={{ padding: "8px 18px", fontSize: 13 }}>
              Volunteer
            </a>
          </div>

          {/* Hamburger */}
          <button className="ham" onClick={() => setOpen(!open)} style={{
            width: 38, height: 38, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            background: scrolled ? "#F3F4F6" : "rgba(255,255,255,0.15)",
            border: scrolled ? "1px solid #E5E7EB" : "1px solid rgba(255,255,255,0.3)",
            color: scrolled ? "#111" : "#fff",
          }}>
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 1000 }} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0, width: 260,
                background: "#fff", borderLeft: "1px solid #E5E7EB",
                zIndex: 1001, padding: "70px 20px 28px",
                display: "flex", flexDirection: "column", gap: 4,
              }}>
              <button onClick={() => setOpen(false)} style={{
                position: "absolute", top: 14, right: 14, width: 32, height: 32,
                borderRadius: 7, background: "#F3F4F6", border: "1px solid #E5E7EB",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}><X size={14} /></button>

              <div style={{ marginBottom: 18, paddingBottom: 16, borderBottom: "1px solid #E5E7EB" }}>
                <img src="/logo.png" alt="DMS Aarohi" style={{ height: 28 }} />
              </div>

              {NAV.map(l => (
                <ScrollLink key={l.to} to={l.to} smooth duration={700} offset={-64}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: "11px 14px", borderRadius: 8, cursor: "pointer",
                    fontSize: 14, color: "#4B5563", fontFamily: "'Outfit', sans-serif", fontWeight: 500,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.color = "#111"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4B5563"; }}
                >
                  {l.label}
                </ScrollLink>
              ))}

              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                <a href={`${TALENT_URL}register`} target="_blank" rel="noopener noreferrer"
                  className="btn btn-gold" style={{ justifyContent: "center" }}>Register for Talent Hunt</a>
                <a href={`${NGO_URL}#volunteer-cta`} target="_blank" rel="noopener noreferrer"
                  className="btn btn-green" style={{ justifyContent: "center" }}>Volunteer Now</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 860px) { .ham { display: none !important; } }
        @media (max-width: 859px) { .desk-nav { display: none !important; } }
      `}</style>
    </>
  );
}

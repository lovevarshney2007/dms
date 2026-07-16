import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TALENT_URL = "https://dms-ten-gamma.vercel.app/";
const NGO_URL    = "https://dms-homepage.vercel.app/";

const SLIDES = [
  {
    img: "/images/current_event.jpg",
    caption: "Voice of Delhi NCR — Season 4",
    headline: "India's Premier\nSinging Competition",
    body: "DMS Aarohi invites singers from across Delhi NCR to audition for Season 4. Classical, Bollywood, Folk — every voice deserves a stage.",
    ctas: [
      { label: "Register Now", href: `${TALENT_URL}register`, cls: "btn-gold" },
      { label: "Know More",    href: TALENT_URL,              cls: "btn-outline" },
    ],
  },
  {
    img: "/ngo/blood-camp.jpg",
    caption: "DMS Aarohi NGO — Blood Donation",
    headline: "Every Drop\nSaves a Life",
    body: "Our voluntary blood donor network has helped hundreds of patients across Delhi NCR. Join our next camp and make a real difference.",
    ctas: [
      { label: "Volunteer Now", href: `${NGO_URL}#volunteer-cta`, cls: "btn-green" },
      { label: "Explore NGO",   href: NGO_URL,               cls: "btn-outline" },
    ],
  },
  {
    img: "/images/slide-b.jpg",
    caption: "DMS Aarohi — Live Shows & Concerts",
    headline: "Concerts That\nTouch the Soul",
    body: "From intimate classical evenings to grand stage performances — DMS Aarohi organises shows that celebrate India's rich musical heritage.",
    ctas: [
      { label: "Explore Shows",  href: `${TALENT_URL}shows`, cls: "btn-gold" },
      { label: "Register Now",   href: `${TALENT_URL}register`, cls: "btn-outline" },
    ],
  },
  {
    img: "/ngo/child-education.jpg",
    caption: "Social Initiative — Child Education",
    headline: "Educating Today,\nEmpowering Tomorrow",
    body: "Workshops, resources, and mentorship for underprivileged children across Delhi NCR — because every child deserves a bright future.",
    ctas: [
      { label: "Our Initiatives", href: NGO_URL,              cls: "btn-green" },
      { label: "Volunteer",       href: `${NGO_URL}#volunteer-cta`, cls: "btn-outline" },
    ],
  },
  {
    img: "/images/slide-d.jpg",
    caption: "Talent Hunt — Open Auditions",
    headline: "Your Voice Can\nChange Everything",
    body: "Season 4 auditions are open to all age groups. Showcase your talent on Delhi NCR's biggest singing platform and win a chance to perform at the Grand Finale.",
    ctas: [
      { label: "Audition Now",   href: `${TALENT_URL}register`, cls: "btn-gold" },
      { label: "View Seasons",   href: TALENT_URL,               cls: "btn-outline" },
    ],
  },
  {
    img: "/ngo/senior-citizen.jpg",
    caption: "Social Initiative — Elderly Care",
    headline: "Caring for Those\nWho Cared for Us",
    body: "We visit care homes, organise health camps and bring dignity and happiness to senior citizens across Delhi NCR.",
    ctas: [
      { label: "Join as Volunteer", href: `${NGO_URL}#volunteer-cta`, cls: "btn-green" },
      { label: "Know More",         href: NGO_URL,               cls: "btn-outline" },
    ],
  },
  {
    img: "/images/slide-f.jpg",
    caption: "DMS Aarohi — One Society, Two Missions",
    headline: "Music That Inspires,\nService That Transforms",
    body: "DMS Aarohi is registered as both a Musical Society and an NGO under the Govt. of Delhi — serving communities through art and compassion since 2013.",
    ctas: [
      { label: "Music Society",     href: TALENT_URL, cls: "btn-gold" },
      { label: "Social Initiative", href: NGO_URL,    cls: "btn-green" },
    ],
  },
  {
    img: "/ngo/clothes-donation.jpg",
    caption: "Social Initiative — Clothes Distribution",
    headline: "Warmth Reaches\nEvery Home",
    body: "We collect and distribute clothes, blankets and essential items to underprivileged families — especially during winter and festive seasons.",
    ctas: [
      { label: "Donate & Volunteer", href: `${NGO_URL}#volunteer-cta`, cls: "btn-green" },
      { label: "Explore NGO",        href: NGO_URL,               cls: "btn-outline" },
    ],
  },
];

export default function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [lock, setLock] = useState(false);

  const go = useCallback((dir) => {
    if (lock) return;
    setLock(true);
    setCur(i => (i + dir + SLIDES.length) % SLIDES.length);
    setTimeout(() => setLock(false), 700);
  }, [lock]);

  useEffect(() => {
    const t = setInterval(() => go(1), 5500);
    return () => clearInterval(t);
  }, [go]);

  const s = SLIDES[cur];

  return (
    <section id="home" style={{ position: "relative", height: "100svh", minHeight: 560, overflow: "hidden" }}>

      {/* BG images */}
      {SLIDES.map((sl, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${sl.img})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transition: "opacity 0.9s ease",
          opacity: i === cur ? 1 : 0,
        }} />
      ))}

      {/* Gradient overlay — dark on left so text is readable */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.1) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />

      {/* Content */}
      <div className="wrap" style={{ height: "100%", display: "flex", alignItems: "center", position: "relative", zIndex: 2 }}>
        <AnimatePresence mode="wait">
          <motion.div key={cur}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55 }}
            style={{ maxWidth: 600 }}
          >
            <div style={{
              display: "inline-block", fontSize: 11, fontWeight: 700,
              letterSpacing: "2px", textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)", marginBottom: 14,
              padding: "4px 12px", border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 100,
            }}>
              {s.caption}
            </div>

            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 900, color: "#fff",
              whiteSpace: "pre-line", lineHeight: 1.08,
              marginBottom: 18,
            }}>
              {s.headline}
            </h1>

            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, maxWidth: 480, marginBottom: 32 }}>
              {s.body}
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {s.ctas.map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                  className={`btn ${c.cls}`}
                  style={c.cls === "btn-outline" ? { borderColor: "rgba(255,255,255,0.5)", color: "#fff" } : {}}>
                  {c.label}
                </a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {[-1, 1].map((dir, i) => (
        <button key={i} onClick={() => go(dir)} style={{
          position: "absolute", top: "50%", [dir === -1 ? "left" : "right"]: 20,
          transform: "translateY(-50%)",
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10, cursor: "pointer", backdropFilter: "blur(4px)",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          {dir === -1 ? <ChevronLeft size={19}/> : <ChevronRight size={19}/>}
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} style={{
            width: i === cur ? 22 : 7, height: 7, borderRadius: 4, border: "none",
            background: i === cur ? "#fff" : "rgba(255,255,255,0.4)",
            cursor: "pointer", transition: "all 0.3s",
          }} />
        ))}
      </div>

      {/* Slide count bottom right */}
      <div style={{
        position: "absolute", bottom: 26, right: 22, zIndex: 10,
        fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "1.5px",
        fontFamily: "'Outfit', sans-serif",
      }}>
        {String(cur + 1).padStart(2,"0")} / {String(SLIDES.length).padStart(2,"0")}
      </div>
    </section>
  );
}

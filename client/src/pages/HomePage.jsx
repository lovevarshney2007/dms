import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import SectionHeading from "../components/common/SectionHeading";
import TeamSliderRow from "../components/common/TeamSliderRow";
import ContactForm from "../components/forms/ContactForm";
import {
  patronsData,
  qualifiedContestants,
  pastEvents,
  contactDetails
} from "../data/siteContent";
import ScrollReveal from "../components/common/ScrollReveal";
import TestimonialsSlider from "../components/sections/TestimonialsSlider";
import FaqSection from "../components/sections/FaqSection";
import { getDaysUntilEvent } from "../lib/eventDates";

const daysUntilFinale = getDaysUntilEvent();

// All 35 finalist images for the hero slider (Change 3)
const heroSliderImages = Array.from({ length: 35 }, (_, i) => ({
  src: `/Finalist/${i + 1}.jpg`,
  alt: `DMS Aarohi Season 4 Finalist ${i + 1}`
}));

const fallbackPatrons = [
  { name: "Ashok Srivastava", role: "Chief Patron", image: "/patrons/Ashok_Srivastava (Chief Patron).png" },
  { name: "Nalini Kamalni", role: "Patron", image: "/patrons/NALINI KAMALNI.jpg" },
  { name: "Radhika Chopra", role: "Patron", image: "/patrons/RADHIKA CHOPRA.jpg" },
  { name: "Kumar Vishu", role: "Patron", image: "/patrons/KUMAR VISHU.jpg" },
  { name: "G.B. Mathur", role: "Patron", image: "/patrons/G.B. Mathur (Patron).png" }
];
const fallbackQC = [
  { name: "Adaa", status: "Grand Finalist", city: "Delhi NCR", category: "Junior", image: "/seasons/adaa.png" },
  { name: "Arijit", status: "Grand Finalist", city: "Delhi NCR", category: "Senior", image: "/seasons/arijit.png" }
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % heroSliderImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl border-[3px] border-white w-full h-[350px] sm:h-[420px] lg:h-[500px]">
      {heroSliderImages.map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {/* Minimal dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10">
        {heroSliderImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 ${idx === current ? "bg-white w-5 h-1.5" : "bg-white/40 w-1.5 h-1.5"}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const [patrons, setPatrons] = useState(fallbackPatrons);
  const [qContestants, setQContestants] = useState(fallbackQC);

  useEffect(() => {
    Promise.all([
      fetch(import.meta.env.VITE_API_URL + '/api/content/patron').then(res => res.json()),
      fetch(import.meta.env.VITE_API_URL + '/api/content/qualified-contestant').then(res => res.json())
    ]).then(([pData, qcData]) => {
      if (pData && pData.length > 0) {
        setPatrons(pData.filter(d => !d.meta?.isTeam).map(d => ({
          name: d.title,
          role: d.subtitle,
          image: d.imageUrl
        })));
      }
      if (qcData && qcData.length > 0) {
        setQContestants(qcData.map(d => ({
          name: d.title,
          image: d.imageUrl,
          status: d.meta?.status || 'Contestant',
          city: d.meta?.city || 'Delhi NCR',
          category: d.meta?.category || 'Open'
        })));
      }
    }).catch(console.error);
  }, []);

  // Scroll to top on Link click helper - handled via window.scrollTo in onClick
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

  return (
    <PageShell basePath="/">
      {/* ===== 1. HERO SECTION ===== */}
      <section
        id="hero"
        className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden pt-10 md:pt-12"
      >
        {/* Top Marquee */}
        <div className="w-full bg-orange-600 text-white overflow-hidden py-1.5 md:py-2 absolute top-0 left-0 z-40">
          <div className="animate-marquee font-bold text-[10px] md:text-xs tracking-widest uppercase flex items-center whitespace-nowrap">
            <span>🎤 VOICE OF DELHI NCR - SEASON 4 GRAND FINALE</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>4 JULY 2026 • PEAREY LAL BHAWAN, GANDHI MEMORIAL HALL, ITO, NEW DELHI</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>⏰ 5:00 PM TO 9:30 PM • FREE ENTRY</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>🎵 LIVE PERFORMANCES BY FINALISTS &amp; CELEBRITY GUESTS</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>🎤 VOICE OF DELHI NCR - SEASON 4 GRAND FINALE</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>4 JULY 2026 • PEAREY LAL BHAWAN, GANDHI MEMORIAL HALL, ITO, NEW DELHI</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>⏰ 5:00 PM TO 9:30 PM • FREE ENTRY</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>🎵 LIVE PERFORMANCES BY FINALISTS &amp; CELEBRITY GUESTS</span>
          </div>
        </div>

        {/* Background Animation Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 -left-10 w-96 h-96 bg-orange-300/30 rounded-full blur-[100px] animate-float"></div>
          <div className="absolute bottom-20 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-[120px] animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[2px] border-orange-200/50 rounded-full animate-ring-spin"></div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-12 items-center px-4 sm:px-6 max-w-7xl mx-auto pb-8 w-full">
          {/* Left: Informative Content */}
          <div className="text-center lg:text-left mt-6 md:mt-0">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-orange-200 backdrop-blur-md mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-orange-800 uppercase">DMS Aarohi Musical Society Presents</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-stone-900 leading-[1.1] mb-2 drop-shadow-sm">
                Voice of Delhi NCR
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">- Season 4</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <p className="text-base sm:text-lg font-bold text-orange-700 mb-2">
                🏆 Grand Finale • 4 July 2026
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-base md:text-lg text-stone-700 mb-4 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
                Join us for an unforgettable evening as the finalists of Voice of Delhi NCR Season 4 take the stage to compete for the championship title. Celebrate music, talent, and extraordinary performances with us.
              </p>
            </ScrollReveal>

            {/* Season 4 Grand Finale Info Block */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="mb-5 bg-white/80 backdrop-blur-lg border-2 border-orange-200 rounded-3xl p-4 sm:p-5 max-w-xl mx-auto lg:mx-0 shadow-xl hover:shadow-2xl hover:border-orange-300 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 opacity-90 -z-10 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex items-center gap-3 mb-4 border-b border-orange-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse shadow-[0_0_8px_rgba(234,88,12,0.6)]"></span>
                  <span className="text-xs sm:text-sm font-black tracking-widest text-orange-800 uppercase">Season 4 Grand Finale</span>
                  <span className="ml-auto px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[10px] sm:text-xs font-black rounded-full uppercase tracking-widest shadow-md">FREE ENTRY</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3 text-stone-800">
                    <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    </div>
                    <span className="text-sm font-bold">4 July 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-800">
                    <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    </div>
                    <span className="text-sm font-bold">5:00 PM - 9:30 PM</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-800">
                    <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    </div>
                    <span className="text-sm font-bold leading-tight">Pearey Lal Bhawan, ITO, New Delhi</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/voice-of-delhi-ncr"
                  id="hero-free-entry-btn"
                  onClick={scrollToTop}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-base shadow-[0_8px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_12px_25px_rgba(234,88,12,0.4)] hover:-translate-y-1 text-center transition-all duration-300 border border-orange-400"
                >
                  🎟️ Free Entry
                </Link>
                <Link
                  to="/voice-of-delhi-ncr"
                  id="hero-explore-btn"
                  onClick={scrollToTop}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-stone-200 bg-white/50 text-stone-800 font-bold text-base hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 text-center transition-all duration-300"
                >
                  🎵 Explore the Journey
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Hero Image Slider */}
          <ScrollReveal direction="right" delay={0.2} className="relative w-full max-w-[320px] sm:max-w-md md:max-w-lg lg:max-w-none mx-auto mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-[1.5rem] transform rotate-3 opacity-20 blur-lg"></div>
            <HeroSlider />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 2. ABOUT DMS AAROHI SECTION ===== */}
      <section id="about" className="scroll-mt-32 max-w-7xl mx-auto px-4 md:px-6 mt-6 relative z-10">
        <ScrollReveal direction="up" className="glass-card rounded-[2.5rem] p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-orange-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/40 rounded-full blur-[80px]"></div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center relative z-10">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-600 mb-1 sm:mb-2">About DMS Aarohi Musical Society</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight mb-3 sm:mb-4">
                Celebrating Music, Nurturing Talent Since 2013
              </h2>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-3 font-medium">
                DMS Aarohi Musical Society has been promoting musical talent and celebrating Indian music since 2013. Through its flagship singing competition, <strong className="text-orange-700">Voice of Delhi NCR</strong>, the society provides aspiring singers with a professional platform to showcase their talent, perform before experienced judges, and grow as artists.
              </p>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-4 sm:mb-5">
                Along with organizing singing competitions, DMS Aarohi also hosts musical performances and cultural events, inspiring artists and audiences through the power of music.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-orange-50 rounded-lg border border-orange-100 flex flex-col flex-1 sm:flex-none">
                  <span className="text-xl sm:text-2xl font-black text-orange-600">5</span>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase">Total Seasons</span>
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-orange-50 rounded-lg border border-orange-100 flex flex-col flex-1 sm:flex-none">
                  <span className="text-xl sm:text-2xl font-black text-orange-600">100+</span>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase">Shows Organized</span>
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-orange-50 rounded-lg border border-orange-100 flex flex-col flex-1 sm:flex-none">
                  <span className="text-xl sm:text-2xl font-black text-orange-600">5,000+</span>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase">Participants</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link to="/about" onClick={scrollToTop} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-base shadow-[0_8px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_12px_25px_rgba(234,88,12,0.4)] hover:-translate-y-1 transition-all duration-300 border border-orange-400">
                  Learn More
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </div>

            <div className="relative mt-4 lg:mt-0">
              <div className="aspect-video sm:aspect-square lg:aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img
                  src="/talenthunt/91.jpg"
                  alt="DMS Aarohi Musical Society"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-3xl -z-10 rotate-6 opacity-60 blur-sm"></div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== 3. CURRENT COMPETITION SECTION ===== */}
      <section id="current-competition" className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 mt-6 mb-6">
        <ScrollReveal direction="up" className="bg-gradient-to-br from-white to-orange-50/50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative shadow-[0_20px_60px_rgba(234,88,12,0.05)] border border-orange-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-400/10 rounded-full blur-[60px]"></div>
          <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 mb-5 text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                Currently Running Event
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-stone-900 mb-6 drop-shadow-sm">Voice of Delhi NCR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Season 4 Grand Finale</span></h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-stone-700 bg-white/60 p-3 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm hover:border-orange-200 transition-colors">
                  <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  </div>
                  <span><strong className="text-stone-900">Event Date:</strong> 4 July 2026</span>
                </div>
                <div className="flex items-center gap-4 text-stone-700 bg-white/60 p-3 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm hover:border-orange-200 transition-colors">
                  <div className="p-2.5 bg-amber-100 rounded-xl text-amber-600 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <span><strong className="text-stone-900">Timing:</strong> 5:00 PM - 9:30 PM</span>
                </div>
                <div className="flex items-center gap-4 text-stone-700 bg-white/60 p-3 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm hover:border-orange-200 transition-colors">
                  <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <span><strong className="text-stone-900">Venue:</strong> Pearey Lal Bhawan (Gandhi Memorial Hall), ITO, New Delhi</span>
                </div>
                <div className="flex items-center gap-4 text-stone-700 bg-white/60 p-3 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm hover:border-orange-200 transition-colors">
                  <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
                  </div>
                  <span><strong className="text-stone-900">Entry:</strong> <span className="text-emerald-600 font-bold">FREE for All</span></span>
                </div>
              </div>

              <Link to="/voice-of-delhi-ncr" onClick={scrollToTop} className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold hover:shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:-translate-y-1 transition-all">
                🎵 Explore the Journey
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white border border-orange-100 rounded-[2rem] p-6 sm:p-8 text-center shadow-[0_10px_30px_rgba(234,88,12,0.05)] hover:border-orange-200 transition-colors">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-2">{daysUntilFinale}</div>
                <div className="text-[10px] sm:text-xs text-stone-500 font-bold uppercase tracking-widest">{daysUntilFinale === 0 ? "Event Day" : "Days Left"}</div>
              </div>
              <div className="bg-white border border-orange-100 rounded-[2rem] p-6 sm:p-8 text-center shadow-[0_10px_30px_rgba(234,88,12,0.05)] hover:border-orange-200 transition-colors">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-2">500+</div>
                <div className="text-[10px] sm:text-xs text-stone-500 font-bold uppercase tracking-widest">Participants</div>
              </div>
              <div className="col-span-2 bg-stone-900 rounded-[2rem] overflow-hidden h-56 sm:h-72 shadow-xl">
                <img src="/legacy/show.png" className="w-full h-full object-cover" alt="Event Highlights" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== 4. STARS OF DMS AAROHI + QUALIFIED CONTESTANTS + MUSICAL SHOWS ===== */}
      <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 max-w-7xl mx-auto px-4 md:px-6 mb-6">
        {/* Left: Stars of DMS Aarohi + Musical Shows */}
        <ScrollReveal direction="up" className="space-y-6">
          {/* Stars of DMS Aarohi */}
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-600 mb-1">Our Artists</p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900">Stars of DMS Aarohi</h2>
              </div>
              <Link to="/success-stories" onClick={scrollToTop} className="text-xs sm:text-sm font-bold text-stone-500 hover:text-orange-600 transition flex items-center gap-1">
                View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="group glass-card rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-[0_10px_30px_rgba(234,88,12,0.15)] transition-all duration-300 border border-stone-200">
              <div className="relative h-56 sm:h-72 overflow-hidden">
                <img
                  src="/seasons/stars of dms aarohi.jfif.jpeg"
                  alt="Stars of DMS Aarohi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              <div className="p-5 sm:p-6 bg-white">
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  Celebrating the talented artists who have been part of our musical journey and continue to inspire audiences through their passion and performances.
                </p>
              </div>
            </div>
          </div>

          {/* Musical Shows */}
          <div>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">Musical Shows</h2>
              <Link to="/shows" onClick={scrollToTop} className="text-xs sm:text-sm font-bold text-stone-500 hover:text-orange-600 transition flex items-center gap-1">
                View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {pastEvents.map(event => (
                <Link key={event.id} to="/shows" onClick={scrollToTop} className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square border border-stone-200 shadow-sm">
                  <img src={event.image} alt={event.title} className="w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3 sm:p-4">
                    <p className="text-white font-bold text-xs sm:text-sm leading-tight">{event.title}</p>
                    <p className="text-white/70 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{event.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Qualified Contestants */}
        <ScrollReveal direction="up" delay={0.2} id="leaderboard" className="scroll-mt-32 glass-card rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 h-fit border-orange-100 shadow-[0_15px_40px_rgba(255,132,0,0.08)] bg-white/80">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 sm:p-3 bg-amber-100 text-amber-600 rounded-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-stone-500">Season 4</p>
              <h2 className="font-serif text-xl sm:text-2xl text-stone-900">Qualified Contestants</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {qualifiedContestants.slice(0, 6).map((user, idx) => (
              <Link key={idx} to="/success-stories" onClick={scrollToTop} className="flex flex-col items-center text-center p-3 bg-white hover:bg-orange-50 rounded-xl sm:rounded-2xl border border-stone-100 hover:border-orange-200 shadow-sm hover:shadow-md transition-all group">
                <img src={user.image} alt={user.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-sm mb-2 mx-auto" />
                <h4 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-orange-600 transition-colors leading-tight">{user.name}</h4>
                <p className="text-[9px] sm:text-[10px] text-emerald-600 font-bold mt-0.5">{user.status}</p>
              </Link>
            ))}
          </div>

          <Link to="/success-stories" onClick={scrollToTop} className="block w-full text-center py-3.5 rounded-xl border-2 border-orange-200 bg-orange-50 text-orange-700 font-bold hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all duration-300 text-sm sm:text-base shadow-sm">
            View All Contestants
          </Link>
        </ScrollReveal>
      </section>

      {/* ===== 5. TESTIMONIALS ===== */}
      <section id="testimonials" className="scroll-mt-24 max-w-7xl mx-auto px-4 md:px-6 mb-6">
        <TestimonialsSlider />
      </section>

      {/* ===== 6. BRAND AMBASSADOR ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-4">
        <div className="inline-flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-300"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 px-4 py-2 rounded-full bg-orange-50 border border-orange-100">
            🎤 Meet Our Brand Ambassador
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-300"></div>
        </div>
      </div>

      <section id="ambassador" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <ScrollReveal direction="up" className="group bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/50 rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(234,88,12,0.12)] flex flex-col md:flex-row items-center border-2 border-orange-200 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="w-full md:w-2/5 h-80 md:h-[500px] relative overflow-hidden">
            <img
              src="/team/Peehu Srivastava (Brand Ambassador).png"
              alt="Peehu Srivastava"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-orange-50"></div>
          </div>

          <div className="p-8 md:p-12 lg:p-16 w-full md:w-3/5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-orange-700 border border-orange-200 mb-6 text-xs font-black uppercase tracking-widest shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
              Official Brand Ambassador
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-4 drop-shadow-sm font-black">
              Peehu Srivastava
            </h3>

            <p className="text-stone-700 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 mb-8 font-medium">
              From winning the very first season of <strong className="text-orange-600">Voice of Delhi NCR</strong> to becoming a national television sensation. Peehu proudly represents DMS Aarohi, inspiring thousands of young singers across India to step onto the grand stage and pursue their musical dreams.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto md:mx-0">
              <div className="bg-white backdrop-blur border border-stone-100 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-orange-300 transition-all group/card">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform shadow-inner">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h10" /><path d="M9 4v16" /><path d="m3 9 3 3-3 3" /></svg>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1.5">Indian Idol Jr.</h4>
                <p className="text-xs text-stone-500 font-medium">Mega Finalist (Sony TV)</p>
              </div>
              <div className="bg-white backdrop-blur border border-stone-100 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-amber-300 transition-all group/card">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform shadow-inner">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1.5">Rising Star</h4>
                <p className="text-xs text-stone-500 font-medium">Contestant (Colors TV)</p>
              </div>
              <div className="bg-white backdrop-blur border border-stone-100 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-300 transition-all group/card">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform shadow-inner">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1.5">Our Champion</h4>
                <p className="text-xs text-stone-500 font-medium">Winner of Season 1</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== 7. JURY / PATRONS ===== */}
      <section id="jury" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <SectionHeading
          eyebrow="Expert Panel &amp; Patrons"
          title="Meet Our Esteemed Patrons."
          text="Learn from the best in the industry. Our patrons and judges bring decades of musical experience."
        />
        <TeamSliderRow members={patronsData} />
      </section>

      {/* ===== FAQ SECTION ===== */}
      <ScrollReveal direction="up" className="mb-6">
        <FaqSection />
      </ScrollReveal>


      {/* ===== 8. SPONSORS SECTION ===== */}
      <section id="sponsors" className="scroll-mt-24 max-w-7xl mx-auto px-4 md:px-6 mb-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-8">
            <SectionHeading
              eyebrow="Our Sponsors"
              title="Powered By Great Partners"
              text="We thank our sponsors for making the Voice of Delhi NCR competition a grand success year after year."
            />
          </div>

          <div className="w-full mb-8 flex justify-center">
            <img
              src="Finalist/musical supports.jpg"
              alt="Our Esteemed Sponsors"
              className="w-full max-w-2xl h-auto rounded-[2rem] shadow-lg border border-stone-100"
            />
          </div>

          <div className="text-center max-w-2xl mx-auto bg-orange-50 rounded-[2rem] p-8 sm:p-10 border border-orange-100 shadow-sm">
            <p className="text-stone-600 text-sm sm:text-base mb-6 font-medium leading-relaxed">Interested in sponsoring and supporting the next generation of Indian classical and light music talent?</p>
            <Link
              to="/become-a-sponsor"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-base shadow-[0_8px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_12px_25px_rgba(234,88,12,0.4)] hover:-translate-y-1 transition-all duration-300 border border-orange-400"
            >
              Become a Sponsor
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== 9. CONTACT SECTION ===== */}
      <ScrollReveal direction="up"
        id="contact"
        className="scroll-mt-32 rounded-3xl sm:rounded-[2.5rem] glass-card border-orange-100 shadow-xl p-5 sm:p-10 lg:p-14 bg-white/60 max-w-7xl mx-4 md:mx-6 xl:mx-auto mb-6"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="text-center sm:text-left">
            <SectionHeading
              eyebrow="Get In Touch"
              title="Have questions about the event?"
              text="Reach out to our team for any queries regarding the Grand Finale, venue, or other information."
            />

            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6 max-w-sm mx-auto sm:mx-0">
              {contactDetails.map(([label, value], idx) => (
                <div key={idx} className="flex items-center gap-3 sm:gap-4 text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-inner">
                    {label === "Email" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    ) : label === "Phone" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-400">{label}</p>
                    <p className="font-semibold text-stone-900 text-sm sm:text-base">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-stone-100">
            <ContactForm
              source="main-homepage"
              eyebrow="Quick Enquiry"
              title="Send us a message"
              submitLabel="Submit Enquiry"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* ===== 10. FINAL CTA ===== */}
      <ScrollReveal direction="up" className="mb-6 rounded-3xl sm:rounded-[2.5rem] bg-stone-900 text-white p-8 sm:p-14 text-center relative overflow-hidden max-w-7xl mx-4 md:mx-6 xl:mx-auto">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-10 -left-10 sm:-top-20 sm:-left-20 w-40 h-40 sm:w-64 sm:h-64 bg-orange-500 rounded-full blur-[60px] sm:blur-[100px]"></div>
          <div className="absolute -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 w-40 h-40 sm:w-64 sm:h-64 bg-amber-500 rounded-full blur-[60px] sm:blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Join Us for the Grand Finale!</h2>
          <p className="text-sm sm:text-lg text-stone-300 mb-8 sm:mb-10 px-2 sm:px-0">
            Experience the magic of Voice of Delhi NCR Season 4 - 4th July 2026, Pearey Lal Bhawan, ITO, New Delhi. <strong className="text-orange-400">Entry is absolutely FREE!</strong>
          </p>
          <Link to="/voice-of-delhi-ncr" onClick={scrollToTop} className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-base sm:text-lg shadow-[0_8px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_12px_25px_rgba(234,88,12,0.4)] hover:-translate-y-1 transition-all duration-300 border border-orange-400">
            🎟️ Free Entry - Explore Now
          </Link>
        </div>
      </ScrollReveal>

    </PageShell>
  );
}

export default HomePage;
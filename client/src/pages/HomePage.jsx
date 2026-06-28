import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import SectionHeading from "../components/common/SectionHeading";
import TeamSliderRow from "../components/common/TeamSliderRow";
import ContactForm from "../components/forms/ContactForm";
import { 
  patronsData,
  teamData, 
  qualifiedContestants, 
  upcomingEvents, 
  pastEvents,
  contactDetails,
  successStories
} from "../data/siteContent";
import ScrollReveal from "../components/common/ScrollReveal";
import FaqSection from "../components/sections/FaqSection";
import TestimonialsSlider from "../components/sections/TestimonialsSlider";

const steps = [
  {
    num: "1",
    title: "Registration",
    desc: "Create your profile on our platform and share your basic details to get started.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  {
    num: "2",
    title: "Profiling",
    desc: "Complete your musical profile and tell us about your singing style and experience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  {
    num: "3",
    title: "Upload & Audition",
    desc: "Upload your best singing video for the first round of digital auditions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    )
  }
];

function HomePage() {
  return (
    <PageShell basePath="/">
      {/* 1. Enhanced Hero Section */}
      <section
        id="hero"
        className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden pt-12 md:pt-16"
      >
        {/* Top Marquee */}
        <div className="w-full bg-orange-600 text-white overflow-hidden py-1.5 md:py-2 absolute top-0 left-0 z-40">
          <div className="animate-marquee font-bold text-[10px] md:text-xs tracking-widest uppercase flex items-center whitespace-nowrap">
            <span>🎤 VOICE OF DELHI NCR — SEASON 4 GRAND FINALE</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>4 JULY 2026 • PEAREY LAL BHAWAN, ITO, NEW DELHI</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>🎵 FREE ENTRY FOR ALL MUSIC LOVERS</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>LIVE PERFORMANCES BY FINALISTS & CELEBRITY GUESTS</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>🎤 VOICE OF DELHI NCR — SEASON 4 GRAND FINALE</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>4 JULY 2026 • PEAREY LAL BHAWAN, ITO, NEW DELHI</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>🎵 FREE ENTRY FOR ALL MUSIC LOVERS</span>
            <span className="mx-3 md:mx-4">•</span>
            <span>LIVE PERFORMANCES BY FINALISTS & CELEBRITY GUESTS</span>
          </div>
        </div>

        {/* Background Animation Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
          <div className="absolute top-10 -left-10 w-96 h-96 bg-orange-300/30 rounded-full blur-[100px] animate-float"></div>
          <div className="absolute bottom-20 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-[120px] animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[2px] border-orange-200/50 rounded-full animate-ring-spin"></div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-12 items-center px-4 sm:px-6 max-w-7xl mx-auto pb-8">
          {/* Left: Informative Content */}
          <ScrollReveal direction="left" className="text-center lg:text-left mt-6 md:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-orange-200 backdrop-blur-md mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-orange-800 uppercase">Delhi's Premier Singing Talent Hunt</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-serif text-stone-900 leading-[1.1] mb-4 drop-shadow-sm">
              Your Voice. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Our Grand Stage.</span>
            </h1>

            <p className="text-base md:text-lg text-stone-700 mb-6 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
              Don't let your talent go unheard. DMS Aarohi brings you the ultimate singing talent hunt. Perform in front of celebrity judges, earn recognition, and launch your musical career.
            </p>

            {/* Key Highlights / Why Participate */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600 shrink-0 shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-[15px] mb-0.5">Trophies & Honours</h4>
                  <p className="text-[13px] text-stone-500 font-medium">Certificates & recognition</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-600 shrink-0 shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><path d="m9 9 12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-[15px] mb-0.5">Live Concerts</h4>
                  <p className="text-[13px] text-stone-500 font-medium">Perform in stadiums</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600 shrink-0 shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-[15px] mb-0.5">Mentorship</h4>
                  <p className="text-[13px] text-stone-500 font-medium">Learn from top singers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600 shrink-0 shadow-sm">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-[15px] mb-0.5">Media Coverage</h4>
                  <p className="text-[13px] text-stone-500 font-medium">Get featured on TV</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-base shadow-[0_8px_15px_rgba(234,88,12,0.2)] hover:-translate-y-1 text-center"
              >
                Register Now
              </Link>
              <div className="flex items-center gap-2 text-[13px] font-bold text-stone-500 justify-center">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="/legacy/pa.jpg" alt="participant" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="/legacy/pp.jpg" alt="participant" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-[9px] font-black text-stone-600 shadow-sm">+5k</div>
                </div>
                Already <br/> Registered
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Visual Interactive Banner */}
          <ScrollReveal direction="right" delay={0.2} className="relative w-full max-w-[320px] sm:max-w-md md:max-w-lg lg:max-w-none mx-auto mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-[1.5rem] transform rotate-3 opacity-20 blur-lg"></div>
            <a 
              href="https://www.youtube.com/live/r2VYf94YPNU?si=JObK4t3qQ_0VOrxE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative rounded-[1.5rem] overflow-hidden shadow-2xl border-[3px] border-white group cursor-pointer w-full h-[350px] sm:h-[400px] lg:h-[500px] mx-auto block"
            >
              <img 
                src="https://images.stockcake.com/public/a/9/a/a9a4c56e-55a2-45fd-827a-f7f5fa8bf8f0_large/energetic-crowd-vibe-stockcake.jpg" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Singer on Grand Stage"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center hover:bg-white/50 transition duration-300 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 sm:w-6 sm:h-6"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg sm:text-xl font-black mb-1">Voice of Delhi NCR</h3>
                <p className="text-[10px] sm:text-xs text-white/80 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Watch the highlights
                </p>
              </div>

              <div className="absolute -left-2 top-6 sm:top-8 lg:-left-6 lg:top-12 glass-card px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 animate-float border border-white/40 z-10 scale-90 lg:scale-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] text-stone-500 uppercase font-black tracking-wider">Grand Finale</p>
                  <p className="text-sm sm:text-base font-black text-stone-900 leading-none mt-0.5">July 4, 2026</p>
                </div>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. About Event Section */}
      <section id="about" className="scroll-mt-32 max-w-7xl mx-auto px-4 md:px-6 -mt-4 sm:-mt-8 lg:-mt-16 relative z-10">
        <ScrollReveal direction="up" className="glass-card rounded-[2.5rem] p-6 sm:p-8 lg:p-14 relative overflow-hidden border border-orange-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/40 rounded-full blur-[80px]"></div>
          
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center relative z-10">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-600 mb-2 sm:mb-3">About The Competition</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight mb-4 sm:mb-6">
                Discovering India's Next Big Voice
              </h2>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-4 sm:mb-6 font-medium">
                DMS Aarohi is more than just a talent hunt; it is a meticulously structured pathway designed to discover, nurture, and elevate raw singing talent from across the nation.
              </p>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6 sm:mb-8">
                With highly transparent online digital auditions, rigorous constituency-level live battles, and a spectacular grand finale, we ensure every deserving participant gets a fair chance to shine under the spotlight.
              </p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-orange-50 rounded-lg border border-orange-100 flex flex-col flex-1 sm:flex-none">
                  <span className="text-xl sm:text-2xl font-black text-orange-600">4+</span>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase">Successful Seasons</span>
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-orange-50 rounded-lg border border-orange-100 flex flex-col flex-1 sm:flex-none">
                  <span className="text-xl sm:text-2xl font-black text-orange-600">50K+</span>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase">Total Auditions</span>
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-2 bg-orange-50 rounded-lg border border-orange-100 flex flex-col flex-1 sm:flex-none">
                  <span className="text-xl sm:text-2xl font-black text-orange-600">100+</span>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase">Live Shows</span>
                </div>
              </div>

              <Link to="/register" className="inline-flex items-center justify-center w-full sm:w-auto gap-2 text-white bg-stone-900 px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-md text-sm sm:text-base">
                Read More 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
            
            <div className="relative mt-4 lg:mt-0">
              <div className="aspect-video sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img 
                  src="https://images.stockcake.com/public/6/8/f/68f72f62-5672-4755-9821-223596df9fb0_large/singer-under-spotlights-stockcake.jpg" 
                  alt="Singer performing on stage" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-3xl -z-10 rotate-6 opacity-60 blur-sm"></div>
            </div>
          </div>
        </ScrollReveal>
      </section>



      {/* 3. Current Competition */}
      <section id="current-competition" className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 mt-4 lg:mt-6 mb-4 lg:mb-6">
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
              
              <div className="space-y-5 mb-10">
                <div className="flex items-center gap-4 text-stone-700 bg-white/60 p-3 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm hover:border-orange-200 transition-colors">
                  <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <span><strong className="text-stone-900">Event Date:</strong> 4 July 2026</span>
                </div>
                <div className="flex items-center gap-4 text-stone-700 bg-white/60 p-3 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm hover:border-orange-200 transition-colors">
                  <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <span><strong className="text-stone-900">Venue:</strong> Pearey Lal Bhawan, ITO, New Delhi</span>
                </div>
                <div className="flex items-center gap-4 text-stone-700 bg-white/60 p-3 rounded-2xl border border-white/40 shadow-sm backdrop-blur-sm hover:border-orange-200 transition-colors">
                  <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <span><strong className="text-stone-900">Registration Status:</strong> <span className="text-emerald-600 font-bold">Open</span></span>
                </div>
              </div>

              <Link to="/register" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold hover:shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:-translate-y-1 transition-all">
                Register Now
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white border border-orange-100 rounded-[2rem] p-6 sm:p-8 text-center shadow-[0_10px_30px_rgba(234,88,12,0.05)] hover:border-orange-200 transition-colors">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-2">25</div>
                <div className="text-[10px] sm:text-xs text-stone-500 font-bold uppercase tracking-widest">Days Left</div>
              </div>
              <div className="bg-white border border-orange-100 rounded-[2rem] p-6 sm:p-8 text-center shadow-[0_10px_30px_rgba(234,88,12,0.05)] hover:border-orange-200 transition-colors">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-2">500+</div>
                <div className="text-[10px] sm:text-xs text-stone-500 font-bold uppercase tracking-widest">Registrations</div>
              </div>
              <div className="col-span-2 bg-stone-900 rounded-[2rem] p-6 relative overflow-hidden group h-40 sm:h-48 shadow-xl">
                <img src="/legacy/show.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" alt="Event Highlights" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-sm border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">View Event Highlights</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Events & Leaderboard Split */}
      <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 max-w-7xl mx-auto px-4 md:px-6">
        {/* Left: Events */}
        <ScrollReveal direction="up" className="space-y-10 sm:space-y-12">
          {/* Upcoming Events */}
          <div>
            <div className="flex items-end justify-between mb-6 sm:mb-8">
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-600 mb-1 sm:mb-2">Upcoming</p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900">Music Events</h2>
              </div>
              <Link to="/music/events" className="text-xs sm:text-sm font-bold text-stone-500 hover:text-orange-600 transition flex items-center gap-1">
                View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
            
            <div className="grid gap-4 sm:gap-6">
              {upcomingEvents.map(event => (
                <Link key={event.id} to="/music/events" className="group glass-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col sm:flex-row hover:shadow-[0_10px_30px_rgba(234,88,12,0.15)] transition-all duration-300 border border-stone-200">
                  <div className="sm:w-2/5 aspect-video relative overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold text-orange-700 shadow-sm">
                      Upcoming
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 sm:w-3/5 flex flex-col justify-center">
                    <p className="text-orange-600 font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2">{event.date}</p>
                    <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors leading-tight">{event.title}</h3>
                    <p className="text-stone-500 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-stone-600 text-xs sm:text-sm mt-auto font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Past Events Highlights */}
          <div>
            <div className="flex items-end justify-between mb-6 sm:mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">Past Events</h2>
              <Link to="/music/shows" className="text-xs sm:text-sm font-bold text-stone-500 hover:text-orange-600 transition flex items-center gap-1">
                View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {pastEvents.map(event => (
                <Link key={event.id} to="/music/shows" className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square border border-stone-200 shadow-sm">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3 sm:p-4">
                    <p className="text-white font-bold text-xs sm:text-sm leading-tight">{event.title}</p>
                    <p className="text-white/70 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{event.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Leaderboard */}
        <ScrollReveal direction="up" delay={0.2} id="leaderboard" className="scroll-mt-32 glass-card rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 h-fit border-orange-100 shadow-[0_15px_40px_rgba(255,132,0,0.08)] bg-white/80 mt-6 lg:mt-0">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="p-2 sm:p-3 bg-amber-100 text-amber-600 rounded-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-stone-500">Results</p>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">Qualified Contestants</h2>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {qualifiedContestants.map((user, idx) => (
              <Link key={idx} to="/music/talents" className="flex items-center justify-between p-3 sm:p-4 bg-white/80 hover:bg-white rounded-xl sm:rounded-2xl border border-stone-100 hover:border-orange-200 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${idx === 0 ? 'bg-amber-100 text-amber-700 shadow-inner' : idx === 1 ? 'bg-stone-200 text-stone-700 shadow-inner' : idx === 2 ? 'bg-orange-100 text-orange-800 shadow-inner' : 'bg-stone-50 text-stone-400 border border-stone-100'}`}>
                    #{idx + 1}
                  </div>
                  <img src={user.image} alt={user.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-orange-600 transition-colors">{user.name}</h4>
                    <p className="text-[10px] sm:text-xs text-stone-500 font-medium">{user.city}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xs sm:text-sm text-emerald-600">{user.status}</div>
                  <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-stone-400 font-bold">Status</div>
                </div>
              </Link>
            ))}
          </div>
          
          <Link to="/music/talents" className="block w-full text-center mt-5 sm:mt-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-orange-50 text-orange-700 font-bold hover:bg-orange-100 transition-colors text-sm sm:text-base">
            View Full Rankings
          </Link>
        </ScrollReveal>
      </section>

      {/* 5. Success Stories */}
      <section id="success-stories" className="scroll-mt-24 max-w-7xl mx-auto px-4 md:px-6 my-6 lg:my-10">
        <div className="text-center mb-10">
          <SectionHeading
            eyebrow="Hall of Fame"
            title="Success Stories"
            text="Meet our past winners who are now making waves in the music industry."
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {successStories.map((story, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.1} className="group rounded-[2rem] bg-white border border-stone-100 p-6 sm:p-8 shadow-md hover:shadow-xl hover:border-orange-200 transition-all duration-300">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-orange-50 mx-auto group-hover:border-orange-100 transition-colors">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-center font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-1">{story.name}</h3>
              <p className="text-center text-xs sm:text-sm font-bold text-orange-600 uppercase tracking-widest mb-4">{story.achievement}</p>
              <p className="text-center text-stone-600 leading-relaxed text-sm">{story.description}</p>
            </ScrollReveal>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="mt-16 sm:mt-24">
          <TestimonialsSlider />
        </div>
      </section>

      {/* 6. Team/Jury Section */}
      {/* 5. Brand Ambassador Section */}
      <section id="ambassador" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <ScrollReveal direction="up" className="group bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(234,88,12,0.08)] flex flex-col md:flex-row items-center border border-orange-100 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="w-full md:w-2/5 h-80 md:h-[450px] relative overflow-hidden">
            <img 
              src="/team/Peehu Srivastava (Brand Ambassador).png" 
              alt="Peehu Srivastava" 
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-50 md:bg-gradient-to-r md:from-transparent md:to-orange-50"></div>
          </div>
          
          <div className="p-8 md:p-12 lg:p-16 w-full md:w-3/5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 mb-6 text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Brand Ambassador
            </div>
            
            <h3 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4 drop-shadow-sm">Peehu Srivastava</h3>
            
            <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0 mb-8 font-medium">
              Proudly representing the Voice of Delhi NCR talent hunt across the nation. Peehu inspires thousands of young singers to step onto the grand stage and pursue their musical dreams with DMS Aarohi.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto md:mx-0">
              <div className="bg-white/80 backdrop-blur border border-white p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all group/card">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3 group-hover/card:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m3 9 3 3-3 3"/></svg>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">Reality TV Star</h4>
                <p className="text-xs text-stone-500 font-medium">Rising Star (Colors TV) & The Voice India Kids (&TV)</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur border border-white p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all group/card">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3 group-hover/card:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">Our Proud Winner</h4>
                <p className="text-xs text-stone-500 font-medium">Winner of Voice of Delhi-NCR Competition</p>
              </div>
            </div>
            
          </div>
        </ScrollReveal>
      </section>

      {/* Meet The Jury Section */}
      <section id="jury" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 md:mt-2 mb-2 md:mb-4">
        <SectionHeading
          eyebrow="Expert Panel & Patrons"
          title="Meet Our Esteemed Patrons."
          text="Learn from the best in the industry. Our patrons and judges bring decades of musical experience."
        />
        <TeamSliderRow members={patronsData} />
      </section>

      {/* FAQ Section */}
      <ScrollReveal direction="up" className="mt-2 sm:mt-4 mb-4">
        <FaqSection />
      </ScrollReveal>

      {/* Sponsors Section */}
      <section id="sponsors" className="scroll-mt-24 max-w-7xl mx-auto px-4 md:px-6 my-10 lg:my-16">
        <ScrollReveal direction="up">
          <div className="text-center mb-10">
            <SectionHeading
              eyebrow="Our Sponsors"
              title="Powered By Great Partners"
              text="We thank our sponsors for making the Voice of Delhi NCR competition a grand success year after year."
            />
          </div>

          {/* Sponsor Image */}
          <div className="w-full mb-12">
            <img 
              src="/images/sponsor.jpg" 
              alt="Our Esteemed Sponsors" 
              className="w-full h-auto object-cover rounded-[2rem] shadow-lg border border-stone-100" 
            />
          </div>

          {/* Become a Sponsor CTA */}
          <div className="text-center max-w-2xl mx-auto bg-orange-50 rounded-[2rem] p-8 sm:p-10 border border-orange-100 shadow-sm">
            <p className="text-stone-600 text-sm sm:text-base mb-6 font-medium leading-relaxed">Interested in sponsoring and supporting the next generation of Indian classical and light music talent?</p>
            <a
              href="mailto:dmsaarohi@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-orange-600 text-white font-bold shadow-md hover:bg-orange-700 hover:scale-105 transition-all duration-300 text-sm"
            >
              Become a Sponsor
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. Contact Section */}
      <ScrollReveal direction="up"
        id="contact"
        className="scroll-mt-32 rounded-3xl sm:rounded-[2.5rem] glass-card border-orange-100 shadow-xl p-5 sm:p-10 lg:p-14 bg-white/60 max-w-7xl mx-4 md:mx-6 xl:mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="text-center sm:text-left">
            <SectionHeading
              eyebrow="Get In Touch"
              title="Have questions about the auditions?"
              text="Reach out to our support team for any queries regarding registration, audition venues, or guidelines."
            />
            
            <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6 max-w-sm mx-auto sm:mx-0">
              {contactDetails.map(([label, value], idx) => (
                <div key={idx} className="flex items-center gap-3 sm:gap-4 text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-inner">
                    {label === "Email" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    ) : label === "Phone" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-400">{label}</p>
                    <p className="font-semibold text-stone-900 text-sm sm:text-lg">{value}</p>
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

      {/* 7. Final CTA */}
      <ScrollReveal direction="up" className="mb-6 rounded-3xl sm:rounded-[2.5rem] bg-stone-900 text-white p-8 sm:p-14 text-center relative overflow-hidden max-w-7xl mx-4 md:mx-6 xl:mx-auto">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-10 -left-10 sm:-top-20 sm:-left-20 w-40 h-40 sm:w-64 sm:h-64 bg-orange-500 rounded-full blur-[60px] sm:blur-[100px]"></div>
          <div className="absolute -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 w-40 h-40 sm:w-64 sm:h-64 bg-amber-500 rounded-full blur-[60px] sm:blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Ready to take the stage?</h2>
          <p className="text-sm sm:text-lg text-stone-300 mb-8 sm:mb-10 px-2 sm:px-0">
            Join hundreds of talented singers across Delhi. Registrations for Season 5 are now open for a limited time.
          </p>
          <Link to="/register" className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base sm:text-lg hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(249,115,22,0.4)]">
            Register Now
          </Link>
        </div>
      </ScrollReveal>

    </PageShell>
  );
}

export default HomePage;
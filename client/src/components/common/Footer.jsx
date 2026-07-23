import { Link } from "react-router-dom";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

function Footer() {
  return (
    <footer className="relative bg-stone-950 text-stone-300 pt-10 pb-4 px-6 mt-6 border-t border-stone-800 rounded-t-[2.5rem] sm:rounded-t-[3rem] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
      
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-orange-600/10 blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          
          {/* Column 1: Brand Info */}
          <div>
            <a href="https://dms-pqry.vercel.app" className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] shrink-0">
                <img
                  className="w-full h-full object-contain"
                  src="/legacy/tal_logo1.png"
                  alt="DMS Aarohi Logo"
                />
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-white leading-tight tracking-wide">DMS Aarohi</p>
                <p className="text-[11px] font-semibold text-orange-400 uppercase tracking-widest">Musical Society</p>
              </div>
            </a>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm font-medium mb-5">
              Celebrating music, nurturing talent since 2013. DMS Aarohi Musical Society is dedicated to discovering and elevating the finest voices across Delhi-NCR through the flagship competition - Voice of Delhi NCR.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a href="https://www.facebook.com/dms.aarohi" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com/dmsaarohi" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-stone-700 hover:text-white hover:border-stone-500 transition-all duration-300" aria-label="X (Twitter)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><a href="https://dms-pqry.vercel.app" className="text-stone-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="text-stone-600 group-hover:text-orange-500 transition-colors">›</span> Home</a></li>
              <li><Link to="/about" onClick={scrollToTop} className="text-stone-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="text-stone-600 group-hover:text-orange-500 transition-colors">›</span> About</Link></li>
              <li><Link to="/voice-of-delhi-ncr" onClick={scrollToTop} className="text-stone-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="text-stone-600 group-hover:text-orange-500 transition-colors">›</span> Voice of Delhi NCR</Link></li>
              <li><Link to="/shows" onClick={scrollToTop} className="text-stone-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="text-stone-600 group-hover:text-orange-500 transition-colors">›</span> Musical Shows</Link></li>
              <li><Link to="/gallery" onClick={scrollToTop} className="text-stone-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="text-stone-600 group-hover:text-orange-500 transition-colors">›</span> Gallery</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="text-stone-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="text-stone-600 group-hover:text-orange-500 transition-colors">›</span> Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Contact Us
            </h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 mt-0.5 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-stone-300 leading-snug">A5, 272, Paschim Vihar,<br/>New Delhi - 110063</span>
              </li>
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+919810225442" className="text-stone-300 hover:text-orange-400 transition-colors">+91-9810225442</a>
              </li>
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:dmsaarohi@gmail.com" className="text-stone-300 hover:text-orange-400 transition-colors">dmsaarohi@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-stone-800/60 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-semibold text-stone-500">
          <p className="text-stone-400">© 2026 DMS Aarohi Musical Society. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" onClick={scrollToTop} className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <span className="text-stone-700">|</span>
            <Link to="/terms" onClick={scrollToTop} className="hover:text-stone-300 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
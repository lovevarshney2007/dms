import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-stone-950 text-stone-300 pt-8 pb-4 px-6 mt-10 border-t border-stone-800 rounded-t-[2.5rem] sm:rounded-t-[3rem] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
      
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-orange-600/10 blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* CHANGED: gap-12 ko gap-8 kiya, aur mb-16 ko mb-8 kiya taaki spacing kam ho */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2">
            {/* CHANGED: mb-6 ko mb-4 kiya */}
            <Link to="/" className="flex items-center gap-3 mb-4 inline-flex">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <img
                  className="w-full h-full object-contain"
                  src="/legacy/tal_logo1.png"
                  alt="DMS Aarohi Logo"
                />
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-white leading-tight tracking-wide">DMS Aarohi</p>
                <p className="text-[10px] font-medium text-orange-400 uppercase tracking-widest">Singing Talent Hunt</p>
              </div>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Where raw talent meets the grand stage. We are dedicated to discovering, nurturing, and elevating the finest voices across Delhi-NCR.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            {/* CHANGED: mb-6 ko mb-4 kiya */}
            <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> Event Links
            </h4>
            {/* CHANGED: space-y-3 ko space-y-2 kiya list items paas laane ke liye */}
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/about" className="hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="text-stone-700 group-hover:text-orange-500 transition-colors">›</span> About DMS Aarohi</Link></li>
              <li><Link to="/register" className="hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="text-stone-700 group-hover:text-orange-500 transition-colors">›</span> How to Participate</Link></li>
              <li><Link to="/success-stories" className="hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="text-stone-700 group-hover:text-orange-500 transition-colors">›</span> Qualified Contestants</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="text-stone-700 group-hover:text-orange-500 transition-colors">›</span> Meet the Team</Link></li>
              <li><Link to="/register" className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2 group font-bold"><span className="text-orange-500 transition-colors">›</span> Register Now</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            {/* CHANGED: mb-6 ko mb-4 kiya */}
            <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Contact Us
            </h4>
            {/* CHANGED: space-y-4 ko space-y-3 kiya */}
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-stone-300">A5, 272, Paschim Vihar,<br/>New Delhi - 110063</span>
              </li>
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:dmsaarohi@gmail.com" className="hover:text-orange-400 transition-colors">dmsaarohi@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+919810225442" className="hover:text-orange-400 transition-colors">+91-9810225442</a>
              </li>
            </ul>

            {/* Social Icons */}
            {/* CHANGED: mt-6 ko mt-4 kiya, icons ka size 10 se 8 kar diya */}
            <div className="flex items-center gap-2 mt-4">
              <a href="https://www.facebook.com/dms.aarohi" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com/dmsaarohi" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-stone-700 hover:text-white hover:border-stone-500 transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/dms-aarohi-45408273/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-blue-700 hover:text-white hover:border-blue-600 transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        {/* CHANGED: pt-8 ko pt-4 kiya */}
        <div className="border-t border-stone-800/60 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-medium text-stone-500">
          <p>© {new Date().getFullYear()} DMS Aarohi. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
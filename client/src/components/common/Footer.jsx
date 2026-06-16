import { useLocation } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isMusic = location.pathname.startsWith("/music-society") || location.pathname.startsWith("/music");
  const isNgo = location.pathname.startsWith("/ngo");

  return (
    <footer className="relative mx-auto mt-12 w-full max-w-7xl overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-stone-950 via-[#0c1216] to-[#0f1c16] px-6 py-8 text-white shadow-lg md:px-8">
      <div className="pointer-events-none absolute inset-0">
        <span className={`absolute -left-16 -top-16 h-40 w-40 rounded-full ${isMusic ? "bg-orange-500/15" : "bg-emerald-500/15"} blur-3xl`} />
        <span className="absolute -right-20 top-2 h-48 w-48 rounded-full bg-amber-400/10 blur-[100px]" />
      </div>

      <div className="relative grid gap-6 md:grid-cols-4 md:gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="soundwave-container">
            <span className="soundwave-ring ring-1" />
            <span className="soundwave-ring ring-2" />
            <span className="soundwave-ring ring-3" />
            <img
              className="relative z-10 h-12 w-12 rounded-full border border-stone-200 bg-white object-cover shadow-lg"
              src="/legacy/tal_logo1.png"
              alt="DMS Aarohi logo"
              decoding="async"
              width="48"
              height="48"
            />
          </div>
          <div>
            <p className="font-serif text-lg font-bold">
              {isNgo ? "DMS Aarohi NGO" : isMusic ? "DMS Aarohi Music" : "DMS Aarohi"}
            </p>
            <p className="text-xs text-stone-400">
              {isNgo ? "Music & Service" : isMusic ? "Musical Society" : "Music & Service"}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Links</p>
          <ul className="space-y-1 text-xs">
            <li><a href="/" className="text-stone-300 hover:text-emerald-300 transition">Home</a></li>
            <li><a href="/music" className="text-stone-300 hover:text-emerald-300 transition">Music Society</a></li>
            <li><a href="/home" className="text-stone-300 hover:text-emerald-300 transition">Home</a></li>
            <li><a href="/music-society" className="text-stone-300 hover:text-emerald-300 transition">Music Society</a></li>
            <li><a href="/ngo" className="text-stone-300 hover:text-emerald-300 transition">NGO</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Contact</p>
          <div className="space-y-1.5 text-xs text-stone-300">
            <p>Email: dmsaarohi@gmail.com</p>
            <p>Phone: +91-9810225442</p>
            <p>A5, 272, Paschim Vihar</p>
            <p>New Delhi - 110063</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Follow</p>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-500/20 text-white transition hover:border-emerald-300 hover:bg-emerald-500/40"
              title="Facebook"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-500/20 text-white transition hover:border-emerald-300 hover:bg-emerald-500/40"
              title="Instagram"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.412 0 7.997.015 6.743.072 2.966.266.772 2.461.577 6.742.519 8.012.504 8.426.504 12c0 3.575.015 3.989.072 5.244.195 4.281 2.389 6.476 6.67 6.671 1.253.057 1.668.072 5.244.072 3.575 0 3.99-.015 5.243-.072 4.281-.195 6.476-2.389 6.671-6.671.057-1.255.072-1.669.072-5.244 0-3.574-.015-3.988-.072-5.243C23.334 2.966 21.14.772 16.859.577 15.744.52 15.33.504 12 .504z"/>
                <circle cx="12" cy="12" r="3.6"/>
                <circle cx="18.406" cy="5.594" r="0.9"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 pt-4 mt-6">
        <p className="text-center text-xs text-stone-400">
          © {currentYear} DMS Aarohi {isNgo ? "NGO" : isMusic ? "Music" : ""}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

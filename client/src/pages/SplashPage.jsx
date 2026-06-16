import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SplashPage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeen = window.localStorage.getItem("dms_intro_seen");
    if (hasSeen) {
      setShowIntro(false);
      return;
    }
    const timer = window.setTimeout(() => {
      window.localStorage.setItem("dms_intro_seen", "1");
      setShowIntro(false);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(171,63,45,0.22),transparent_38%),radial-gradient(circle_at_right_center,rgba(204,160,87,0.26),transparent_30%),linear-gradient(180deg,#f8f0e4_0%,#efe1cf_100%)] text-stone-900">
      {showIntro ? (
        <div className="flex min-h-screen items-center justify-center overflow-hidden px-6">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.7rem] border border-white/60 bg-white/85 p-10 shadow-[0_30px_120px_rgba(84,42,24,0.22)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0">
              <span className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-emerald-400/15 blur-[90px]" />
              <span className="absolute bottom-6 right-4 h-48 w-48 rounded-full bg-amber-400/18 blur-[120px]" />
            </div>
            <div className="relative flex flex-col items-center gap-5">
              <div className="soundwave-container">
                <span className="soundwave-ring ring-1" />
                <span className="soundwave-ring ring-2" />
                <span className="soundwave-ring ring-3" />
                <img
                  className="relative z-10 h-20 w-20 rounded-full border border-stone-200 bg-white object-cover shadow-xl"
                  src="/legacy/tal_logo1.png"
                  alt="Talent Hunt logo"
                  decoding="async"
                  width="80"
                  height="80"
                />
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Powered by music & service</p>
                <p className="mt-2 font-serif text-3xl text-stone-900">DMS Aarohi Musical Society</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-stone-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Loading experience
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:68px_68px]" />
          
          {/* Header Section */}
          <div className="relative mb-8 w-full max-w-2xl text-center sm:mb-12">
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl md:text-5xl">
              Welcome to DMS Aarohi
            </h1>
            <p className="mt-3 text-base text-stone-600 sm:text-lg md:mt-4">
              Select which platform you'd like to explore
            </p>
          </div>

          {/* Cards Grid */}
          <div className="relative grid w-full max-w-4xl gap-6 sm:gap-8 md:grid-cols-2">
            {/* Music Society Card */}
            <Link
              to="/music-society"
              className="group flex flex-col overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 p-8 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 sm:rounded-3xl sm:p-10 md:min-h-[320px]"
            >
              {/* Decorative blobs */}
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-all duration-500 group-hover:h-52 group-hover:w-52" />
              <div className="absolute bottom-0 right-0 h-28 w-28 rounded-full bg-emerald-300/20 blur-2xl" />
              
              {/* Content */}
              <div className="relative flex flex-1 flex-col justify-between">
                <div>
                  {/* Icon/Badge */}
                  <div className="mb-4 inline-flex items-center rounded-lg bg-emerald-600/40 px-4 py-2 backdrop-blur-sm">
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-200">🎵 Music Society</span>
                  </div>
                  
                  {/* Title */}
                  <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
                    Celebrate
                  </h2>
                  
                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-emerald-50/90 sm:text-base">
                    Explore our world of music, performances, and talent showcases. Join our community of artists and music enthusiasts.
                  </p>
                </div>

                {/* Footer */}
                <div className="relative mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100">
                    Enter the stage <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* NGO Card */}
            <Link
              to="/ngo"
              className="group flex flex-col overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700 p-8 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 sm:rounded-3xl sm:p-10 md:min-h-[320px]"
            >
              {/* Decorative blobs */}
              <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-all duration-500 group-hover:h-52 group-hover:w-52" />
              <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-amber-300/20 blur-2xl" />
              
              {/* Content */}
              <div className="relative flex flex-1 flex-col justify-between">
                <div>
                  {/* Icon/Badge */}
                  <div className="mb-4 inline-flex items-center rounded-lg bg-orange-600/40 px-4 py-2 backdrop-blur-sm">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-200">🤝 NGO Initiative</span>
                  </div>
                  
                  {/* Title */}
                  <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
                    Make Impact
                  </h2>
                  
                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-amber-50/90 sm:text-base">
                    Discover our services, activities, and social initiatives. Be part of our mission to create positive change.
                  </p>
                </div>

                {/* Footer */}
                <div className="relative mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-100">
                    Explore mission <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom Info */}
          <div className="relative mt-12 text-center">
            <p className="text-xs text-stone-500 sm:text-sm">
              Choose your path • Seamless experience across all devices
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SplashPage;

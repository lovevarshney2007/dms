import React, { useState } from 'react';
import tracks from '../config/tracks.config';

function SplitScreenHero() {
  const [hoveredSide, setHoveredSide] = useState(null);

  const talentTrack = tracks.find((t) => t.id === 'talent');
  const socialTrack = tracks.find((t) => t.id === 'social');

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] md:h-screen w-full md:overflow-hidden bg-charcoal">
      {/* Talent & Performance Side */}
      <a
        href={talentTrack.href}
        className={`relative isolate flex-1 min-h-[50vh] md:min-h-0 group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer ${
          hoveredSide === 'talent' ? 'md:flex-[1.25]' : hoveredSide === 'social' ? 'md:flex-[0.75]' : 'md:flex-1'
        }`}
        onMouseEnter={() => setHoveredSide('talent')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <img
          src={talentTrack.image}
          alt={talentTrack.imageAlt}
          className="absolute inset-0 w-full h-full object-cover z-[-2] transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Subtle dark gradient overlay to ensure the glass panel pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-[-1] transition-opacity duration-700 group-hover:opacity-100 opacity-60"></div>
        
        <div className="relative z-10 flex flex-col justify-center h-full p-6 md:p-10 lg:p-16">
          <div className="transform transition-all duration-700 md:group-hover:-translate-y-4 backdrop-blur-md bg-charcoal/40 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl w-full max-w-xl flex flex-col justify-between min-h-[320px] md:min-h-[360px] lg:min-h-[400px]">
            <div>
              <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-white drop-shadow-lg leading-tight break-words">
                {talentTrack.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-cream/90 font-inter drop-shadow-md line-clamp-3">
                {talentTrack.description}
              </p>
            </div>
            <div className="mt-8">
              <span className="inline-flex items-center text-gold font-poppins font-bold uppercase tracking-widest text-xs md:text-sm bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm border border-gold/30 transition-colors hover:bg-gold/20 hover:text-white">
                {talentTrack.ctaLabel} 
                <span className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </div>
          </div>
        </div>
      </a>

      {/* Social Initiative Side */}
      <a
        href={socialTrack.href}
        className={`relative isolate flex-1 min-h-[50vh] md:min-h-0 group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer ${
          hoveredSide === 'social' ? 'md:flex-[1.25]' : hoveredSide === 'talent' ? 'md:flex-[0.75]' : 'md:flex-1'
        }`}
        onMouseEnter={() => setHoveredSide('social')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <img
          src={socialTrack.image}
          alt={socialTrack.imageAlt}
          className="absolute inset-0 w-full h-full object-cover z-[-2] transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Subtle dark gradient overlay to ensure the glass panel pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-[-1] transition-opacity duration-700 group-hover:opacity-100 opacity-60"></div>
        
        <div className="relative z-10 flex flex-col justify-center h-full p-6 md:p-10 lg:p-16">
          <div className="transform transition-all duration-700 md:group-hover:-translate-y-4 backdrop-blur-md bg-charcoal/40 p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl w-full max-w-xl ml-auto md:ml-0 flex flex-col justify-between min-h-[320px] md:min-h-[360px] lg:min-h-[400px]">
            <div>
              <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-white drop-shadow-lg leading-tight break-words">
                {socialTrack.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-cream/90 font-inter drop-shadow-md line-clamp-3">
                {socialTrack.description}
              </p>
            </div>
            <div className="mt-8">
              <span className="inline-flex items-center text-green font-inter font-bold uppercase tracking-widest text-xs md:text-sm bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm border border-green/30 transition-colors hover:bg-green/20 hover:text-white">
                {socialTrack.ctaLabel} 
                <span className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default SplitScreenHero;

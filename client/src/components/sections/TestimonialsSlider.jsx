import { useState } from "react";
import { testimonials } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <div className="mb-10 text-center">
        <SectionHeading
          eyebrow="Success Stories"
          title="Hear From Our Winners."
          text="Discover how DMS Aarohi changed the lives of our past participants and launched their careers."
        />
      </div>

      <div className="relative glass-card rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 border border-orange-100 shadow-xl overflow-hidden max-w-4xl mx-auto bg-white/80">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200/30 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="shrink-0 relative">
            <img 
              src={testimonials[currentIndex].image} 
              alt={testimonials[currentIndex].name} 
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
              "
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <p className="text-lg md:text-2xl text-stone-700 italic font-medium leading-relaxed mb-6">
              "{testimonials[currentIndex].quote}"
            </p>
            <div>
              <h4 className="text-xl font-bold text-stone-900">{testimonials[currentIndex].name}</h4>
              <p className="text-orange-600 font-bold text-sm tracking-wide uppercase mt-1">{testimonials[currentIndex].season}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8 md:mt-12">
          <button onClick={prev} className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-orange-500 w-6' : 'bg-stone-300'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

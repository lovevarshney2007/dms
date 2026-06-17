import { useState } from "react";
import { faqs } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 scroll-mt-32">
      <div className="mb-10 text-center">
        <SectionHeading
          eyebrow="Got Questions?"
          title="Frequently Asked Questions."
          text="Everything you need to know about the auditions, rules, and the competition process."
        />
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'bg-white border-orange-200 shadow-lg shadow-orange-100/50' : 'bg-white/60 border-stone-200 hover:border-orange-200'}`}
          >
            <button
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            >
              <span className={`font-bold text-base md:text-lg transition-colors ${openIndex === idx ? 'text-orange-600' : 'text-stone-900'}`}>
                {faq.question}
              </span>
              <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openIndex === idx ? 'bg-orange-100 text-orange-600 rotate-180' : 'bg-stone-100 text-stone-500'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </button>
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-stone-600 leading-relaxed font-medium">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const fs = require('fs');
let content = fs.readFileSync('client/src/pages/HomePage.jsx', 'utf8');

const targetButtons = `<div className="flex flex-col sm:flex-row gap-3">
                <Link to="/voice-of-delhi-ncr" className="inline-flex items-center justify-center gap-2 text-white bg-stone-900 px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-md text-sm sm:text-base">
                  Explore Now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
                <Link to="/register" className="inline-flex items-center justify-center gap-2 text-orange-600 border-2 border-orange-300 px-6 py-3 rounded-full font-bold hover:bg-orange-50 transition text-sm sm:text-base">
                  Register Now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>`;

const newButton = `<div className="flex flex-col sm:flex-row gap-3">
                <Link to="/about" className="inline-flex items-center justify-center gap-2 text-white bg-stone-900 px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-md text-sm sm:text-base">
                  Read More
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>`;

content = content.replace(targetButtons, newButton);
fs.writeFileSync('client/src/pages/HomePage.jsx', content);
console.log("Replaced buttons successfully");

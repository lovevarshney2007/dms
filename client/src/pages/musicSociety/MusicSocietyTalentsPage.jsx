import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  performancesGallery,
  qualifiedContestants as defaultQualifiedContestants,
  successStories as defaultSuccessStories
} from "../../data/siteContent";
import SectionHeading from "../../components/common/SectionHeading";
import ScrollReveal from "../../components/common/ScrollReveal";

const fallbackQC = defaultQualifiedContestants.map((contestant, index) => ({
  score: index === 0 ? "98.5" : "96.0",
  ...contestant
}));
const fallbackSS = defaultSuccessStories;

function MusicSocietyTalentsPage() {
  const [qualifiedContestants, setQualifiedContestants] = useState(fallbackQC);
  const [successStories, setSuccessStories] = useState(fallbackSS);

  useEffect(() => {
    Promise.all([
      fetch(import.meta.env.VITE_API_URL + "/api/content/qualified-contestant").then(res => res.json()),
      fetch(import.meta.env.VITE_API_URL + "/api/content/success-story").then(res => res.json())
    ]).then(([qcData, ssData]) => {
      if (qcData && qcData.length > 0) {
        setQualifiedContestants(qcData.map(d => ({
          name: d.title,
          image: d.imageUrl || "/legacy/pa.jpg",
          status: d.meta?.status || "Contestant",
          city: d.meta?.city || "Delhi NCR",
          category: d.meta?.category || "Open",
          score: d.meta?.score || "0"
        })));
      }
      if (ssData && ssData.length > 0) {
        setSuccessStories(ssData.map(d => ({
          name: d.title,
          achievement: d.subtitle,
          description: d.description,
          image: d.imageUrl || "/legacy/about_group.png"
        })));
      }
    }).catch(console.error);
  }, []);

  const topTalent = qualifiedContestants[0]; // Aarav Sharma

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-14">
      
      {/* 1. Featured Talent of the Month */}
      <ScrollReveal direction="up" className="relative rounded-[3rem] bg-gradient-to-br from-stone-900 to-stone-950 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/5">
        <div className="absolute inset-0 bg-[url('/legacy/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 items-center gap-10 p-8 sm:p-14 lg:p-20">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,1)]"></span>
              Featured Talent
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-white font-bold mb-4 drop-shadow-lg">
              {topTalent?.name}
            </h1>
            <p className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-2 justify-center lg:justify-start">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {topTalent?.city}
            </p>
            <p className="text-stone-300 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              With a mesmerizing voice and an unmatched score of <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">{topTalent?.score} points</span>, {topTalent?.name} has captured the hearts of our judges and audience alike.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(249,115,22,0.4)]">
                Watch Performance
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors backdrop-blur-md">
                View Profile
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-br from-orange-400 via-amber-500 to-rose-600 shadow-[0_0_60px_rgba(249,115,22,0.4)] group">
              <img src={topTalent?.image} alt={topTalent?.name} className="w-full h-full object-cover rounded-full border-4 border-stone-900 group-hover:scale-[1.02] transition-transform duration-500" />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Current Leaderboard */}
      <section>
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Season 4 Finalists"
              title="Qualified Contestants"
              text="Season 4 Senior Category Finalists — competing at the Grand Finale on 4 July 2026."
            />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2rem] border border-orange-100 shadow-[0_20px_60px_rgba(234,88,12,0.05)] p-4 sm:p-8">
              <div className="space-y-3">
                {qualifiedContestants.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 sm:p-5 bg-stone-50/80 hover:bg-white rounded-2xl border border-stone-100 hover:border-orange-200 transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(234,88,12,0.1)] hover:-translate-y-1">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="relative">
                        <img src={user.image} alt={user.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-sm" />
                        {idx < 3 && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-xs">👑</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg sm:text-xl text-stone-900 group-hover:text-orange-600 transition-colors">{user.name}</h4>
                        <p className="text-xs sm:text-sm text-stone-500 font-medium flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {user.city}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full font-bold text-xs sm:text-sm mb-1">{user.status}</div>
                       <div className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-400 font-bold text-center">{user.category}</div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Success Stories / Hall of Fame */}
      <section>
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Hall of Fame"
              title="Success Stories"
              text="Meet our past winners who are now making waves in the music industry."
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {successStories.map((story, idx) => (
              <div key={idx} className="group relative rounded-[2rem] bg-gradient-to-b from-white to-stone-50 border border-stone-100 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(234,88,12,0.1)] transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md mx-auto group-hover:scale-105 transition-transform duration-500 bg-stone-100 relative">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 rounded-full ring-2 ring-orange-500/50 ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-center font-serif text-2xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors">{story.name}</h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5 border border-orange-100">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                  {story.achievement}
                </div>
                <p className="text-center text-stone-600 leading-relaxed text-sm font-medium">{story.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Performances Gallery */}
      <section>
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Gallery"
              title="Stage Performances"
              text="Relive the magic of our most memorable stage performances."
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {performancesGallery.map((item, idx) => (
              <div key={idx} className="group relative h-64 rounded-3xl overflow-hidden shadow-lg cursor-pointer">
                <img src={item.image === '/legacy/bd3.jpg' ? '/legacy/image1.jpeg' : item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 scale-75 group-hover:scale-100 group-hover:bg-orange-500 transition-all duration-300 shadow-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <h4 className="text-white font-bold text-center px-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 5. Call to Action (Join Us) */}
      <ScrollReveal direction="up">
        <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-orange-500 to-rose-600 p-10 sm:p-16 text-center shadow-[0_20px_60px_rgba(249,115,22,0.3)] border border-orange-400">
          <div className="absolute inset-0 bg-[url('/legacy/noise.png')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to be the next Voice?
            </h2>
            <p className="text-lg text-orange-50 mb-10 leading-relaxed font-medium">
              Registrations are now open for the upcoming season of Voice of Delhi-NCR. Don't miss your chance to showcase your talent to the world!
            </p>
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
              Register for Auditions
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </section>
      </ScrollReveal>

    </div>
  );
}

export default MusicSocietyTalentsPage;

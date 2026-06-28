import { Link } from "react-router-dom";
import { qualifiedContestants, successStories, performancesGallery } from "../../data/siteContent";
import SectionHeading from "../../components/common/SectionHeading";

function MusicSocietyTalentsPage() {
  const topTalent = qualifiedContestants[0]; // Aarav Sharma

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24">
      
      {/* 1. Featured Talent of the Month */}
      <section className="relative rounded-[2.5rem] bg-stone-900 overflow-hidden shadow-2xl border border-stone-800">
        <div className="absolute inset-0 bg-[url('/legacy/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 items-center gap-10 p-8 sm:p-14 lg:p-20">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Featured Talent of the Month
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-white font-bold mb-6">
              {topTalent.name}
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              With a mesmerizing voice and an unmatched score of {topTalent.score} points, {topTalent.name} from {topTalent.city} has captured the hearts of our judges and audience alike.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                Watch Performance
              </button>
              <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-md">
                View Profile
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-br from-orange-400 to-rose-600 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
              <img src={topTalent.image} alt={topTalent.name} className="w-full h-full object-cover rounded-full border-4 border-stone-900" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Current Leaderboard */}
      <section>
        <div className="text-center mb-12">
          <SectionHeading
            eyebrow="Rankings"
            title="Current Leaderboard"
            text="The top performers from the Voice of Delhi-NCR auditions."
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] border border-orange-100 shadow-[0_20px_60px_rgba(234,88,12,0.05)] p-6 sm:p-10">
            <div className="space-y-4">
              {qualifiedContestants.map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 sm:p-6 bg-stone-50 hover:bg-orange-50/50 rounded-2xl border border-stone-100 hover:border-orange-200 transition-all group">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-lg ${idx === 0 ? 'bg-amber-100 text-amber-700 shadow-inner' : idx === 1 ? 'bg-stone-200 text-stone-700 shadow-inner' : idx === 2 ? 'bg-orange-100 text-orange-800 shadow-inner' : 'bg-white text-stone-400 border border-stone-200'}`}>
                      #{idx + 1}
                    </div>
                    <img src={user.image} alt={user.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-sm" />
                    <div>
                      <h4 className="font-bold text-lg sm:text-xl text-stone-900 group-hover:text-orange-600 transition-colors">{user.name}</h4>
                      <p className="text-sm text-stone-500 font-medium">{user.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg sm:text-xl text-emerald-600">{user.status}</div>
                    <div className="text-xs uppercase tracking-wider text-stone-400 font-bold">Status</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Success Stories / Hall of Fame */}
      <section>
        <div className="text-center mb-12">
          <SectionHeading
            eyebrow="Hall of Fame"
            title="Success Stories"
            text="Meet our past winners who are now making waves in the music industry."
          />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, idx) => (
            <div key={idx} className="group rounded-[2rem] bg-white border border-stone-100 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-orange-50 mx-auto group-hover:border-orange-100 transition-colors">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-center font-serif text-2xl font-bold text-stone-900 mb-1">{story.name}</h3>
              <p className="text-center text-sm font-bold text-orange-600 uppercase tracking-widest mb-4">{story.achievement}</p>
              <p className="text-center text-stone-600 leading-relaxed text-sm">{story.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Performances Gallery */}
      <section>
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
              <div className="absolute inset-0 bg-stone-900/40 transition-opacity duration-300 group-hover:bg-stone-900/60 flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300 shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <h4 className="text-white font-bold text-center px-4">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Call to Action (Join Us) */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-orange-500 to-rose-600 p-10 sm:p-16 text-center shadow-2xl">
        <div className="absolute inset-0 bg-[url('/legacy/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to be the next Voice?
          </h2>
          <p className="text-lg text-orange-100 mb-10 leading-relaxed">
            Registrations are now open for the upcoming season of Voice of Delhi-NCR. Don't miss your chance to showcase your talent to the world!
          </p>
          <Link to="/music/register" className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
            Register for Auditions
          </Link>
        </div>
      </section>

    </div>
  );
}

export default MusicSocietyTalentsPage;

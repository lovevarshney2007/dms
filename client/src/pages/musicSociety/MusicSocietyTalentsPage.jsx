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

// DMS Aarohi logo fallback for contestants without images
const DMS_LOGO = "/images/looth.png";

// Season 4 finalists with images (from /seasons/ folder if available, else logo)
const season4Finalists = [
  // Junior
  { name: "Aarna Agrawal", category: "Junior", image: "/images/looth.png" },
  { name: "Adaa Srivastava", category: "Junior", image: "/seasons/adaa.png" },
  { name: "Ayami Aadhya", category: "Junior", image: "/seasons/ayaami.png" },
  { name: "Devarsh Sharma", category: "Junior", image: "/images/looth.png" },
  { name: "Dhruv Pandit", category: "Junior", image: "/images/looth.png" },
  { name: "Lavishka Sharma", category: "Junior", image: "/images/looth.png" },
  { name: "Mandeep Singh", category: "Junior", image: "/images/looth.png" },
  { name: "Netra Singh", category: "Junior", image: "/images/looth.png" },
  { name: "Praharsh Kashyap", category: "Junior", image: "/images/looth.png" },
  { name: "Priyanshi", category: "Junior", image: "/images/looth.png" },
  { name: "Shreyas Thakur", category: "Junior", image: "/images/looth.png" },
  { name: "Varin Kakkar", category: "Junior", image: "/seasons/kuvam.png" },
  { name: "Advita Mittal", category: "Junior", image: "/images/looth.png" },
  { name: "Keshav Pandit", category: "Junior", image: "/images/looth.png" },
  // Senior
  { name: "Arijit Roy", category: "Senior", image: "/seasons/arijit.png" },
  { name: "Bhoomi Tyagi", category: "Senior", image: "/images/looth.png" },
  { name: "Chandreyi Banerjee", category: "Senior", image: "/images/looth.png" },
  { name: "Deepshikha Mitra", category: "Senior", image: "/seasons/deepshikha.png" },
  { name: "Kuvam Sethi", category: "Senior", image: "/seasons/kuvam.png" },
  { name: "Maanvi Dwivedi", category: "Senior", image: "/seasons/mandeep.png" },
  { name: "Manoneet Munesha", category: "Senior", image: "/images/looth.png" },
  { name: "Nagma Ali", category: "Senior", image: "/images/looth.png" },
  { name: "Nitin Mishra", category: "Senior", image: "/images/looth.png" },
  { name: "Ruchika Chatterjee", category: "Senior", image: "/images/looth.png" },
  { name: "Sakshi Kumari", category: "Senior", image: "/images/looth.png" },
  { name: "Soumava Mukhopadhyay", category: "Senior", image: "/images/looth.png" },
  { name: "Srishti Sargam", category: "Senior", image: "/seasons/sristi.png" },
  // Super Senior
  { name: "Chetan P. Barodia (Dr.)", category: "Super Senior", image: "/images/looth.png" },
  { name: "Khushjit Singh", category: "Super Senior", image: "/images/looth.png" },
  { name: "Mandeep Negi", category: "Super Senior", image: "/images/looth.png" },
  { name: "P. Kumar (Dr.)", category: "Super Senior", image: "/images/looth.png" },
  { name: "Pritika Singh Gupta", category: "Super Senior", image: "/seasons/pratikia.png" },
  { name: "Rahul Agarwal", category: "Super Senior", image: "/seasons/rahul.png" },
  { name: "Rajat Chakraborthy", category: "Super Senior", image: "/images/looth.png" },
  { name: "Rajesh Kapoor", category: "Super Senior", image: "/seasons/rajesh.png" },
  { name: "Rajesh Laxmi Chand", category: "Super Senior", image: "/images/looth.png" },
  { name: "Vineet Sharma", category: "Super Senior", image: "/seasons/vineet.png" },
];

const categoryColors = {
  "Junior": "bg-amber-100 text-amber-700 border-amber-200",
  "Senior": "bg-orange-100 text-orange-700 border-orange-200",
  "Super Senior": "bg-rose-100 text-rose-700 border-rose-200",
  "All": "bg-stone-100 text-stone-700 border-stone-200"
};

function MusicSocietyTalentsPage() {
  const [successStories, setSuccessStories] = useState(fallbackSS);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/content/success-story")
      .then(res => res.json())
      .then(ssData => {
        if (ssData && ssData.length > 0) {
          setSuccessStories(ssData.map(d => ({
            name: d.title,
            achievement: d.subtitle,
            description: d.description,
            image: d.imageUrl || "/legacy/about_group.png",
            youtube: d.meta?.youtube || null
          })));
        }
      }).catch(console.error);
  }, []);

  const categories = ["All", "Junior", "Senior", "Super Senior"];
  const filteredFinalists = activeCategory === "All"
    ? season4Finalists
    : season4Finalists.filter(f => f.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-14">
      
      {/* 1. Page Header */}
      <ScrollReveal direction="up">
        <div className="relative rounded-[3rem] bg-gradient-to-br from-stone-900 to-stone-950 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/5 p-8 sm:p-14 text-center">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,1)]"></span>
              DMS Aarohi
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-white font-bold mb-4 drop-shadow-lg">
              Success Stories
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Celebrating the voices that have made DMS Aarohi proud - past winners, finalists, and rising stars.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Success Stories / Hall of Fame */}
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
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md mx-auto group-hover:scale-105 transition-transform duration-500 bg-stone-100 relative">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 rounded-full ring-2 ring-orange-500/50 ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-center font-serif text-2xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors">{story.name}</h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5 border border-orange-100">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                  {story.achievement}
                </div>
                <p className="text-center text-stone-600 leading-relaxed text-sm font-medium mb-5">{story.description}</p>
                {story.youtube && (
                  <a
                    href={story.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
                    Watch Performance
                  </a>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Qualified Contestants - Season 4 Finalists with Category Filter */}
      <section>
        <ScrollReveal direction="up">
          <div className="text-center mb-8">
            <SectionHeading
              eyebrow="Season 4 Finalists"
              title="Qualified Contestants"
              text="Season 4 Finalists - competing at the Grand Finale on 4 July 2026."
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-orange-600 text-white border-orange-600 shadow-md"
                    : "bg-white text-stone-600 border-stone-200 hover:border-orange-300 hover:text-orange-600"
                }`}
              >
                {cat}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeCategory === cat ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                }`}>
                  {cat === "All" ? season4Finalists.length : season4Finalists.filter(f => f.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Finalists Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filteredFinalists.map((finalist, idx) => (
              <div key={idx} className="group flex flex-col items-center bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:shadow-[0_10px_30px_rgba(234,88,12,0.12)] hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-3 border-orange-50 shadow-md mb-3 group-hover:border-orange-200 transition-colors">
                  <img
                    src={finalist.image}
                    alt={finalist.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = "/talenthunt/logo.png"; }}
                  />
                </div>
                <h4 className="font-bold text-sm text-stone-900 group-hover:text-orange-600 transition-colors leading-tight mb-1.5">{finalist.name}</h4>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${categoryColors[finalist.category]}`}>
                  {finalist.category}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Stage Performances - Image Gallery */}
      <section>
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Gallery"
              title="Stage Performances"
              text="Relive the magic of our most memorable stage performances through these snapshots."
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {performancesGallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-lg block"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 5. Call to Action */}
      <ScrollReveal direction="up">
        <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-orange-500 to-rose-600 p-10 sm:p-16 text-center shadow-[0_20px_60px_rgba(249,115,22,0.3)] border border-orange-400">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to be the next Voice?
            </h2>
            <p className="text-lg text-orange-50 mb-10 leading-relaxed font-medium">
              Registrations are now open for the upcoming season of Voice of Delhi-NCR. Don't miss your chance to showcase your talent to the world!
            </p>
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group">
              Register for Upcoming Season
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </section>
      </ScrollReveal>

    </div>
  );
}

export default MusicSocietyTalentsPage;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlaylistsSection from "../../components/sections/PlaylistsSection";
import SectionHeading from "../../components/common/SectionHeading";
import ScrollReveal from "../../components/common/ScrollReveal";

// All real shows from dmsaarohi.com website
const fallbackShows = [
  {
    id: 1,
    title: "100 Years of Indian Cinema",
    subtitle: "1st Show of DMS Aarohi",
    date: "2013",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "The very first show of DMS Aarohi. The Indian Cinema has undergone a massive change over the years. It started in 1913 from silent movies to the first talkie in 1931 to the colored movies to the ones today.",
    image: "/legacy/patrons.jpg",
    tag: "Cultural Event"
  },
  {
    id: 2,
    title: "Rafi Saab — The Very Best",
    subtitle: "94th Birth Anniversary",
    date: "23rd December, 2013",
    location: "India Islamic Cultural Centre, Lodhi Road, New Delhi",
    description: "Tribute to the Singer of the millennium — Mohammad Rafi Sahab by DMS AAROHI Singers on his 94th Birth Anniversary. A soulful evening celebrating the golden era of Indian music.",
    image: "/legacy/patrons.jpg",
    tag: "Tribute Concert"
  },
  {
    id: 3,
    title: "Ek Haseen Shaam Ko",
    subtitle: "2nd Show — Rafi Tribute",
    date: "2013",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "2nd show of DMS AAROHI on Mohd. Rafi. He was an Indian playback singer & one of the most popular & successful singers of the Hindi film industry.",
    image: "/legacy/current_event.jpg",
    tag: "Tribute Concert"
  },
  {
    id: 4,
    title: "Members Show",
    subtitle: "Open Air Theatre",
    date: "2014",
    location: "Open Theatre, Dilli Haat, INA, New Delhi",
    description: "The Musical Evening was enjoyed by all and provided a great platform for the members to engage with the students and encourage them in their endeavors.",
    image: "/legacy/about_group.png",
    tag: "Musical Evening"
  },
  {
    id: 5,
    title: "A Tribute to Mohammad Rafi",
    subtitle: "Special Edition",
    date: "2014",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Another show in 2014 with a song for every emotion. Sahab's voice continues to bind people across generations and geographies.",
    image: "/legacy/patrons.jpg",
    tag: "Tribute Concert"
  },
  {
    id: 6,
    title: "Shaam-e-Sangam",
    subtitle: "R.D. Burman & Kishore Kumar Night",
    date: "2014",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "The music of Burman's are awesome — each and every song that Kishore Kumar sang for him are heart touching and cannot be expressed in words.",
    image: "/legacy/KT.jpg",
    tag: "Musical Evening"
  },
  {
    id: 7,
    title: "Kishore Kumar",
    subtitle: "Dev Anand Special",
    date: "2015",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Kishore Kumar was ideally the best playback singer for Dev Anand and together they gave several super hit songs.",
    image: "/legacy/current_event.jpg",
    tag: "Kishore Tribute"
  },
  {
    id: 8,
    title: "Melodious Queens of Bollywood",
    subtitle: "Asha Bhosle Special",
    date: "September 2015",
    location: "Gurgaon",
    description: "Show on Melodious Queen of Bollywood Asha Bhosle in Gurgaon by Anuja Sinha.",
    image: "/legacy/show.png",
    tag: "Musical Evening"
  },
  {
    id: 9,
    title: "Bollywood Dhamaka",
    subtitle: "Amphitheatre Special",
    date: "2015",
    location: "Amphitheatre, Gurgaon",
    description: "Another show by DMS AAROHI in Amphitheatre in Gurgaon covering all genres of Bollywood music.",
    image: "/legacy/show.png",
    tag: "Bollywood Night"
  },
  {
    id: 10,
    title: "Ek Shaam Rafi Ke Naam",
    subtitle: "11th Show of DMS Aarohi",
    date: "2015",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "11th show of DMS AAROHI on Mohd. Rafi — a special tribute to the legend of Indian music.",
    image: "/legacy/patrons.jpg",
    tag: "Tribute Concert"
  },
  {
    id: 11,
    title: "Main Hu Jhumroo — Kishore Sings for Kishore",
    subtitle: "Special Edition",
    date: "30th April, 2016",
    location: "India Islamic Cultural Centre, Lodhi Road, New Delhi",
    description: "Dedicated to Gurudev Kishore Da, the immeasurable depth of many of Kishore Da's songs is what has tugged at the hearts of listeners for decades & continues to do so.",
    image: "/legacy/KT.jpg",
    tag: "Kishore Tribute"
  },
  {
    id: 12,
    title: "The Garam Dharam",
    subtitle: "Dharmendra Special",
    date: "9th April, 2016",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Another Hit Show of DMS AAROHI on Garam Dharam – Dharmendra on 9th April, 2016.",
    image: "/legacy/current_event.jpg",
    tag: "Bollywood Night"
  },
  {
    id: 13,
    title: "Signatures of the Greatest Superstars",
    subtitle: "Kishore Kumar Tribute",
    date: "2016",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Kishore Kumar Sings for the greatest superstars in Bollywood — Dev Anand, Rajesh Khanna & Amitabh Bachchan by Pankaj Mathur.",
    image: "/legacy/KT.jpg",
    tag: "Kishore Tribute"
  },
  {
    id: 14,
    title: "Remembering Mukesh",
    subtitle: "Musical Tribute",
    date: "December 2016",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "'Remembering Mukesh' in December 2016. He is considered to be one of the most popular and acclaimed singers of the Hindi film industry.",
    image: "/legacy/about_group.png",
    tag: "Tribute Concert"
  },
  {
    id: 15,
    title: "Madan Mohan Night",
    subtitle: "The Maestro of Ghazals",
    date: "2016",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Madan Mohan was a popular and unparalleled Indian music director from 1950–1970. He is particularly remembered for the immortal Ghazals.",
    image: "/legacy/patrons.jpg",
    tag: "Musical Evening"
  },
  {
    id: 16,
    title: "Remembering Rafi Saab",
    subtitle: "37th Barsi Special",
    date: "July 2017",
    location: "India Islamic Cultural Centre, Lodhi Road, New Delhi",
    description: "Tribute to the Singer of the millennium Rafi Sahab by DMS AAROHI Singers on his 37th Barsi. Remembering Rafi Sahab on his Birthday — an Indian playback singer and one of the most popular singers of Hindi film industry.",
    image: "/legacy/patrons.jpg",
    tag: "Tribute Concert"
  },
  {
    id: 17,
    title: "Dostana",
    subtitle: "Rafi & Kishore — Greatest Friends",
    date: "2017",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Great Legends: Greatest Friends — particularly in regard to the lasting friendship that existed between two of these titanic icons of the Hindi music industry.",
    image: "/legacy/current_event.jpg",
    tag: "Musical Evening"
  },
  {
    id: 18,
    title: "Voice of Delhi-NCR",
    subtitle: "Talent Hunt — Season 1",
    date: "2018",
    location: "Multiple Venues, Delhi NCR",
    description: "DMS Aarohi's flagship singing talent hunt that discovered hundreds of emerging voices from across the Delhi NCR region. Season 1 Winner: Peehu Srivastava.",
    image: "/legacy/poster.png",
    tag: "Talent Hunt"
  },
  {
    id: 19,
    title: "Dostana-2",
    subtitle: "Tribute to Kishore Kumar",
    date: "4th August, 2018",
    location: "India Islamic Cultural Centre, Lodhi Road, New Delhi",
    description: "Dedicated to Gurudev, the immeasurable depth of many of Kishore Da's songs is what has tugged at the hearts of listeners for decades & continues to do so.",
    image: "/legacy/current_event.jpg",
    tag: "Kishore Tribute"
  },
  {
    id: 20,
    title: "Voice of Delhi-NCR",
    subtitle: "Talent Hunt — Season 2",
    date: "2019",
    location: "Multiple Venues, Delhi NCR",
    description: "Season 2 expanded to more cities, featuring celebrity judges and bigger prize pools for talented singers from the Delhi NCR region.",
    image: "/legacy/about_group.png",
    tag: "Talent Hunt"
  },
  {
    id: 21,
    title: "Voice of Rajasthan",
    subtitle: "Season 3 — Special Edition",
    date: "2021",
    location: "Rajasthan",
    description: "A special edition — Voice of Rajasthan — expanded DMS Aarohi's reach beyond Delhi NCR, celebrating the rich musical heritage of Rajasthan.",
    image: "/legacy/image1.jpeg",
    tag: "Special Edition"
  }
];

const tagColors = {
  "Tribute Concert": "bg-amber-100 text-amber-800",
  "Musical Evening": "bg-blue-100 text-blue-800",
  "Kishore Tribute": "bg-purple-100 text-purple-800",
  "Talent Hunt": "bg-orange-100 text-orange-800",
  "Special Edition": "bg-rose-100 text-rose-800",
  "Cultural Event": "bg-teal-100 text-teal-800",
  "Bollywood Night": "bg-pink-100 text-pink-800"
};

function MusicSocietyShowsPage() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/content/competition")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map((d, i) => ({
            id: d._id || `cms-${i}`,
            title: d.title,
            subtitle: d.subtitle,
            description: d.description,
            image: d.imageUrl || "/legacy/patrons.jpg",
            tag: d.meta?.tag || "Cultural Event",
            date: d.meta?.date || "TBD",
            location: d.meta?.location || "Delhi NCR"
          }));
          // Sort by order or date if needed, but we'll just set it
          setShows(mapped);
        }
      })
      .catch(console.error);
  }, []);

  const upcomingShow = {
    title: "Voice of Delhi NCR — Season 4 Grand Finale",
    date: "4th July 2026 • 5:00 PM Onwards",
    location: "Pearey Lal Bhawan (Gandhi Memorial Hall), ITO, New Delhi",
    description: "Join us for an unforgettable evening as the finest voices of Delhi-NCR, including our Junior & Senior Category Finalists, compete for the ultimate title! Features live music by the DO-RE-MI band. Register now to attend!",
    image: "/legacy/show.png"
  };

  const glimpses = [
    "/legacy/KT.jpg",
    "/legacy/poster.png",
    "/legacy/image1.jpeg",
    "/legacy/patrons.jpg"
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. Page Header & About Our Shows */}
      <ScrollReveal direction="up" className="relative grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-stone-900 to-stone-800 rounded-[3rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>DMS Aarohi</span>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Shows</span>
          </h1>
          <div className="space-y-4 text-stone-300 text-base sm:text-lg leading-relaxed">
            <p>Welcome to the heart of DMS Aarohi's musical journey. Throughout the year, we host a variety of musical evenings, tribute concerts, live stage programs, and grand talent hunts.</p>
            <p>From classical tributes to Rafi Sahab, soulful evenings for Kishore Da, to the flagship Voice of Delhi NCR competition — every show is designed to celebrate music and create unforgettable memories.</p>
          </div>
          <Link to="/register" className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(249,115,22,0.3)]">
            Perform in Our Next Show
          </Link>
        </div>
        <div className="relative h-80 lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
          <img src="/legacy/show.png" alt="Our Shows" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent flex items-end p-8">
            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">Featured Highlight</div>
              <p className="font-serif font-bold text-3xl mb-1">Grand Finale 2026</p>
              <p className="text-stone-300 text-sm font-medium flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Pearey Lal Bhawan, ITO, New Delhi
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Upcoming Shows */}
      <section>
        <ScrollReveal direction="up">
          <div className="text-center mb-10">
            <SectionHeading
              eyebrow="Mark your calendars"
              title="Upcoming Shows"
              text="Be a part of our next big musical extravaganza."
            />
          </div>
          <div className="relative max-w-4xl mx-auto bg-white rounded-[2.5rem] p-6 sm:p-8 border border-stone-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row gap-8 items-center overflow-hidden group hover:shadow-[0_20px_60px_rgba(234,88,12,0.1)] transition-shadow">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-50 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-100 transition-colors"></div>
            
            <div className="w-full sm:w-2/5 shrink-0 h-64 sm:h-80 rounded-[2rem] overflow-hidden shadow-lg relative">
              <img src={upcomingShow.image} alt={upcomingShow.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4">
                <div className="px-4 py-2 bg-white/90 backdrop-blur-md text-orange-600 text-xs font-black uppercase tracking-widest rounded-full shadow-lg border border-white/50 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  Next Show
                </div>
              </div>
            </div>
            <div className="w-full sm:w-3/5 relative z-10 sm:pr-8">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-4 leading-tight">{upcomingShow.title}</h3>
              
              <div className="space-y-3 mb-6 bg-stone-50 rounded-2xl p-4 border border-stone-100">
                <p className="text-stone-700 font-bold flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </span>
                  {upcomingShow.date}
                </p>
                <p className="text-stone-700 font-bold flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  {upcomingShow.location}
                </p>
              </div>
              
              <p className="text-stone-500 text-sm leading-relaxed mb-6">{upcomingShow.description}</p>
              
              <Link to="/register" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg">
                Register Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Past Shows — DMS Aarohi Real Shows */}
      <section>
        <ScrollReveal direction="up">
          <div className="text-center mb-10">
            <SectionHeading
              eyebrow="Our Legacy"
              title="Past Shows & Events"
              text="A journey through our most memorable musical evenings and talent hunts."
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show, idx) => (
              <ScrollReveal key={show.id} direction="up" delay={idx * 0.07}>
                <div className="group bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(234,88,12,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  {/* Image */}
                  <div className="h-52 relative overflow-hidden">
                    <img src={show.image} alt={show.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    {/* Tag */}
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${tagColors[show.tag] || "bg-stone-100 text-stone-700"}`}>
                      {show.tag}
                    </div>
                    {/* Date */}
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{show.date}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-0.5 group-hover:text-orange-600 transition-colors leading-tight">{show.title}</h3>
                    <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-3">{show.subtitle}</p>
                    <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-1">{show.description}</p>
                    <div className="flex items-center gap-2 text-stone-400 text-[11px] font-medium">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      {show.location}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 4. YouTube Playlists */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="max-w-6xl mx-auto">
          <PlaylistsSection />
        </div>
      </ScrollReveal>

      {/* 5. Stage Glimpses */}
      <section>
        <ScrollReveal direction="up">
          <div className="text-center mb-10">
            <SectionHeading
              eyebrow="Behind the scenes"
              title="Stage Glimpses"
              text="A sneak peek into the energy and passion of our live concerts."
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {glimpses.map((img, idx) => (
              <div key={idx} className={`relative group rounded-3xl overflow-hidden shadow-lg ${idx === 0 || idx === 3 ? 'md:col-span-2' : ''}`}>
                <img src={img} alt="Stage Glimpse" className="w-full h-full object-cover min-h-[180px] group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}

export default MusicSocietyShowsPage;
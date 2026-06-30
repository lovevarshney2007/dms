import { Link } from "react-router-dom";
import ScrollReveal from "../../common/ScrollReveal";

const quickLinks = [
  {
    title: "Talents",
    desc: "Discover emerging voices & leaderboards.",
    to: "/success-stories",
    img: "/legacy/talents_bg.png",
    badge: "Season 5",
    badgeColor: "bg-orange-500"
  },
  {
    title: "Events",
    desc: "Upcoming auditions and talent hunts.",
    to: "/voice-of-delhi-ncr",
    img: "/legacy/current_event.jpg",
    badge: "Grand Finale",
    badgeColor: "bg-red-500"
  },
  {
    title: "Shows",
    desc: "Watch past concerts & performances.",
    to: "/shows",
    img: "/legacy/shows_bg.png",
    badge: "Live Concerts",
    badgeColor: "bg-emerald-600"
  },
  {
    title: "Join Us",
    desc: "Register as a singer or volunteer.",
    to: "/register",
    img: "/legacy/Joinus.jpg",
    badge: "Register Now",
    badgeColor: "bg-amber-500"
  }
];

function QuickLinksSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 sm:mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickLinks.map((link, idx) => (
          <ScrollReveal
            key={link.title}
            direction="up"
            delay={idx * 0.08}
          >
            <Link
              to={link.to}
              className="group block bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(234,88,12,0.18)] transition-all duration-300 hover:-translate-y-2 border border-stone-100"
            >
              {/* Image Section */}
              <div className="h-44 sm:h-48 w-full overflow-hidden relative">
                <img
                  src={link.img}
                  alt={link.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                {/* Badge */}
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${link.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider shadow-sm`}>
                  {link.badge}
                </div>
              </div>

              {/* Text Section */}
              <div className="p-5 sm:p-6 relative">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-1.5 group-hover:text-orange-600 transition-colors">{link.title}</h3>
                <p className="text-xs text-stone-500 font-medium leading-relaxed mb-4">
                  {link.desc}
                </p>

                <div className="flex items-center justify-between text-orange-600 font-bold text-xs uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                  <span>Explore Now</span>
                  <div className="w-7 h-7 rounded-full bg-orange-50 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export default QuickLinksSection;

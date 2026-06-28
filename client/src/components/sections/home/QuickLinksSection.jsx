import { Link } from "react-router-dom";
import ScrollReveal from "../../common/ScrollReveal";

const quickLinks = [
  {
    title: "Talents",
    desc: "Discover emerging voices & leaderboards.",
    to: "/success-stories",
    img: "/legacy/bd1.jpg" // Using an available image
  },
  {
    title: "Events",
    desc: "Upcoming auditions and talent hunts.",
    to: "/voice-of-delhi-ncr",
    img: "/legacy/current_event.jpg"
  },
  {
    title: "Shows",
    desc: "Watch past concerts & performances.",
    to: "/shows",
    img: "/legacy/bd2.jpg"
  },
  {
    title: "Join Us",
    desc: "Register as a singer or volunteer.",
    to: "/register",
    img: "/legacy/Joinus.jpg"
  }
];

function QuickLinksSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-8 sm:-mt-12 lg:-mt-16 mb-16 sm:mb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link, idx) => (
          <ScrollReveal
            key={link.title}
            direction="up"
            delay={idx * 0.1}
          >
            <Link
              to={link.to}
              className="group block bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(234,88,12,0.15)] transition-all duration-300 hover:-translate-y-2 border border-stone-100"
            >
              {/* Image Section */}
              <div className="h-48 sm:h-52 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src={link.img}
                  alt={link.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text Section */}
              <div className="p-6 sm:p-8 relative">
                <h3 className="font-serif text-2xl text-stone-900 mb-2">{link.title}</h3>
                <p className="text-sm text-stone-500 font-medium leading-relaxed mb-6">
                  {link.desc}
                </p>

                <div className="flex items-center justify-between text-orange-600 font-bold text-xs uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                  <span>Explore Now</span>
                  <div className="w-8 h-8 rounded-full bg-orange-50 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

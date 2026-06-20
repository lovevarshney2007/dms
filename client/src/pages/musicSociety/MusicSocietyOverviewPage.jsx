import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../../components/common/SectionHeading";
import PerformancesSection from "../../components/sections/PerformancesSection";
import HeroSection from "../../components/sections/HeroSection";
import TeamSliderRow from "../../components/common/TeamSliderRow";
import { patronsData, teamData } from "../../data/siteContent";

function MusicSocietyOverviewPage() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });

  const upcomingEvents = [
    {
      id: 1,
      title: "Voice of Delhi-NCR Talent Hunt",
      date: "March 30-31, 2026",
      location: "Delhi NCR",
      description: "Showcase your singing talent and win exciting prizes. Open to all age groups and singing styles.",
      type: "Talent Hunt"
    },
    {
      id: 2,
      title: "Classical Music Workshop",
      date: "April 15, 2026",
      location: "DMS Studio",
      description: "Learn classical music techniques from experienced maestros. Limited participants - register now!",
      type: "Workshop"
    },
    {
      id: 3,
      title: "Golden Era Music Evening",
      date: "May 5, 2026",
      location: "Open Air Theater",
      description: "Experience timeless melodies performed by renowned artists. A night of pure musical bliss.",
      type: "Concert"
    },
    {
      id: 4,
      title: "Youth Music Mentorship Program",
      date: "Starting April 1, 2026",
      location: "Virtual",
      description: "One-on-one mentoring sessions with professional musicians. Help shape the future of music.",
      type: "Mentorship"
    }
  ];

  const galleryImages = [
    { id: 1, image: "/legacy/current_event.jpg", alt: "Music Performance" },
    { id: 2, image: "/legacy/Joinus.jpg", alt: "Join Us Event" },  
    { id: 3, image: "/legacy/image1.jpeg", alt: "Event Crowd" },
    { id: 4, image: "/legacy/KT.jpg", alt: "Artists Performing" },
    { id: 5, image: "/legacy/patrons.jpg", alt: "Audience Engaged" },
    { id: 6, image: "/legacy/patrons.jpg", alt: "Team Gathering" }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll contact you soon.");
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="space-y-16 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSection />

      {/* --- QUICK ACTIONS GRID (Upgraded to look more Attractive & Premium) --- */}
     {/* --- QUICK ACTIONS GRID (Upgraded to Uniform Amber Theme & Better Image Ratio) --- */}
     <section className="relative z-10 -mt-6">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="Explore Music Society"
            title="Everything you need in one place."
            text="Jump into our latest events, discover rising talents, watch past shows, or join our growing musical community."
          />
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card Data: Ab hume alag-alag colors pass karne ki zaroorat nahi hai */}
          {[
            { title: "Talents", text: "Discover emerging voices & leaderboards.", to: "/music/talents", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUkhbi87LZqZDv8fRrlbVhGI4ddbPk-B7r_XjrVvygGA&s" },
            { title: "Events", text: "Upcoming auditions and talent hunts.", to: "/music/events", image: "/legacy/current_event.jpg" },
            { title: "Shows", text: "Watch past concerts & performances.", to: "/music/shows", image: "/legacy/show.png" },
            { title: "Join Us", text: "Register as a singer or volunteer.", to: "/music/register", image: "/legacy/poster.png" }
          ].map((card) => (
            <Link 
              key={card.title} 
              to={card.to} 
              // Uniform Amber Glow for all cards
              className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-lg ring-1 ring-stone-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.5)] hover:ring-amber-500"
            >
              {/* Cover Image (Height increased: h-60/64) */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-stone-900">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Card Content (Padding reduced to take less height) */}
              <div className="relative flex flex-col flex-grow px-5 py-5 sm:px-6 sm:py-6 bg-white z-10 rounded-t-[1.5rem] -mt-4 transition-transform duration-500 group-hover:-translate-y-1">
                
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-1.5 transition-colors duration-300 group-hover:text-amber-600">
                  {card.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-relaxed text-stone-500 font-medium">
                  {card.text}
                </p>
                
                {/* Explore Now Button Section (Now highlighted by default) */}
                <div className="mt-5 flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
                  <span className="text-[12px] sm:text-[13px] uppercase tracking-wider font-extrabold text-amber-600 transition-colors duration-300 group-hover:text-amber-700">
                    Explore Now
                  </span>
                  {/* Default Amber Background, solid on hover */}
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-all duration-500 group-hover:shadow-md group-hover:bg-amber-500 group-hover:text-white">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="scroll-mt-28 relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-white/90 via-[#fff8ef] to-orange-50/60 p-8 shadow-[0_20px_60px_rgba(234,88,12,0.06)] md:p-14">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400/10 blur-[80px]"></div>
        
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About DMS Aarohi Music"
              title="Cultural Heritage and Musical Excellence"
              text="Founded in 2013, DMS Aarohi is dedicated to preserving and promoting Indian classical music while nurturing modern musical talents. We believe in music's power to unite communities and inspire generations."
            />
            
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { number: "13+", text: "Years of Service" },
                { number: "500+", text: "Talents Trained" },
                { number: "100+", text: "Events Held" },
                { number: "1000+", text: "Audience Reached" }
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-4 rounded-2xl border border-white bg-white/60 p-4 shadow-sm backdrop-blur-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl font-bold text-orange-600">
                    ✨
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold text-stone-900">{stat.number}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">{stat.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {[
              { icon: "🎵", title: "Our Mission", desc: "Promote Indian classical music and provide platform for emerging talents to showcase their abilities.", color: "from-amber-400 to-orange-500" },
              { icon: "🌟", title: "Our Vision", desc: "Create a vibrant musical community where tradition meets innovation and talent thrives.", color: "from-rose-400 to-orange-500" },
              { icon: "❤️", title: "Our Values", desc: "Excellence, authenticity, community engagement, and social responsibility through music.", color: "from-pink-400 to-rose-500" }
            ].map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl border border-white bg-white/80 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl backdrop-blur-md">
                <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${item.color}`}></div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-2xl shadow-sm transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="scroll-mt-28">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="Upcoming"
            title="Events & Programs"
            text="Join us for various music events, workshops, and talent showcases throughout the year. Don't miss out on these opportunities!"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                  {event.type}
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 leading-tight">{event.title}</h3>
                
                <div className="mt-4 space-y-2 border-l-2 border-orange-200 pl-4 text-sm font-medium text-stone-600">
                  <p className="flex items-center gap-2 text-stone-800"><svg className="h-4 w-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> {event.date}</p>
                  <p className="flex items-center gap-2"><svg className="h-4 w-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> {event.location}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-stone-500 line-clamp-3">{event.description}</p>
              </div>

              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="relative z-10 mt-6 w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30"
              >
                Register Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Performances Section */}
      <PerformancesSection />

      {/* Gallery Section */}
      <section id="gallery" className="scroll-mt-28 rounded-[2.5rem] bg-stone-950 p-8 shadow-2xl md:p-14">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="Gallery"
            title={<span className="text-white">Moments & Memories</span>}
            text={<span className="text-stone-400">A glimpse into the magical moments from our past concerts and talent hunts.</span>}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {galleryImages.map((item, idx) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-stone-900 ${
                idx === 0 || idx === 3 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto sm:h-full" : "aspect-square"
              }`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-bold text-white drop-shadow-md">{item.alt}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-400 mt-1">View Full</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section id="team" className="mt-16 rounded-[2.5rem] border border-orange-100 bg-white p-8 shadow-[0_20px_60px_rgba(234,88,12,0.05)] md:p-12">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <SectionHeading
            eyebrow="Core Committee"
            title="Meet Our Team."
            text="The dedicated individuals working tirelessly behind the scenes."
          />
        </div>
        <TeamSliderRow members={teamData} />
      </section>

      {/* Meet Our Mentors / Patrons */}
      <section id="mentors" className="mt-8 rounded-[2.5rem] border border-orange-100 bg-white p-8 shadow-[0_20px_60px_rgba(234,88,12,0.05)] md:p-12">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <SectionHeading
            eyebrow="Our Patrons"
            title="Learn from the maestros."
            text="Our experienced patrons and directors are here to guide you."
          />
        </div>
        <TeamSliderRow members={patronsData} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-28 relative overflow-hidden rounded-[2.5rem] border border-orange-200/50 bg-gradient-to-br from-orange-50/90 to-[#fff8ef] p-8 shadow-[0_20px_60px_rgba(234,88,12,0.06)] md:p-14">
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-amber-400/20 blur-[80px]"></div>
        
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Contact Us"
              title="Get in Touch."
              text="Have questions or want to collaborate? Reach out to us and let's create magic through music!"
            />
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                { label: "Email Us", value: "dmsaarohi@gmail.com", icon: "✉️" },
                { label: "Call Us", value: "+91-9810225442", icon: "📞" },
                { label: "Location", value: "A5, 272, Paschim Vihar, New Delhi - 110063", icon: "📍" }
              ].map((item) => (
                <div key={item.label} className="group flex flex-col justify-center rounded-2xl border border-white bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl backdrop-blur-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-lg shadow-inner group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-800">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-stone-700">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <form className="relative overflow-hidden rounded-[2rem] border border-white bg-white/80 p-8 shadow-2xl backdrop-blur-xl" onSubmit={handleContactSubmit}>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600"></div>
            
            <div className="mb-8 text-center">
              <h3 className="font-serif text-3xl font-bold text-stone-900">Send a Message</h3>
              <p className="text-sm text-stone-500 mt-2">We typically reply within 24 hours.</p>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-700 pl-1">Full Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                  className="rounded-xl border-2 border-stone-100 bg-stone-50 px-4 py-3.5 text-sm font-semibold text-stone-900 transition-all placeholder:font-normal focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                />
              </div>
              
              <div className="grid gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-700 pl-1">Email Address</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                  className="rounded-xl border-2 border-stone-100 bg-stone-50 px-4 py-3.5 text-sm font-semibold text-stone-900 transition-all placeholder:font-normal focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                />
              </div>
              
              <div className="grid gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-700 pl-1">Phone Number</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="Enter your phone"
                  required
                  className="rounded-xl border-2 border-stone-100 bg-stone-50 px-4 py-3.5 text-sm font-semibold text-stone-900 transition-all placeholder:font-normal focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                />
              </div>
              
              <div className="grid gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-700 pl-1">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="How can we help you?"
                  required
                  rows="3"
                  className="resize-none rounded-xl border-2 border-stone-100 bg-stone-50 px-4 py-3.5 text-sm font-semibold text-stone-900 transition-all placeholder:font-normal focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                ></textarea>
              </div>

              <button
                type="submit"
                className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-stone-900 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30"
              >
                <span>Send Message</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}

export default MusicSocietyOverviewPage;
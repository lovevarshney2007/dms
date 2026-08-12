import { useState } from "react";
import SectionHeading from "../../components/common/SectionHeading";
import HeroSection from "../../components/sections/HeroSection";
import PerformancesSection from "../../components/sections/PerformancesSection";
import TeamSliderRow from "../../components/common/TeamSliderRow";

function MusicSocietyMainPage() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });

  const teamMembers = [
    { name: "Rajesh Kumar", role: "Founder & Director", image: "/legacy/patrons.jpg" },
    { name: "Priya Singh", role: "Music Director", image: "/legacy/bd1.jpg" },
    { name: "Amit Sharma", role: "Event Coordinator", image: "/legacy/bd2.jpg" },
    { name: "Neha Gupta", role: "Talent Scout", image: "/legacy/bd3.jpg" },
    { name: "Vikram Patel", role: "Technical Head", image: "/legacy/bd4.jpg" },
    { name: "Anjali Verma", role: "Community Manager", image: "/legacy/image1.jpeg" }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Next Singing Competition",
      date: "Coming Soon",
      location: "To Be Announced",
      description: "Our flagship singing competition is returning bigger and better! Showcase your talent, win exciting prizes, and perform on the grandest stage.",
      type: "Featured Event",
      isFeatured: true
    },
    {
      id: 2,
      title: "Classical Music Workshop",
      date: "Dates To Be Announced",
      location: "DMS Studio",
      description: "Learn classical music techniques from experienced maestros.",
      type: "Workshop",
      isFeatured: false
    },
    {
      id: 3,
      title: "Golden Era Music Evening",
      date: "Coming Soon",
      location: "Open Air Theater",
      description: "Experience timeless melodies performed by renowned artists.",
      type: "Concert",
      isFeatured: false
    }
  ];

  const galleryImages = [
    { id: 1, image: "/legacy/current_event.jpg", alt: "Music Performance" },
    { id: 2, image: "/legacy/Joinus.jpg", alt: "Join Us Event" },
    { id: 3, image: "/legacy/bd1.jpg", alt: "Event Crowd" },
    { id: 4, image: "/legacy/bd2.jpg", alt: "Artists Performing" }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll contact you soon.");
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="space-y-0">
      {/* Home Section */}
      <section id="home" className="scroll-mt-28">
        <HeroSection />
      </section>

      {/* Events Section - Moved Up and Highlighted */}
      <section id="events" className="scroll-mt-28 mt-8 sm:mt-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">Upcoming</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900 font-bold">Featured Event</h2>
        </div>

        {upcomingEvents.filter(e => e.isFeatured).map((event) => (
          <div key={event.id} className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-stone-900 to-stone-800 shadow-2xl mb-8 border border-stone-800">
            {/* Background Image / Pattern overlay (optional, keeping it clean dark for now) */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 via-stone-900 to-stone-900"></div>
            
            <div className="relative z-10 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 border border-orange-500/30">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                  {event.type}
                </span>
                <h3 className="font-serif text-4xl sm:text-5xl text-white font-bold mb-4 leading-tight">
                  {event.title}
                </h3>
                <div className="flex flex-wrap items-center gap-6 mb-6 text-stone-300 font-medium">
                  <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl"><span className="text-xl">📅</span> {event.date}</span>
                  <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl"><span className="text-xl">📍</span> {event.location}</span>
                </div>
                <p className="text-stone-400 text-lg leading-relaxed mb-8">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => {
                      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-4 font-bold text-white transition hover:shadow-[0_10px_30px_rgba(249,115,22,0.4)] hover:-translate-y-1"
                  >
                    📝 Pre-Register Now
                  </button>
                  <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest px-4 py-3 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                    🟢 Registration Opening Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {upcomingEvents.filter(e => !e.isFeatured).map((event) => (
            <div key={event.id} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700 mb-4">
                {event.type}
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">{event.title}</h3>
              <div className="flex flex-col gap-2 text-sm text-stone-600 font-medium mb-4">
                <span className="flex items-center gap-2">📅 {event.date}</span>
                <span className="flex items-center gap-2">📍 {event.location}</span>
              </div>
              <p className="text-sm leading-relaxed text-stone-500 mb-6">{event.description}</p>
              <button
                onClick={() => {
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-center rounded-xl border border-stone-200 bg-stone-50 px-5 py-3 text-sm font-bold text-stone-700 transition hover:bg-stone-100"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section - Compact */}
      <section id="about" className="rounded-[2.5rem] border border-orange-100 bg-gradient-to-br from-[#fff8ef] to-white p-8 sm:p-12 shadow-lg scroll-mt-28 mt-8 sm:mt-10">
        <SectionHeading
          eyebrow="About DMS Aarohi"
          title="Cultural Heritage and Musical Excellence"
          text="Founded in 2013, DMS Aarohi is dedicated to preserving and promoting Indian classical music while nurturing modern musical talents."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: "🎵", title: "Our Mission", desc: "Promote Indian classical music and provide a platform for emerging talents." },
            { icon: "🌟", title: "Our Vision", desc: "Create a vibrant musical community where tradition meets innovation." },
            { icon: "❤️", title: "Our Values", desc: "Excellence, authenticity, and social responsibility through music." }
          ].map((item, index) => (
            <div key={index} className="rounded-2xl bg-white p-6 shadow-sm border border-stone-100">
              <p className="text-4xl mb-4">{item.icon}</p>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Performances Section */}
      <section id="performances" className="scroll-mt-28 mt-8 sm:mt-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-600">Featured</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-900">Live Performances</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Watch our live performances and musical showcases
          </p>
        </div>
        <PerformancesSection />
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="rounded-2xl border border-white/40 bg-white/50 p-6 shadow-lg md:p-8 scroll-mt-28 mt-8 sm:mt-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-600">Gallery</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-900">Moments & Memories</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative h-48 overflow-hidden rounded-lg border border-white/40 shadow-sm transition hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
              <p className="absolute bottom-3 left-3 translate-y-4 text-sm font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {item.alt}
              </p>
            </div>
          ))}
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="rounded-2xl border border-white/40 bg-[#fff8ef] p-6 shadow-lg md:p-8 scroll-mt-28 mt-8 sm:mt-10 mb-6 sm:mb-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <SectionHeading
              eyebrow="Contact Us"
              title="Get in Touch"
              text="Have questions or want to collaborate? Reach out to us and let's create magic through music!"
            />
            <div className="grid gap-3">
              {[
                ["Email", "dmsaarohi@gmail.com"],
                ["Phone", "+91-9810225442"],
                ["Address", "A5, Paschim Vihar, New Delhi - 110063"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-stone-200 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-700">{label}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-700">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <form className="rounded-[1.75rem] border border-orange-200/40 bg-gradient-to-br from-orange-50/80 to-white p-6 shadow-sm" onSubmit={handleContactSubmit}>
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-800">Contact Form</p>
              <h3 className="mt-2 font-serif text-xl text-stone-900">Send us a message</h3>
            </div>

            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Name
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="rounded-lg border border-stone-200 bg-white/80 px-4 py-2.5 text-stone-900 placeholder-stone-400 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300/50"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Email
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="rounded-lg border border-stone-200 bg-white/80 px-4 py-2.5 text-stone-900 placeholder-stone-400 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300/50"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Phone
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  required
                  className="rounded-lg border border-stone-200 bg-white/80 px-4 py-2.5 text-stone-900 placeholder-stone-400 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300/50"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Message
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Tell us about your query or interest..."
                  rows="4"
                  required
                  className="rounded-lg border border-stone-200 bg-white/80 px-4 py-2.5 text-stone-900 placeholder-stone-400 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300/50 resize-none"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-lg bg-gradient-to-r from-orange-700 to-amber-600 px-6 py-3 font-semibold text-white transition hover:from-orange-600 hover:to-amber-500 active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 text-center shadow-lg md:p-8 mt-8 sm:mt-10 mb-6 sm:mb-8">
        <h3 className="font-serif text-2xl font-bold text-orange-900 md:text-3xl">
          Join Our Musical Community
        </h3>
        <p className="mt-3 text-stone-700">
          Whether you're a performer, enthusiast, or supporter - there's a place for you in DMS Aarohi
        </p>
        <a
          href="#contact"
          className="mt-5 inline-block rounded-lg bg-orange-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-800"
        >
          Get In Touch
        </a>
      </section>
    </div>
  );
}

export default MusicSocietyMainPage;

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
    { id: 3, image: "/legacy/bd1.jpg", alt: "Event Crowd" },
    { id: 4, image: "/legacy/bd2.jpg", alt: "Artists Performing" },
    { id: 5, image: "/legacy/bd3.jpg", alt: "Audience Engaged" },
    { id: 6, image: "/legacy/patrons.jpg", alt: "Team Gathering" }
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

      {/* About Us Section */}
      <section id="about" className="rounded-[2rem] border border-white/40 bg-gradient-to-br from-white/80 to-orange-50/40 p-6 shadow-lg md:p-8 scroll-mt-28 mt-8 sm:mt-10">
        <SectionHeading
          eyebrow="About DMS Aarohi Music"
          title="Cultural Heritage and Musical Excellence"
          text="Founded in 2013, DMS Aarohi is dedicated to preserving and promoting Indian classical music while nurturing modern musical talents. We believe in music's power to unite communities and inspire generations."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { icon: "🎵", title: "Our Mission", desc: "Promote Indian classical music and provide platform for emerging talents to showcase their abilities." },
            { icon: "🌟", title: "Our Vision", desc: "Create a vibrant musical community where tradition meets innovation and talent thrives." },
            { icon: "❤️", title: "Our Values", desc: "Excellence, authenticity, community engagement, and social responsibility through music." }
          ].map((item, index) => (
            <div key={index} className="rounded-xl border border-orange-200/60 bg-white/80 p-5 shadow-sm">
              <p className="text-3xl">{item.icon}</p>
              <h3 className="mt-2 font-serif text-lg text-stone-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { number: "13+", text: "Years of Service" },
            { number: "500+", text: "Talents Trained" },
            { number: "100+", text: "Events Held" },
            { number: "1000+", text: "Audience Reached" }
          ].map((stat, index) => (
            <div key={index} className="rounded-lg border border-orange-200/60 bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 text-center shadow-sm">
              <p className="font-serif text-3xl font-bold text-orange-900">{stat.number}</p>
              <p className="mt-1 text-xs text-stone-700">{stat.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="rounded-2xl border border-white/40 bg-white/50 p-6 shadow-lg md:p-8 scroll-mt-28 mt-8 sm:mt-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-600">Upcoming</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-900">Events & Programs</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Join us for various music events, workshops, and talent showcases throughout the year
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="rounded-xl border border-orange-100/80 bg-gradient-to-br from-[#fff8ef] to-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
                    {event.type}
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-semibold text-stone-900">{event.title}</h3>
                  <div className="mt-3 space-y-1.5 text-sm text-stone-600">
                    <p className="flex items-center gap-2"><span>📅</span> {event.date}</p>
                    <p className="flex items-center gap-2"><span>📍</span> {event.location}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{event.description}</p>
                  
                  {/* Registration Button */}
                  <button
                    onClick={() => {
                      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-4 inline-flex rounded-lg bg-gradient-to-r from-orange-700 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-orange-600 hover:to-amber-500 active:scale-95"
                  >
                    📝 Register Now
                  </button>
                </div>
              </div>
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

      {/* Our Team Section */}
      <section id="team" className="rounded-2xl border border-white/40 bg-gradient-to-br from-white/80 to-orange-50/40 p-6 shadow-lg md:p-8 scroll-mt-28 mt-8 sm:mt-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-800">Team</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-900">Meet Our Team</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Passionate musicians and organizers dedicated to creating exceptional musical experiences
          </p>
        </div>

        <TeamSliderRow members={teamMembers} />
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
                ["Address", "A5, 272, Paschim Vihar, New Delhi - 110063"]
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

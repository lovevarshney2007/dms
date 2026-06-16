import { useRef } from "react";

function NgoVolunteerPage() {
  const volunteerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for volunteering! We will contact you shortly.");
    e.target.reset();
  };

  return (
    <div className="space-y-0">
      <section
        id="volunteer"
        ref={volunteerRef}
        className="rounded-[2rem] border border-white/60 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 p-8 text-white shadow-[0_24px_80px_rgba(16,185,129,0.25)] md:p-10 scroll-mt-28 mt-6 sm:mt-8"
      >
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          {/* Content Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-50 backdrop-blur-sm">
                🤝 Volunteer
                <span className="text-emerald-200/90">Opportunity</span>
              </div>
              <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                Join our NGO volunteer circle
              </h2>
              <p className="text-lg leading-8 text-emerald-100">
                For NGO outreach only: support community drives, health camps, and music-led education. Share your
                skills, time, or resources; we will respond within 24 hours.
              </p>
            </div>

            {/* What We Do */}
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
                How You Can Help
              </p>
              <ul className="space-y-3 text-emerald-50">
                <li className="flex gap-3">
                  <span className="text-xl">📚</span>
                  <span>Teach or mentor underprivileged children</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">🩸</span>
                  <span>Organize blood donation camps</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">🍲</span>
                  <span>Help with food & essentials distribution</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">💪</span>
                  <span>Organize health awareness drives</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">🎵</span>
                  <span>Lead music & cultural programs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Section */}
          <form
            className="grid gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur md:sticky md:top-24"
            onSubmit={handleSubmit}
          >
            <h3 className="font-semibold text-white">Sign Up to Volunteer</h3>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-white">Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/30"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-white">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/30"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-white">Phone *</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 9876543210"
                required
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/30"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-white">Area of Interest *</label>
              <select
                name="interest"
                required
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/30"
              >
                <option value="">Select an area</option>
                <option value="education">Education & Mentoring</option>
                <option value="blood">Blood Donation</option>
                <option value="food">Food Distribution</option>
                <option value="health">Health Awareness</option>
                <option value="music">Music & Culture</option>
                <option value="coordination">Event Coordination</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-white">Availability *</label>
              <select
                name="availability"
                required
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/30"
              >
                <option value="">Select availability</option>
                <option value="weekends">Weekends</option>
                <option value="weekdays">Weekdays</option>
                <option value="flexible">Flexible</option>
                <option value="occasional">Occasional</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-white">Tell us about yourself (Optional)</label>
              <textarea
                name="message"
                placeholder="Share your skills, experience, or why you want to volunteer..."
                rows="3"
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/30 resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-lg bg-white/20 py-3 font-semibold text-white transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Submit Application
            </button>

            <p className="text-xs text-emerald-100">
              We'll review your application and contact you within 24 hours. Thank you for your interest!
            </p>
          </form>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="rounded-[2rem] border border-white/40 bg-gradient-to-br from-white/80 to-emerald-50/40 p-8 shadow-lg md:p-10 mt-8 sm:mt-10 mb-6 sm:mb-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Impact & Benefits
          </p>
          <h2 className="mt-2 font-serif text-3xl text-stone-900">
            Why Volunteer With Us?
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "🌟",
              title: "Make Real Impact",
              desc: "Directly help thousands of lives in underserved communities through hands-on work."
            },
            {
              icon: "🤝",
              title: "Join Community",
              desc: "Connect with like-minded individuals passionate about social change and growth."
            },
            {
              icon: "📜",
              title: "Recognition",
              desc: "Receive volunteer certificates and special recognition for your contributions."
            },
            {
              icon: "💡",
              title: "Learn & Grow",
              desc: "Develop new skills, gain experience, and become a better version of yourself."
            },
            {
              icon: "🎯",
              title: "Flexible Commitment",
              desc: "Volunteer as much or as little as you want - structure that fits your schedule."
            },
            {
              icon: "💖",
              title: "Personal Fulfillment",
              desc: "Experience the joy and satisfaction of making a positive difference daily."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-emerald-200/60 bg-white/80 p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-4xl">{item.icon}</p>
              <h3 className="mt-3 font-semibold text-stone-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NgoVolunteerPage;

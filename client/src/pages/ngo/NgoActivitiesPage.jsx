import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import NgoHeroSection from "../../components/sections/NgoHeroSection";

function NgoActivitiesPage() {
  const location = useLocation();
  const volunteerRef = useRef(null);
  const [showVolunteer, setShowVolunteer] = useState(location.hash === "#volunteer");
  const showHero = !showVolunteer;

  useEffect(() => {
    const hash = location.hash;
    setShowVolunteer(hash === "#volunteer");
    if (hash === "#volunteer" && volunteerRef.current) {
      volunteerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <div className="space-y-7">
      {showHero ? <NgoHeroSection /> : null}

      {showVolunteer ? (
        <section
          id="volunteer"
          ref={volunteerRef}
          className="rounded-[2rem] border border-white/60 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 p-7 text-white shadow-[0_24px_80px_rgba(16,185,129,0.25)]"
        >
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-50">
                NGO
                <span className="text-emerald-200/90">Volunteer</span>
              </div>
              <h2 className="font-serif text-3xl leading-tight">Join our NGO volunteer circle</h2>
              <p className="text-sm leading-7 text-emerald-100">
                For NGO outreach only: support community drives, health camps, and music-led education. Share your
                skills, time, or resources; we will respond within 24 hours.
              </p>
            </div>

            <form
              className="grid gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur"
              onSubmit={(event) => {
                event.preventDefault();
                alert("Thanks for volunteering! We will contact you shortly.");
              }}
            >
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-white">Name</label>
                <input
                  required
                  name="name"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-emerald-100/80 focus:border-white focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
              <div className="grid gap-2 md:grid-cols-2 md:gap-3">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-white">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-emerald-100/80 focus:border-white focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-white">Phone</label>
                  <input
                    required
                    name="phone"
                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-emerald-100/80 focus:border-white focus:outline-none"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-white">Profile photo (optional)</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white file:mr-3 file:rounded-full file:border-0 file:bg-white/80 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-900 hover:file:bg-white focus:border-white focus:outline-none"
                />
                <p className="text-xs text-emerald-100/80">Add a headshot or any ID image to speed verification.</p>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-white">How you can help</label>
                <textarea
                  name="message"
                  rows="3"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-emerald-100/80 focus:border-white focus:outline-none"
                  placeholder="Describe your skills, availability, or resources."
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-900 shadow-lg transition hover:-translate-y-0.5 sm:w-auto"
              >
                Submit Volunteer Form
              </button>
            </form>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default NgoActivitiesPage;

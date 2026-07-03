import { useState } from "react";
import { submitForm } from "../lib/api";

const initialForm = {
  companyName: "",
  contactPerson: "",
  mobile: "",
  email: "",
  sponsorshipInterest: "",
  sponsorshipType: "",
  message: "",
};

export default function BecomeASponsorPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitForm("/api/forms/sponsor-request", {
        name: form.contactPerson,
        organization: form.companyName,
        phone: form.mobile,
        email: form.email,
        sponsorshipTier: form.sponsorshipType + (form.sponsorshipInterest ? ` (${form.sponsorshipInterest})` : ""),
        message: form.message
      });
      setSubmitted(true);
    } catch (error) {
      alert("Error sending sponsor request: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-orange-950 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur mb-6 text-xs font-bold uppercase tracking-widest text-orange-300">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            Partnership Opportunities
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-serif leading-tight mb-4">
            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Sponsor</span>
          </h1>
          <p className="text-lg sm:text-xl font-bold text-orange-300 mb-4">
            Partner with DMS Aarohi Musical Society
          </p>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Support Music. Empower Talent. Grow Your Brand.
          </p>
        </div>
      </section>

      {/* Why Sponsor + Benefits */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-start mb-16">
          {/* Left: Description */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600 mb-3">Why Partner With Us</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-5 leading-tight">
              Be Part of Delhi's Most Celebrated Musical Platform
            </h2>
            <p className="text-stone-600 text-base leading-relaxed mb-4 font-medium">
              Become a sponsor of <strong className="text-stone-800">DMS Aarohi Musical Society</strong> and be part of one of the region's most recognized musical platforms. Through our flagship singing competition, <strong className="text-orange-700">Voice of Delhi NCR</strong>, and other musical programs, we connect brands with passionate audiences, talented artists, and unforgettable live experiences.
            </p>
            <p className="text-stone-600 text-base leading-relaxed font-medium">
              Whether you are a local business, corporate organization, educational institution, or startup, we offer meaningful sponsorship opportunities that help you increase brand visibility while supporting emerging musical talent.
            </p>
          </div>

          {/* Right: Benefits */}
          <div className="bg-orange-50 border border-orange-100 rounded-[2rem] p-6 sm:p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600 mb-4">Why Sponsor Us?</p>
            <ul className="space-y-4">
              {[
                { icon: "🎪", text: "Brand visibility at live events" },
                { icon: "📱", text: "Promotion across digital and social media platforms" },
                { icon: "🎤", text: "Recognition during stage performances" },
                { icon: "🏆", text: "Association with a trusted musical society" },
                { icon: "🌟", text: "Opportunity to support young and emerging talent" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                  <span className="text-stone-700 font-semibold text-sm sm:text-base leading-snug">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sponsor Information Form */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600 mb-2">Get Started</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-3">Sponsor Information</h2>
            <p className="text-stone-500 text-sm sm:text-base font-medium">Fill in the form below and our team will get back to you shortly.</p>
          </div>

          {submitted ? (
            /* Thank You Message */
            <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 border-2 border-orange-200 rounded-[2.5rem] p-10 sm:p-14 text-center shadow-xl">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">Thank You!</h3>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-medium max-w-xl mx-auto">
                Thank you for your interest in partnering with <strong className="text-orange-700">DMS Aarohi Musical Society</strong>. Our team will review your request and contact you shortly to discuss sponsorship opportunities and available partnership packages.
              </p>
              <p className="text-stone-600 text-base mt-4 font-medium">
                We look forward to creating a meaningful collaboration with you.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm(initialForm); }}
                className="mt-8 px-8 py-3 rounded-full border-2 border-orange-300 text-orange-700 font-bold hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-300"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-stone-200 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 sm:p-12 space-y-6">
              {/* Company / Organization Name */}
              <div>
                <label htmlFor="sponsor-company" className="block text-sm font-bold text-stone-700 mb-2">
                  Company / Organization Name <span className="text-orange-500">*</span>
                </label>
                <input
                  id="sponsor-company"
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Your company or organization name"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all placeholder:text-stone-400"
                />
              </div>

              {/* Contact Person Name */}
              <div>
                <label htmlFor="sponsor-contact" className="block text-sm font-bold text-stone-700 mb-2">
                  Contact Person Name <span className="text-orange-500">*</span>
                </label>
                <input
                  id="sponsor-contact"
                  type="text"
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all placeholder:text-stone-400"
                />
              </div>

              {/* Mobile + Email Row */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="sponsor-mobile" className="block text-sm font-bold text-stone-700 mb-2">
                    Mobile Number <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="sponsor-mobile"
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <label htmlFor="sponsor-email" className="block text-sm font-bold text-stone-700 mb-2">
                    Email Address <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="sponsor-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all placeholder:text-stone-400"
                  />
                </div>
              </div>

              {/* Sponsorship Interest + Type */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="sponsor-interest" className="block text-sm font-bold text-stone-700 mb-2">
                    Sponsorship Interest <span className="text-orange-500">*</span>
                  </label>
                  <select
                    id="sponsor-interest"
                    name="sponsorshipInterest"
                    value={form.sponsorshipInterest}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                  >
                    <option value="">Select interest area</option>
                    <option value="Voice of Delhi NCR">Voice of Delhi NCR</option>
                    <option value="Musical Shows">Musical Shows</option>
                    <option value="Future Events">Future Events</option>
                    <option value="General Sponsorship">General Sponsorship</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sponsor-type" className="block text-sm font-bold text-stone-700 mb-2">
                    Sponsorship Type <span className="text-orange-500">*</span>
                  </label>
                  <select
                    id="sponsor-type"
                    name="sponsorshipType"
                    value={form.sponsorshipType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                  >
                    <option value="">Select type</option>
                    <option value="Title Sponsor">Title Sponsor</option>
                    <option value="Co-Sponsor">Co-Sponsor</option>
                    <option value="Associate Sponsor">Associate Sponsor</option>
                    <option value="Event Partner">Event Partner</option>
                    <option value="Media Partner">Media Partner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="sponsor-message" className="block text-sm font-bold text-stone-700 mb-2">
                  Message
                </label>
                <textarea
                  id="sponsor-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us how you would like to collaborate with DMS Aarohi Musical Society."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all resize-none placeholder:text-stone-400"
                />
              </div>

              {/* Submit Button */}
              <button
                id="sponsor-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-base sm:text-lg shadow-[0_8px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_12px_25px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 transition-all duration-300 border border-orange-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/></svg>
                    Submitting…
                  </span>
                ) : "Submit Sponsorship Request"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

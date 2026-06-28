import { useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";

const contactDetails = [
  {
    label: "Email",
    value: "dmsaarohi@gmail.com",
    href: "mailto:dmsaarohi@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91-9810225442",
    href: "tel:+919810225442",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12 19.79 19.79 0 0 1 1.07 3.37a2 2 0 0 1 2-1.37h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Address",
    value: "A5, 272, Paschim Vihar, New Delhi - 110063",
    href: "https://maps.google.com/?q=Paschim+Vihar+New+Delhi",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ",
    color: "bg-red-600 hover:bg-red-700",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="black" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    color: "bg-blue-600 hover:bg-blue-700",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Page Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Get In Touch
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 mb-6">
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Us
              </span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Have questions about registration, auditions, or events? We'd love to hear from you!
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Info + Form Grid */}
        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Left: Contact Details */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-stone-900">Reach Us Directly</h2>
              
              {contactDetails.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Address" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">{item.label}</p>
                    <p className="font-semibold text-stone-900 group-hover:text-orange-600 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Follow Us On</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      title={social.label}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact Form */}
          <ScrollReveal direction="right">
            <div className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden">
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600"></div>
              
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6 mt-2">Send a Message</h2>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 text-3xl">
                    ✓
                  </div>
                  <p className="font-bold text-xl text-stone-900">Message Sent!</p>
                  <p className="text-stone-500 mt-2">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="w-full rounded-xl border-2 border-stone-100 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 transition-all placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full rounded-xl border-2 border-stone-100 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 transition-all placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="w-full rounded-xl border-2 border-stone-100 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 transition-all placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-2">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Registration Query, Event Info"
                      className="w-full rounded-xl border-2 border-stone-100 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 transition-all placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-2">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help you?"
                      required
                      rows="4"
                      className="w-full resize-none rounded-xl border-2 border-stone-100 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 transition-all placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 text-white font-bold py-4 hover:from-orange-600 hover:to-orange-500 transition-all hover:shadow-[0_8px_20px_rgba(234,88,12,0.3)] active:scale-[0.98]"
                  >
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Google Map */}
        <ScrollReveal direction="up">
          <div className="rounded-[2rem] overflow-hidden shadow-xl border border-stone-100">
            <div className="bg-white p-5 border-b border-stone-100">
              <h2 className="font-serif text-xl font-bold text-stone-900">
                📍 Our Location
              </h2>
              <p className="text-stone-500 text-sm mt-1">A5, 272, Paschim Vihar, New Delhi - 110063</p>
            </div>
            <iframe
              title="DMS Aarohi Musical Society Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.7898437261817!2d77.09900017549762!3d28.66816267563887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03ea2e7b8e3b%3A0x8d3f5b73a2e32f3c!2sPaschim%20Vihar%2C%20New%20Delhi%2C%20Delhi%20110063!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </ScrollReveal>

      </div>
    </>
  );
}

export default ContactPage;

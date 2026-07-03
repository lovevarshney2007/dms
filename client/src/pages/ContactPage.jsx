import { useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";
import { submitForm } from "../lib/api";

const contactDetails = [
  {
    label: "Email",
    value: "dmsaarohi@gmail.com",
    href: "mailto:dmsaarohi@gmail.com",
    desc: "Write to us anytime - we reply within 24 hours.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Phone / WhatsApp",
    value: "+91-9810225442",
    href: "tel:+919810225442",
    desc: "Call or WhatsApp us Mon-Sat, 10 AM - 7 PM.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12 19.79 19.79 0 0 1 1.07 3.37a2 2 0 0 1 2-1.37h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Office Address",
    value: "A5/272, Paschim Vihar, New Delhi - 110063",
    href: "https://maps.google.com/?q=Paschim+Vihar+New+Delhi+110063",
    desc: "Visit our registered office in Paschim Vihar.",
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
    href: "https://www.facebook.com/dms.aarohi",
    color: "bg-blue-600 hover:bg-blue-700",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/dmsaarohi",
    color: "bg-stone-900 hover:bg-stone-800",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dms-aarohi-45408273/",
    color: "bg-blue-700 hover:bg-blue-800",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitForm("/api/forms/contact", form);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      alert("Error sending message: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Page Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Get In Touch
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 mb-4">
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Us
              </span>
            </h1>
            <p className="text-base text-stone-600 leading-relaxed">
              Have questions about registration, auditions, or events? We'd love to hear from you!
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Info + Form Grid */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          
          {/* Left: Contact Details */}
          <ScrollReveal direction="left">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-5">Reach Us Directly</h2>
              
              {contactDetails.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Office Address" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-0.5">{item.label}</p>
                    <p className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors text-sm sm:text-base mb-1">{item.value}</p>
                    <p className="text-xs text-stone-500">{item.desc}</p>
                  </div>
                </a>
              ))}

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Follow Us On</p>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      title={social.label}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-sm ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <p className="mt-4 text-xs text-stone-400">Stay updated with our latest events, auditions, and performances.</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact Form */}
          <ScrollReveal direction="right">
            <div className="bg-white rounded-[2rem] border border-stone-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden relative">
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600"></div>
              {/* Decorative background blobs */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-orange-100/60 rounded-full blur-[60px] pointer-events-none"></div>
              
              <div className="p-7 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">Send a Message</h2>
                    <p className="text-[11px] text-stone-400 font-medium">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 text-4xl shadow-sm animate-bounce">
                      ✓
                    </div>
                    <p className="font-bold text-xl text-stone-900">Message Sent!</p>
                    <p className="text-stone-500 mt-2 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-600 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          required
                          className="w-full rounded-xl border-2 border-stone-100 bg-stone-50/80 px-4 py-3 text-sm font-medium text-stone-900 transition-all placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-600 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full rounded-xl border-2 border-stone-100 bg-stone-50/80 px-4 py-3 text-sm font-medium text-stone-900 transition-all placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-600 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="w-full rounded-xl border-2 border-stone-100 bg-stone-50/80 px-4 py-3 text-sm font-medium text-stone-900 transition-all placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-600 mb-1.5">Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full rounded-xl border-2 border-stone-100 bg-stone-50/80 px-4 py-3 text-sm font-medium text-stone-900 transition-all focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10 cursor-pointer"
                      >
                        <option value="">Select a topic...</option>
                        <option value="Registration Query">Registration Query</option>
                        <option value="Audition Info">Audition Info</option>
                        <option value="Event Query">Event Query</option>
                        <option value="Sponsorship">Sponsorship</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-600 mb-1.5">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="How can we help you?"
                        required
                        rows="4"
                        className="w-full resize-none rounded-xl border-2 border-stone-100 bg-stone-50/80 px-4 py-3 text-sm font-medium text-stone-900 transition-all placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-400/10"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold py-4 hover:shadow-[0_8px_20px_rgba(234,88,12,0.35)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Google Map - DMS Aarohi Paschim Vihar */}
        <ScrollReveal direction="up">
          <div className="rounded-[2rem] overflow-hidden shadow-xl border border-stone-100">
            <div className="bg-white p-5 border-b border-stone-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-stone-900">Our Office Location</h2>
                <p className="text-stone-500 text-sm">A5/272, Paschim Vihar, New Delhi - 110063</p>
              </div>
            </div>
            <iframe
              title="DMS Aarohi Musical Society - Paschim Vihar, New Delhi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.789843726!2d77.09900017549762!3d28.66816267563887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03b4a879e7c7%3A0x3d3b8c58a0d89b9c!2sPaschim%20Vihar%2C%20New%20Delhi%2C%20Delhi%20110063!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
              width="100%"
              height="420"
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

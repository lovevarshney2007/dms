import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const PHONE   = "+91 9810225442";
const EMAIL   = "dmsaarohi@gmail.com";
const ADDRESS = "A5, 272, Paschim Vihar, New Delhi";

export default function ContactSection() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-50px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const field = { width: "100%", padding: "11px 14px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, fontFamily: "'Inter',sans-serif", outline: "none", transition: "border-color 0.2s", background: "#fff", boxSizing: "border-box" };
  const lbl   = { display: "block", fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" };

  return (
    <section id="contact" style={{ background: "#fff", padding: "88px 0" }} ref={ref}>
      <div className="wrap">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          style={{ marginBottom: 52 }}>
          <div className="tag tag-gray">Contact</div>
          <h2 className="h2">Get in Touch with DMS Aarohi</h2>
        </motion.div>

        <div className="grid-2" style={{ alignItems: "start" }}>

          {/* Info col */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}>
            <p className="lead" style={{ marginBottom: 36 }}>
              Whether you want to perform on our stage, partner with us, volunteer for a cause, or simply know more — 
              we'd love to hear from you.
            </p>

            {[
              { label: "Phone",   val: PHONE,   href: `tel:+919810225442` },
              { label: "Email",   val: EMAIL,   href: `mailto:${EMAIL}` },
              { label: "Address", val: ADDRESS, href: "#" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 22, alignItems: "flex-start" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                  background: "var(--gray-100)", border: "1px solid #E5E7EB",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16,
                }}>
                  {i === 0 ? "📞" : i === 1 ? "✉️" : "📍"}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 3 }}>{c.label}</div>
                  <a href={c.href} style={{ fontSize: 14.5, color: "#111", fontWeight: 500, transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
                    onMouseLeave={e => e.currentTarget.style.color = "#111"}
                  >{c.val}</a>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 14 }}>Follow Us</div>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { lbl: "Facebook",  href: "https://www.facebook.com/dms.aarohi",      icon: "f" },
                  { lbl: "YouTube",   href: "https://www.youtube.com/@dmsaarohi5483",   icon: "▶" },
                  { lbl: "Instagram", href: "https://instagram.com/dmsaarohi",           icon: "⊛" },
                  { lbl: "Twitter",   href: "https://twitter.com/dmsaarohi",             icon: "✕" },
                ].map(s => (
                  <a key={s.lbl} href={s.href} target="_blank" rel="noopener noreferrer"
                    title={s.lbl}
                    style={{
                      width: 38, height: 38, borderRadius: 8,
                      background: "#F3F4F6", border: "1px solid #E5E7EB",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, color: "#4B5563", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--gold)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#F3F4F6"; e.currentTarget.style.color = "#4B5563"; e.currentTarget.style.borderColor = "#E5E7EB"; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Registration no */}
            <div style={{ marginTop: 36, padding: "16px 18px", background: "#FAFAFA", border: "1px solid #E5E7EB", borderRadius: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 6 }}>Registered Under</div>
              <div style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.6 }}>
                Societies Registration Act XXI of 1860<br/>
                <span style={{ fontWeight: 600, color: "#111" }}>Regd. No. SOCIETY/WEST/2013/8900890</span><br/>
                12A &amp; 80G — Income Tax Act, 1961
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.18 }}
            style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 14, padding: "36px 30px" }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>✅</div>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, color: "var(--green)", marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: "#6B7280", fontSize: 14 }}>We'll get back to you within 24–48 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 2 }}>Send a Message</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={lbl}>Name</label>
                    <input name="name" value={form.name} onChange={handle} required placeholder="Your name" style={field}
                      onFocus={e => e.target.style.borderColor = "var(--gold)"}
                      onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
                  </div>
                  <div>
                    <label style={lbl}>Phone</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" style={field}
                      onFocus={e => e.target.style.borderColor = "var(--gold)"}
                      onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handle} required placeholder="your@email.com" style={field}
                    onFocus={e => e.target.style.borderColor = "var(--gold)"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
                </div>
                <div>
                  <label style={lbl}>Message</label>
                  <textarea name="message" value={form.message} onChange={handle} required rows={4}
                    placeholder="How can we help you?" style={{ ...field, resize: "vertical", minHeight: 100 }}
                    onFocus={e => e.target.style.borderColor = "var(--gold)"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
                </div>
                <button type="submit" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

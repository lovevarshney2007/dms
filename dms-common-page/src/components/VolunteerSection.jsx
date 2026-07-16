import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const NGO_URL = "https://dms-homepage.vercel.app/";

const ROLES = [
  { title: "Blood Donor",            desc: "Join our network and be available when a patient urgently needs your blood group." },
  { title: "Event Organiser",        desc: "Help set up and manage blood camps, clothing drives and awareness events on-ground." },
  { title: "Child Mentor / Tutor",   desc: "Spend a few hours a week teaching or supporting underprivileged children." },
  { title: "Elderly Care Visitor",   desc: "Visit senior citizens in care homes and provide company, care and support." },
  { title: "Social Media Volunteer", desc: "Help spread our mission online through content creation and awareness posts." },
  { title: "Logistics Support",      desc: "Assist in collecting, sorting and distributing donated goods to beneficiaries." },
];

export default function VolunteerSection() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="volunteer" style={{ background: "#fff", padding: "88px 0" }} ref={ref}>
      <div className="wrap">

        {/* Big CTA banner with real NGO photo */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
            height: 320,
            marginBottom: 56,
            border: "1px solid #E5E7EB",
          }}
        >
          <img src="/ngo/community-work.jpg" alt="DMS Aarohi community work"
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)" }} />
          <div style={{
            position: "relative", zIndex: 2, height: "100%",
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "0 48px",
          }}>
            <div className="tag" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", marginBottom: 14 }}>
              Volunteer
            </div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#fff", marginBottom: 14, maxWidth: 500, lineHeight: 1.15 }}>
              Your 2 Hours Can Change<br/>Someone's Life
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.7, maxWidth: 440, marginBottom: 28 }}>
              We welcome volunteers from all walks of life — students, professionals, retirees. 
              No matter your skill set, there's a meaningful role for you in our community.
            </p>
            <div>
              <a href={`${NGO_URL}#volunteer-cta`} target="_blank" rel="noopener noreferrer" className="btn btn-green">
                Sign Up to Volunteer →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Volunteer roles */}
        <motion.h3
          initial={{ opacity: 0 }} animate={inV ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.15 }}
          style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 16, color: "#6B7280", marginBottom: 22 }}
        >
          Ways you can contribute
        </motion.h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
          {ROLES.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.38, delay: 0.06 * i }}
              style={{
                padding: "20px 20px",
                borderRadius: 10,
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                transition: "border-color 0.2s, background 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#A8D5BA"; e.currentTarget.style.background = "var(--green-bg)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 14.5, marginBottom: 7, color: "#111" }}>{r.title}</div>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{r.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

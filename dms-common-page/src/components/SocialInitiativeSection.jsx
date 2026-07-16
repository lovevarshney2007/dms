import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const NGO_URL = "https://dms-homepage.vercel.app/";

// Real initiatives from DMS-Homepage codebase
const INITIATIVES = [
  { img: "/ngo/blood-camp.jpg",       tag: "Healthcare", title: "Blood Donation & Healthcare", desc: "Building a verified blood donor network and organizing camps to support Thalassemia patients and medical emergencies." },
  { img: "/ngo/child-education.jpg",  tag: "Education",  title: "Child Education Support",       desc: "Providing educational support and learning opportunities for underprivileged children in rural and urban communities." },
  { img: "/ngo/senior-citizen.jpg",   tag: "Welfare",    title: "Senior Citizen Welfare",        desc: "Supporting senior citizens through healthcare, social engagement, and dignity-preserving programmes." },
  { img: "/ngo/clothes-donation.jpg", tag: "Relief",     title: "Clothes & Essential Distribution", desc: "Collecting and distributing clothes and essential items to underprivileged families, especially during seasonal needs." },
  { img: "/gallery/g3.jpg",           tag: "Empowerment",title: "Beti Bachao Initiative",         desc: "Promoting the protection, education and empowerment of the girl child through awareness campaigns." },
  { img: "/gallery/g4.jpg",           tag: "Environment",title: "Environment Awareness",           desc: "Plantation drives, cleanliness campaigns and sustainable community initiatives." },
];

const NGOWORK = [
  { step: "01", title: "Identify Community Needs",    desc: "We work with local communities and volunteers to identify individuals needing immediate support." },
  { step: "02", title: "Plan & Organise Drives",       desc: "Our team coordinates donation drives, health camps, awareness campaigns and welfare activities." },
  { step: "03", title: "Deliver Meaningful Impact",    desc: "With the support of volunteers and donors, we create change through healthcare, education and environment." },
];

export default function SocialInitiativeSection() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="social-initiative" style={{ background: "#fff", padding: "88px 0" }} ref={ref}>
      <div className="wrap">

        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 52, display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <div>
            <div className="tag tag-green">Social Initiative</div>
            <h2 className="h2">
              Community Work<br/>
              <span className="accent-green">that Matters</span>
            </h2>
          </div>
          <div style={{ maxWidth: 400 }}>
            <p className="lead" style={{ marginBottom: 16 }}>
              14+ years of serving Delhi NCR communities — blood camps, child education, elderly care, clothes distribution and more.
            </p>
            <div className="flex-row">
              <a href={NGO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-green">Explore NGO →</a>
              <a href={`${NGO_URL}#volunteer-cta`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Volunteer Now</a>
            </div>
          </div>
        </motion.div>

        {/* 3-col photo grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 18, marginBottom: 64 }}>
          {INITIATIVES.map((it, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 22 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.42, delay: 0.07 * i }}
              className="card"
            >
              <div style={{ height: 190, overflow: "hidden" }}>
                <img src={it.img} alt={it.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              <div style={{ padding: "18px 20px" }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
                  color: "var(--green)", background: "var(--green-bg)",
                  padding: "3px 10px", borderRadius: 100, marginBottom: 8, display: "inline-block",
                }}>
                  {it.tag}
                </span>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15.5, marginBottom: 7 }}>{it.title}</h4>
                <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.65 }}>{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How We Work — 3 steps horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ background: "var(--green-bg)", borderRadius: 16, padding: "44px 40px", border: "1px solid #A8D5BA" }}
        >
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1.3rem", marginBottom: 32, color: "var(--green)" }}>
            How We Work
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 32 }}>
            {NGOWORK.map((w, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: "var(--green)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 12,
                }}>
                  {w.step}
                </div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14.5, marginBottom: 5 }}>{w.title}</div>
                  <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.65 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

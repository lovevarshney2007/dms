import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Real team members from both DMS-main and DMS-Homepage
const CORE = [
  { img: "/team/pankaj-mathur.jpg",   name: "Pankaj Mathur",    role: "Founder President" },
  { img: "/team/bhawna-bhatt.jpg",    name: "Dr. Bhawna Bhatt", role: "General Secretary" },
  { img: "/team/pratibha-asthana.jpg",name: "Pratibha Asthana", role: "Secretary" },
  { img: "/team/mohit-data.jpg",      name: "Mohit Data",       role: "Executive Member" },
  { img: "/team/rb-mathur.jpg",       name: "R.B. Mathur",      role: "Treasurer" },
];

const PATRONS = [
  { img: "/patrons/Ashok_Srivastava (Chief Patron).png",  name: "Ashok Srivastava",   role: "Chief Patron" },
  { img: "/patrons/NALINI KAMALNI.jpg",                    name: "Nalini Kamalni",     role: "Patron" },
  { img: "/patrons/RADHIKA CHOPRA.jpg",                    name: "Radhika Chopra",     role: "Patron" },
  { img: "/patrons/KUMAR VISHU.jpg",                       name: "Kumar Vishu",        role: "Patron" },
  { img: "/patrons/G.B. Mathur (Patron).png",              name: "G.B. Mathur",        role: "Patron" },
  { img: "/patrons/Kuldeep Bhardwaj (Patron).jpg",         name: "Kuldeep Bhardwaj",  role: "Patron" },
];

function PersonCard({ p, delay, inV }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      style={{
        background: "#fff", border: "1px solid #E5E7EB",
        borderRadius: 12, overflow: "hidden", textAlign: "center",
        transition: "box-shadow 0.25s, transform 0.25s",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ height: 180, background: "#F9FAFB", overflow: "hidden" }}>
        <img src={p.img} alt={p.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.4s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          onError={e => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.style.background = "#F3F4F6";
          }}
        />
      </div>
      <div style={{ padding: "14px 12px" }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14.5, marginBottom: 3 }}>{p.name}</div>
        <div style={{ fontSize: 12, color: "var(--gold)", fontWeight: 600 }}>{p.role}</div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="team" style={{ background: "var(--gray-50)", padding: "88px 0" }} ref={ref}>
      <div className="wrap">

        {/* Core team */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}>
          <div className="tag tag-gray">Core Team</div>
          <h2 className="h2">The People Behind DMS Aarohi</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 14, marginBottom: 64 }}>
          {CORE.map((p, i) => <PersonCard key={i} p={p} delay={0.06 * i} inV={inV} />)}
        </div>

        {/* Patrons divider */}
        <hr style={{ marginBottom: 52 }} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: 36 }}>
          <div className="tag tag-gold">Our Patrons</div>
          <h3 className="h3" style={{ fontSize: "1.4rem", color: "#111" }}>Eminent Patrons Who Believe in Our Mission</h3>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px,1fr))", gap: 14 }}>
          {PATRONS.map((p, i) => <PersonCard key={i} p={p} delay={0.06 * i + 0.2} inV={inV} />)}
        </div>

      </div>
    </section>
  );
}

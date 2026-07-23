import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Society registration info from the actual website
const AIMS = [
  "Promote Light Music and Indian Classical Music",
  "Arrange Concerts and Performances",
  "Collaborate with Cultural Organisations",
  "Support Concerts for the Physically Challenged & Elderly",
  "Promote Young Talent with Platforms to Showcase Skills",
];

const STATS = [
  { n: "2013", label: "Year Founded" },
  { n: "4+", label: "Competition Seasons" },
  { n: "14+", label: "Years of Service" },
  { n: "1000+", label: "Lives Impacted" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" className="section" style={{ background: "#fff" }} ref={ref}>
      <div className="wrap">

        {/* Stats bar at top */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 0,
            marginBottom: 72,
            border: "1px solid #E5E7EB",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: "28px 20px", textAlign: "center",
              borderRight: i < STATS.length - 1 ? "1px solid #E5E7EB" : "none",
              background: i % 2 === 0 ? "#fff" : "#FAFAFA",
            }}>
              <div className="big-n" style={{ color: i < 2 ? "var(--gold-lt)" : "var(--green-lt)", marginBottom: 6 }}>{s.n}</div>
              <div style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main content — two columns */}
        <div className="grid-2">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inV ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ position: "relative" }}
          >
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #E5E7EB" }}>
              <img src="/images/about_group.jpg" alt="DMS Aarohi team at event"
                style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }} />
            </div>
            {/* Small badge below */}
            <div style={{
              position: "absolute", bottom: -18, right: 20,
              background: "#fff", border: "1px solid #E5E7EB",
              borderRadius: 10, padding: "12px 18px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <img src="/tal_logo1.png" alt="Talent Hunt Logo" style={{ height: 32, objectFit: "contain" }} />
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 13, color: "#111" }}>Voice of Delhi NCR</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>Season 4 — Open Now</div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inV ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ paddingTop: 8 }}
          >
            <div className="tag tag-gray">About Us</div>
            <h2 className="h2" style={{ marginBottom: 16 }}>
              DMS Aarohi — Music Society &amp; NGO
            </h2>
            <p className="lead" style={{ marginBottom: 20 }}>
              DMS Aarohi is a voluntary, non-profit organisation registered under the Societies Registration Act XXI of 1860
              <em style={{ color: "#6B7280" }}> (Regd. No. SOCIETY/WEST/2013/8900890)</em> and covered under 12A &amp; 80G of the Income Tax Act.
            </p>
            <p className="lead" style={{ marginBottom: 24 }}>
              We are devoted to the dissemination and enjoyment of music — specially Indian Classical music —
              while also running active social welfare programmes across Delhi NCR.
            </p>

            {/* Aims */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 12 }}>Our Aims &amp; Objectives</div>
              {AIMS.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 9 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", marginTop: 8, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.5 }}>{a}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="https://dms-ten-gamma.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-gold">Music Society →</a>
              <a href="https://dms-ngo.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-green">Social Initiative →</a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

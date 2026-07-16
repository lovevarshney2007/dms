import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TALENT_URL = "https://dms-ten-gamma.vercel.app/";

export default function RegistrationSection() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-50px" });

  const STEPS = [
    { n: "01", title: "Visit the Music Society website",  desc: "Click the button below to open the DMS Aarohi Talent Hunt portal." },
    { n: "02", title: "Choose your singing category",     desc: "Classical, Bollywood, Folk, Ghazal, Sufi or Open — find your style." },
    { n: "03", title: "Fill the registration form",       desc: "Enter your details and optionally upload a short audio/video clip." },
    { n: "04", title: "Await confirmation from our team", desc: "We'll review and contact you with your audition details shortly." },
  ];

  return (
    <section id="registration" style={{ background: "var(--gray-50)", padding: "88px 0" }} ref={ref}>
      <div className="wrap">
        <div className="grid-2">

          {/* Photo col */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 14, border: "1px solid #E5E7EB" }}>
              <img src="/images/TalentHunt1.jpg" alt="DMS Talent Hunt Stage"
                style={{ width: "100%", height: 260, objectFit: "cover" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ borderRadius: 10, overflow: "hidden", height: 130, border: "1px solid #E5E7EB" }}>
                <img src="/images/show2.jpg" alt="Show" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ borderRadius: 10, padding: "18px", background: "#FDF8ED", border: "1px solid #E8D5A3", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 28, color: "var(--gold)", lineHeight: 1 }}>4+</div>
                <div style={{ fontSize: 12.5, color: "#6B7280", marginTop: 6 }}>Seasons of<br/>Voice of Delhi NCR</div>
              </div>
            </div>
          </motion.div>

          {/* Steps col */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="tag tag-gold">Registration</div>
            <h2 className="h2" style={{ marginBottom: 14 }}>
              Ready to Perform?<br/>
              <span className="accent-gold">Here's How to Apply</span>
            </h2>
            <p className="lead" style={{ marginBottom: 32 }}>
              Registrations for Season 4 are open. Open to singers of all ages from Delhi, Noida, Gurgaon, Ghaziabad and the entire NCR.
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {STEPS.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }} animate={inV ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.38, delay: 0.18 + i * 0.08 }}
                  style={{ display: "flex", gap: 16, paddingBottom: i < STEPS.length - 1 ? 24 : 0 }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%",
                      background: "var(--gold)", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 12,
                    }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div style={{ width: 1, flex: 1, background: "#E5E7EB", marginTop: 6 }} />}
                  </div>
                  <div style={{ paddingTop: 5 }}>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 14.5, marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <a href={`${TALENT_URL}register`} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                Register for Talent Hunt →
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

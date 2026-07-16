import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TALENT_URL = "https://dms-ten-gamma.vercel.app/";

export default function TalentHuntSection() {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="talent-hunt" style={{ background: "var(--gray-50)", padding: "88px 0" }} ref={ref}>
      <div className="wrap">

        {/* Full-width top banner — photo left, text right */}
        <div className="grid-2" style={{ marginBottom: 56 }}>

          {/* Photos mosaic */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inV ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div style={{ gridColumn: "1/-1", borderRadius: 14, overflow: "hidden", height: 220 }}>
              <img src="/images/current_event.jpg" alt="Voice of Delhi NCR Season 4"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", height: 150 }}>
              <img src="/images/event1.jpg" alt="DMS Show"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", height: 150 }}>
              <img src="/images/media2.jpg" alt="DMS Performance"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inV ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="tag tag-gold">Talent Hunt</div>
            <h2 className="h2" style={{ marginBottom: 14 }}>
              Voice of Delhi NCR —<br/>
              <span className="accent-gold">Season 4</span>
            </h2>
            <p className="lead" style={{ marginBottom: 18 }}>
              DMS Aarohi's flagship singing competition platform. With Reality shows becoming the current flavour of television and stage, 
              <strong> Voice of Delhi NCR</strong> serves as a wonderful platform for talent which otherwise would not have a chance to showcase itself.
            </p>
            <p className="lead" style={{ marginBottom: 28 }}>
              Open to all age groups across Delhi NCR. Classical, Bollywood, Folk, Ghazal, Sufi — 
              every voice is welcome at our stage.
            </p>

            {/* Category chips */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {["Classical", "Bollywood", "Folk", "Ghazal", "Sufi", "Open Category"].map(c => (
                <span key={c} style={{
                  padding: "5px 12px", borderRadius: 100,
                  background: "#FDF8ED", border: "1px solid #E8D5A3",
                  fontSize: 12.5, fontWeight: 600, color: "var(--gold)",
                }}>
                  {c}
                </span>
              ))}
            </div>

            <div className="flex-row">
              <a href={`${TALENT_URL}register`} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                Register Now →
              </a>
              <a href={TALENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Explore Music Society
              </a>
            </div>
          </motion.div>
        </div>

        {/* President's quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{
            background: "#fff", border: "1px solid #E5E7EB",
            borderRadius: 14, padding: "36px 40px",
            display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center",
          }}
        >
          <img src="/team/president-speech.jpg" alt="President DMS Aarohi"
            style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid #E8D5A3" }} />
          <div>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, fontStyle: "italic", marginBottom: 10 }}>
              "DMS AAROHI has grown as one of the finest Musical Societies not only in Delhi-NCR but also in other states of India. 
              We welcome all our participants and hope to share good times together in music."
            </p>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Pankaj Mathur</div>
            <div style={{ fontSize: 12, color: "#9CA3AF" }}>Founder President, DMS Aarohi</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

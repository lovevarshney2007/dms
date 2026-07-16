const TALENT_URL = "https://dms-ten-gamma.vercel.app/";
const NGO_URL    = "https://dms-homepage.vercel.app/";

const COLS = {
  "Music Society": [
    { l: "About DMS Aarohi",  h: TALENT_URL },
    { l: "Shows & Events",    h: `${TALENT_URL}shows` },
    { l: "Success Stories",   h: `${TALENT_URL}success-stories` },
    { l: "Gallery",           h: `${TALENT_URL}gallery` },
    { l: "Contact",           h: `${TALENT_URL}contact` },
    { l: "Register Now",      h: `${TALENT_URL}register` },
  ],
  "Social Initiative": [
    { l: "About NGO",         h: NGO_URL },
    { l: "Blood Donation",    h: `${NGO_URL}initiatives/blood-donation` },
    { l: "Child Education",   h: `${NGO_URL}initiatives/child-education` },
    { l: "Elderly Care",      h: `${NGO_URL}initiatives/senior-citizen` },
    { l: "Volunteer Now",     h: `${NGO_URL}#volunteer-cta` },
  ],
  "Quick Links": [
    { l: "Home",              h: "#home",              ext: false },
    { l: "About",             h: "#about",             ext: false },
    { l: "Talent Hunt",       h: "#talent-hunt",       ext: false },
    { l: "Social Initiative", h: "#social-initiative", ext: false },
    { l: "Team",              h: "#team",              ext: false },
    { l: "Contact",           h: "#contact",           ext: false },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#111827", color: "#D1D5DB" }}>
      <div className="wrap" style={{ padding: "60px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 44, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="/logo.png" alt="DMS Aarohi"
                style={{ height: 34, objectFit: "contain", opacity: 0.9 }} />
              <div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 15.5, color: "#fff" }}>DMS Aarohi</div>
                <div style={{ fontSize: 9.5, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B7280" }}>Music & Social</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "#9CA3AF", marginBottom: 20, maxWidth: 230 }}>
              Registered Musical Society & NGO under the Govt. of Delhi since 2013. 
              Serving communities through music and social welfare.
            </p>
            <div style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.6 }}>
              📍 A5, 272, Paschim Vihar, New Delhi<br/>
              📞 +91 9810225442<br/>
              ✉️ dmsaarohi@gmail.com
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([grp, links]) => (
            <div key={grp}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 11.5, letterSpacing: "1.5px", textTransform: "uppercase", color: "#D4A017", marginBottom: 16 }}>
                {grp}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {links.map((lk, i) => (
                  <li key={i}>
                    <a href={lk.h}
                      target={lk.ext !== false ? "_blank" : undefined}
                      rel={lk.ext !== false ? "noopener noreferrer" : undefined}
                      style={{ fontSize: 13.5, color: "#9CA3AF", transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                      onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}
                    >
                      {lk.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ height: 1, background: "#374151", marginBottom: 24 }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13, color: "#6B7280" }}>
            © {new Date().getFullYear()} DMS Aarohi. All rights reserved. &nbsp;·&nbsp; Regd. No. SOCIETY/WEST/2013/8900890
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href={TALENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ padding: "7px 16px", fontSize: 12.5 }}>Music Society ↗</a>
            <a href={NGO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-green" style={{ padding: "7px 16px", fontSize: 12.5 }}>Social Initiative ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

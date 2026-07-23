import { motion } from "framer-motion";

const TALENT_URL = "https://dms-ten-gamma.vercel.app/";
const NGO_URL = "https://dms-ngo.vercel.app/";

export default function Portal() {
  return (
    <div className="app-container">
      {/* Background Effects */}
      <div className="bg-effects">
        <div className="orb-music" />
        <div className="orb-ngo" />
        <div className="noise-overlay" />
      </div>

      {/* Top Bar */}
      <header className="top-nav">
        <motion.div
          className="brand"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="brand-logo-wrap">
            <div className="brand-logo-ring" />
            <img src="/logo.png" alt="DMS Aarohi" className="brand-logo" />
          </div>
          <div className="brand-text">
            <h1>DMS Aarohi</h1>
            <p>Music &middot; Community &middot; Impact</p>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="cards-container">

          {/* Card 1: Music Society */}
          <motion.a
            href={TALENT_URL}
            className="portal-card card-music"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-image-wrap">
              <img src="/images/event1.jpg" alt="DMS Talent Hunt" className="card-image" />
              <div className="card-overlay" />
              <div className="card-badge">
                <span className="badge-dot" />
                Music Society
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title">
                Voice of <br />
                <span>Delhi NCR</span>
              </h2>
              <p className="card-desc">
                Delhi's premier singing competition platform. Classical, Bollywood, Folk, Ghazal &amp; more — every voice finds its stage at DMS Aarohi.
              </p>
              <div className="card-btn">
                Explore Talent Hunt
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.a>

          {/* Card 2: Social Initiative */}
          <motion.a
            href={NGO_URL}
            className="portal-card card-ngo"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card-image-wrap">
              <img src="/ngo/child-education.jpg" alt="DMS NGO" className="card-image" />
              <div className="card-overlay" />
              <div className="card-badge">
                <span className="badge-dot" />
                Social Initiative
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title">
                Community <br />
                <span>That Cares</span>
              </h2>
              <p className="card-desc">
                14+ years of grassroots impact across Delhi NCR — blood donation camps, child education, elderly welfare &amp; empowerment drives.
              </p>
              <div className="card-btn">
                Explore NGO
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.a>

        </div>
      </main>
    </div>
  );
}

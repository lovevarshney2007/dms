import { useState } from "react";
import {
  ArrowRight,
  HeartHandshake,
  MapPin,
  Mic2,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import "./index.css";

const TALENT_URL = "https://dms-ten-gamma.vercel.app/";
const NGO_URL = "https://dms-ngo.vercel.app/";

const userPaths = [
  {
    id: "talent",
    eyebrow: "DMS Aarohi • Music Society",
    badge: "Auditions Open",
    title: "Register for Talent Hunt",
    description:
      "For singers, vocalists, and stage performers participating in Voice of Delhi NCR and upcoming live concerts.",
    href: `${TALENT_URL}register`,
    portalHref: TALENT_URL,
    cta: "Register for Auditions",
    portalCta: "Explore Music Portal",
    icon: Mic2,
    accent: "gold",
    tagline: "Voice of Delhi NCR — Season 4",
    points: [
      "Vocal Auditions & Competitions",
      "Live Stage & Concert Platforms",
      "Mentorship & Recognition",
    ],
  },
  {
    id: "social",
    eyebrow: "DMS Aarohi • Charity NGO",
    badge: "Govt. Registered",
    title: "Join Social Initiatives",
    description:
      "For volunteers, donors, and supporters serving communities through blood camps, child education, and care drives.",
    href: `${NGO_URL}#volunteer-cta`,
    portalHref: NGO_URL,
    cta: "Join as Volunteer / Donor",
    portalCta: "Explore NGO Portal",
    icon: HeartHandshake,
    accent: "green",
    tagline: "Community Service & Welfare",
    points: [
      "Voluntary Blood Donation Camps",
      "Underprivileged Child Education",
      "Elderly Care & Festive Drives",
    ],
  },
];

function App() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <main className="choice-page">
      {/* Background ambient lighting orbs */}
      <div className="ambient-glow ambient-glow-gold" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-green" aria-hidden="true" />

      <section className="choice-shell">
        {/* Sleek Professional Brand Header */}
        <header className="choice-header">
          <a href="/" className="brand" aria-label="DMS Aarohi Homepage">
            <div className="brand-logo-wrap">
              <img src="/logo.png" alt="DMS Aarohi Logo" />
            </div>
            <div className="brand-text">
              <strong>DMS AAROHI</strong>
              <small>Registered Music & Charity Society</small>
            </div>
          </a>

          <div className="location-pill">
            <span className="live-dot" aria-hidden="true" />
            <MapPin size={15} aria-hidden="true" />
            <span>Delhi NCR, India</span>
          </div>
        </header>

        {/* Direct Showcase of Aesthetic Cards (No Intro Text / No Kicker Chips) */}
        <div className="choice-grid">
          {userPaths.map((path) => {
            const Icon = path.icon;

            return (
              <div
                key={path.id}
                className={`aesthetic-card aesthetic-card-${path.accent} ${hoveredCard === path.id ? "is-hovered" : ""
                  }`}
                onMouseEnter={() => setHoveredCard(path.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Accent Highlight Bar */}
                <div className="card-top-accent" />

                {/* Shimmer sweep effect */}
                <div className="card-shimmer" aria-hidden="true" />

                {/* Header Meta / Badges */}
                <div className="card-meta">
                  <span className="card-eyebrow">{path.eyebrow}</span>
                  <span className="card-badge">
                    <Sparkles size={12} aria-hidden="true" />
                    {path.badge}
                  </span>
                </div>

                {/* Main Content Area */}
                <div className="card-body">
                  <div className="card-header-row">
                    <div className="card-icon-halo">
                      <Icon size={28} className="card-icon" aria-hidden="true" />
                    </div>
                    <div className="card-tagline">{path.tagline}</div>
                  </div>

                  <h2 className="card-title">{path.title}</h2>
                  <p className="card-desc">{path.description}</p>

                  {/* Feature Highlights */}
                  <ul className="card-points">
                    {path.points.map((point) => (
                      <li key={point} className="card-point-item">
                        <CheckCircle2 size={15} className="point-icon" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA Area with Direct Link */}
                <div className="card-footer">
                  <a
                    href={path.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-main-btn"
                  >
                    <span>{path.cta}</span>
                    <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
                  </a>

                  <a
                    href={path.portalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-sub-link"
                  >
                    <span>{path.portalCta}</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;

const fs = require('fs');
let content = fs.readFileSync('client/src/pages/musicSociety/MusicSocietyTalentsPage.jsx', 'utf8');

// Add useState, useEffect
content = content.replace(
  'import { Link } from "react-router-dom";',
  'import { useState, useEffect } from "react";\nimport { Link } from "react-router-dom";'
);

// Remove static imports
content = content.replace(/import \{ qualifiedContestants, successStories, performancesGallery \} from "\.\.\/\.\.\/data\/siteContent";\n/, '');

// Add state and fetch
content = content.replace(
  'function MusicSocietyTalentsPage() {',
  'function MusicSocietyTalentsPage() {\n  const [qualifiedContestants, setQualifiedContestants] = useState([]);\n  const [successStories, setSuccessStories] = useState([]);\n  const [performancesGallery, setPerformancesGallery] = useState([]);\n\n  useEffect(() => {\n    Promise.all([\n      fetch(import.meta.env.VITE_API_URL + "/api/content/qualified-contestant").then(r => r.json()),\n      fetch(import.meta.env.VITE_API_URL + "/api/content/success-story").then(r => r.json()),\n      fetch(import.meta.env.VITE_API_URL + "/api/content/gallery").then(r => r.json())\n    ]).then(([qc, ss, pg]) => {\n      setQualifiedContestants(qc);\n      setSuccessStories(ss);\n      setPerformancesGallery(pg.filter(g => g.subtitle === "Video" || g.subtitle === "Gallery" || !g.subtitle));\n    }).catch(console.error);\n  }, []);\n'
);

// Map top talent
content = content.replace(
  'const topTalent = qualifiedContestants[0]; // Aarav Sharma',
  'const topTalent = qualifiedContestants[0];'
);

// Add null check for topTalent
content = content.replace(
  '{/* 1. Featured Talent of the Month */}',
  '{/* 1. Featured Talent of the Month */}\n      {topTalent && ('
);
// We need to close the `)` after the ScrollReveal of Featured Talent.
content = content.replace(
  /<\/ScrollReveal>(\s*\{\/\*\ 2\.\ Qualified Contestants\ \*\/\})/s,
  '</ScrollReveal>\n      )}$1'
);

// Map topTalent properties
content = content.replace(/topTalent\.name/g, 'topTalent.title');
content = content.replace(/topTalent\.city/g, 'topTalent.subtitle');
content = content.replace(/topTalent\.image/g, 'topTalent.imageUrl');

// Map qualifiedContestants array inside the grid
content = content.replace(/user\.name/g, 'user.title');
content = content.replace(/user\.city/g, 'user.subtitle');
content = content.replace(/user\.image/g, 'user.imageUrl');
content = content.replace(/user\.status/g, 'user.subtitle'); // Fallback

// Map successStories array
content = content.replace(/story\.name/g, 'story.title');
content = content.replace(/story\.achievement/g, 'story.subtitle');
content = content.replace(/story\.description/g, 'story.description');
content = content.replace(/story\.image/g, 'story.imageUrl');

// Map performancesGallery
content = content.replace(/perf\.image/g, 'perf.imageUrl');
content = content.replace(/perf\.title/g, 'perf.title');
content = content.replace(/perf\.type/g, 'perf.subtitle'); // subtitle usually holds "Video" or "Gallery"

fs.writeFileSync('client/src/pages/musicSociety/MusicSocietyTalentsPage.jsx', content);
console.log("Updated MusicSocietyTalentsPage.jsx");

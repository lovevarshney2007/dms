const fs = require('fs');
let content = fs.readFileSync('client/src/pages/musicSociety/MusicSocietyTalentsPage.jsx', 'utf8');

content = content.replace(
  'import { Link } from "react-router-dom";\nimport { qualifiedContestants, successStories, performancesGallery } from "../../data/siteContent";',
  'import { useState, useEffect } from "react";\nimport { Link } from "react-router-dom";\nimport { performancesGallery } from "../../data/siteContent";'
);

const fallbackQC = [
  { name: "Adaa", status: "Grand Finalist", city: "Delhi NCR", category: "Junior", image: "/seasons/adaa.png", score: "98.5" },
  { name: "Arijit", status: "Grand Finalist", city: "Delhi NCR", category: "Senior", image: "/seasons/arijit.png", score: "96.0" }
];
const fallbackSS = [
  { name: "Peehu Srivastava", achievement: "Winner - Season 1 (2018)", description: "Voice of Delhi NCR Season 1 Winner. Rising Star on Colors TV and Indian Idol Jr. Mega Finalist on Sony TV. Now Brand Ambassador of DMS Aarohi.", image: "/team/Peehu Srivastava (Brand Ambassador).png" }
];

content = content.replace(
  'function MusicSocietyTalentsPage() {',
  `const fallbackQC = ${JSON.stringify(fallbackQC)};\nconst fallbackSS = ${JSON.stringify(fallbackSS)};\n\nfunction MusicSocietyTalentsPage() {\n  const [qualifiedContestants, setQualifiedContestants] = useState(fallbackQC);\n  const [successStories, setSuccessStories] = useState(fallbackSS);\n\n  useEffect(() => {\n    Promise.all([\n      fetch(import.meta.env.VITE_API_URL + "/api/content/qualified-contestant").then(res => res.json()),\n      fetch(import.meta.env.VITE_API_URL + "/api/content/success-story").then(res => res.json())\n    ]).then(([qcData, ssData]) => {\n      if (qcData && qcData.length > 0) {\n        setQualifiedContestants(qcData.map(d => ({\n          name: d.title,\n          image: d.imageUrl || "/legacy/pa.jpg",\n          status: d.meta?.status || "Contestant",\n          city: d.meta?.city || "Delhi NCR",\n          category: d.meta?.category || "Open",\n          score: d.meta?.score || "0"\n        })));\n      }\n      if (ssData && ssData.length > 0) {\n        setSuccessStories(ssData.map(d => ({\n          name: d.title,\n          achievement: d.subtitle,\n          description: d.description,\n          image: d.imageUrl || "/legacy/about_group.png"\n        })));\n      }\n    }).catch(console.error);\n  }, []);\n`
);

content = content.replace(
  /const topTalent = qualifiedContestants\[0\].*?\n/,
  'const topTalent = qualifiedContestants[0];\n'
);

// We must also fix `{topTalent.name}` if `topTalent` might be undefined initially.
content = content.replace(
  /\{topTalent\.name\}/g,
  '{topTalent?.name}'
);
content = content.replace(
  /\{topTalent\.city\}/g,
  '{topTalent?.city}'
);
content = content.replace(
  /\{topTalent\.score\}/g,
  '{topTalent?.score}'
);
content = content.replace(
  /\{topTalent\.image\}/g,
  '{topTalent?.image}'
);

fs.writeFileSync('client/src/pages/musicSociety/MusicSocietyTalentsPage.jsx', content);
console.log("Updated MusicSocietyTalentsPage.jsx successfully.");

const fs = require('fs');
let content = fs.readFileSync('client/src/pages/musicSociety/MusicSocietyTalentsPage.jsx', 'utf8');

// Add useState, useEffect
content = content.replace(
  'import { Link } from "react-router-dom";',
  'import { useState, useEffect } from "react";\nimport { Link } from "react-router-dom";'
);

// We need to fetch qualified-contestant and success-story

content = content.replace(
  'function MusicSocietyTalentsPage() {',
  `function MusicSocietyTalentsPage() {
  const [qualifiedContestants, setQualifiedContestants] = useState([]);
  const [successStories, setSuccessStories] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(import.meta.env.VITE_API_URL + "/api/content/qualified-contestant").then(res => res.json()),
      fetch(import.meta.env.VITE_API_URL + "/api/content/success-story").then(res => res.json())
    ]).then(([qcData, ssData]) => {
      if (qcData && qcData.length > 0) {
        setQualifiedContestants(qcData.map(d => ({
          name: d.title,
          image: d.imageUrl || "/legacy/pa.jpg",
          status: d.meta?.status || "Contestant",
          city: d.meta?.city || "Delhi NCR",
          category: d.meta?.category || "Open",
          score: d.meta?.score || "0"
        })));
      } else {
        // Fallback to static if empty
        setQualifiedContestants(fallbackQC);
      }

      if (ssData && ssData.length > 0) {
        setSuccessStories(ssData.map(d => ({
          name: d.title,
          achievement: d.subtitle,
          description: d.description,
          image: d.imageUrl || "/legacy/about_group.png"
        })));
      } else {
        setSuccessStories(fallbackSS);
      }
    }).catch(console.error);
  }, []);
`
);

content = content.replace(
  'const topTalent = {',
  'const fallbackQC = [\n  { name: "Adaa", status: "Grand Finalist", city: "Delhi NCR", category: "Junior", image: "/seasons/adaa.png", score: "98.5" },\n  { name: "Arijit", status: "Grand Finalist", city: "Delhi NCR", category: "Senior", image: "/seasons/arijit.png" }\n];\nconst fallbackSS = [];\n  const topTalentStatic = {'
);

content = content.replace(
  'const topTalent = qualifiedContestants[0]; // If static array is used', // wait, originally there was just `const topTalent = { ... }`
  ''
);

// We should check what the original file looked like.

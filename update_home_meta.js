const fs = require('fs');
let content = fs.readFileSync('client/src/pages/HomePage.jsx', 'utf8');

// Add useState, useEffect
content = content.replace(
  'import { Link } from "react-router-dom";',
  'import { useState, useEffect } from "react";\nimport { Link } from "react-router-dom";'
);

content = content.replace('const daysUntilFinale', `const fallbackPatrons = [
  { name: "Ashok Srivastava", role: "Chief Patron", image: "/patrons/Ashok_Srivastava (Chief Patron).png" },
  { name: "Nalini Kamalni", role: "Patron", image: "/patrons/NALINI KAMALNI.jpg" },
  { name: "Radhika Chopra", role: "Patron", image: "/patrons/RADHIKA CHOPRA.jpg" },
  { name: "Kumar Vishu", role: "Patron", image: "/patrons/KUMAR VISHU.jpg" },
  { name: "G.B. Mathur", role: "Patron", image: "/patrons/G.B. Mathur (Patron).png" }
];
const fallbackQC = [
  { name: "Adaa", status: "Grand Finalist", city: "Delhi NCR", category: "Junior", image: "/seasons/adaa.png" },
  { name: "Arijit", status: "Grand Finalist", city: "Delhi NCR", category: "Senior", image: "/seasons/arijit.png" }
];

const daysUntilFinale`);

content = content.replace(
  'export default function HomePage() {',
  `export default function HomePage() {
  const [patrons, setPatrons] = useState(fallbackPatrons);
  const [qContestants, setQContestants] = useState(fallbackQC);

  useEffect(() => {
    Promise.all([
      fetch(import.meta.env.VITE_API_URL + "/api/content/patron").then(res => res.json()),
      fetch(import.meta.env.VITE_API_URL + "/api/content/qualified-contestant").then(res => res.json())
    ]).then(([pData, qcData]) => {
      if (pData && pData.length > 0) {
        setPatrons(pData.filter(d => !d.meta?.isTeam).map(d => ({
          name: d.title,
          role: d.subtitle,
          image: d.imageUrl
        })));
      }
      if (qcData && qcData.length > 0) {
        setQContestants(qcData.map(d => ({
          name: d.title,
          image: d.imageUrl,
          status: d.meta?.status || "Contestant",
          city: d.meta?.city || "Delhi NCR",
          category: d.meta?.category || "Open"
        })));
      }
    }).catch(console.error);
  }, []);
`
);

content = content.replace(
  '<TeamSliderRow members={patronsData} />',
  '<TeamSliderRow members={patrons} />'
);

content = content.replace(
  /qualifiedContestants\.slice/g,
  'qContestants.slice'
);

content = content.replace(
  /qualifiedContestants\.length/g,
  'qContestants.length'
);

fs.writeFileSync('client/src/pages/HomePage.jsx', content);
console.log("Updated HomePage.jsx with dynamic meta fetching.");

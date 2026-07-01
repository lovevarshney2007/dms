const fs = require('fs');
let content = fs.readFileSync('client/src/components/sections/TeamSection.jsx', 'utf8');

// Add useState, useEffect
content = content.replace(
  'import { teamData } from "../../data/siteContent";',
  'import { useState, useEffect } from "react";'
);

content = content.replace(
  'function TeamSection() {',
  `const fallbackTeam = [
  { name: "Pankaj Mathur", role: "Founder & President", image: "/team/Pankaj Mathur (Founder & President).JPG" },
  { name: "Dr. Bhawna Bhat", role: "General Secretary", image: "/team/Dr Bhawna Bhat (General Secretary).jpg" }
];

function TeamSection() {
  const [teamData, setTeamData] = useState(fallbackTeam);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/content/patron")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setTeamData(data.filter(d => d.meta?.isTeam).map(d => ({
            name: d.title,
            role: d.meta?.role || d.subtitle,
            image: d.imageUrl
          })));
        }
      })
      .catch(console.error);
  }, []);
`
);

fs.writeFileSync('client/src/components/sections/TeamSection.jsx', content);
console.log("Updated TeamSection.jsx with dynamic meta fetching.");

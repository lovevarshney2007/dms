const fs = require('fs');
let content = fs.readFileSync('client/src/components/sections/TeamSection.jsx', 'utf8');

content = content.replace(
  'import { teamData } from "../../data/siteContent";',
  'import { useState, useEffect } from "react";'
);

content = content.replace(
  'function TeamSection() {',
  'function TeamSection() {\n  const [teamData, setTeamData] = useState([]);\n\n  useEffect(() => {\n    fetch(import.meta.env.VITE_API_URL + "/api/content/patron")\n      .then(res => res.json())\n      .then(data => {\n        const mapped = data.map(p => ({ ...p, name: p.title, role: p.subtitle, image: p.imageUrl }));\n        setTeamData(mapped);\n      }).catch(console.error);\n  }, []);\n'
);

fs.writeFileSync('client/src/components/sections/TeamSection.jsx', content);
console.log("Updated TeamSection");

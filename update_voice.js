const fs = require('fs');
let content = fs.readFileSync('client/src/pages/VoiceOfDelhiNCRPage.jsx', 'utf8');

// Add useState, useEffect
content = content.replace(
  'import { useParams, Link } from "react-router-dom";',
  'import { useState, useEffect } from "react";\nimport { useParams, Link } from "react-router-dom";'
);

// Remove static seasons array definition
content = content.replace(/const seasons \= \[.*?\];\n\nfunction/s, 'function');

// Inside function, add state and fetch
content = content.replace(
  'function VoiceOfDelhiNCRPage() {',
  'function VoiceOfDelhiNCRPage() {\n  const [seasons, setSeasons] = useState([]);\n\n  useEffect(() => {\n    fetch(import.meta.env.VITE_API_URL + "/api/content/season")\n      .then(res => res.json())\n      .then(data => {\n        // Map CMS data to UI format\n        const mapped = data.map((item, i) => ({\n          ...item,\n          id: item._id || `season-${i+1}`,\n          status: i === data.length - 1 ? "grand-finale" : "completed",\n          color: "from-amber-500 to-orange-600",\n          lightBg: "from-amber-50 to-orange-50",\n          borderColor: "border-amber-200",\n          poster: item.imageUrl || "/legacy/poster.png",\n          highlights: []\n        }));\n        setSeasons(mapped);\n      })\n      .catch(err => console.error(err));\n  }, []);\n'
);

// Remove "Total Prize Money"
content = content.replace(
  '{ num: "₹1L+", label: "Total Prize Money" },',
  ''
);

fs.writeFileSync('client/src/pages/VoiceOfDelhiNCRPage.jsx', content);
console.log("Updated VoiceOfDelhiNCRPage.jsx");

const fs = require('fs');
let content = fs.readFileSync('client/src/pages/musicSociety/MusicSocietyShowsPage.jsx', 'utf8');

// Add useState, useEffect
content = content.replace(
  'import { Link } from "react-router-dom";',
  'import { useState, useEffect } from "react";\nimport { Link } from "react-router-dom";'
);

// Remove static pastShows
content = content.replace(/const pastShows \= \[.*?\];/s, '');

// Add state and fetch
content = content.replace(
  'function MusicSocietyShowsPage() {',
  'function MusicSocietyShowsPage() {\n  const [pastShows, setPastShows] = useState([]);\n\n  useEffect(() => {\n    fetch(import.meta.env.VITE_API_URL + "/api/content/competition")\n      .then(res => res.json())\n      .then(data => setPastShows(data))\n      .catch(err => console.error(err));\n  }, []);\n'
);

// Map image correctly in the JSX (since CMS uses imageUrl)
content = content.replace(/show\.image/g, 'show.imageUrl');
content = content.replace(/show\.date/g, 'show.year');
content = content.replace(/\{show\.tag\}/g, '{show.tag || "Cultural Event"}'); // fallback for tag
content = content.replace(/tagColors\[show\.tag\]/g, 'tagColors[show.tag || "Cultural Event"]');
content = content.replace(/\{show\.location\}/g, '{show.location || "Delhi NCR"}');

fs.writeFileSync('client/src/pages/musicSociety/MusicSocietyShowsPage.jsx', content);
console.log("Updated MusicSocietyShowsPage.jsx");

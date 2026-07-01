const fs = require('fs');
let content = fs.readFileSync('client/src/pages/musicSociety/MusicSocietyShowsPage.jsx', 'utf8');

// Add useState, useEffect
content = content.replace(
  'import { Link } from "react-router-dom";',
  'import { useState, useEffect } from "react";\nimport { Link } from "react-router-dom";'
);

content = content.replace('const pastShows = [', 'const fallbackShows = [');

content = content.replace(
  'function MusicSocietyShowsPage() {',
  `function MusicSocietyShowsPage() {
  const [shows, setShows] = useState(fallbackShows);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/content/competition")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map((d, i) => ({
            id: d._id || i,
            title: d.title,
            subtitle: d.subtitle,
            description: d.description,
            image: d.imageUrl || "/legacy/patrons.jpg",
            tag: d.meta?.tag || "Cultural Event",
            date: d.meta?.date || "TBD",
            location: d.meta?.location || "Delhi NCR"
          }));
          setShows(mapped);
        }
      })
      .catch(console.error);
  }, []);
`
);

content = content.replace(
  /pastShows\.map\(/g,
  'shows.map('
);

fs.writeFileSync('client/src/pages/musicSociety/MusicSocietyShowsPage.jsx', content);
console.log("Updated MusicSocietyShowsPage.jsx");

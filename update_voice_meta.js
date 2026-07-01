const fs = require('fs');
let content = fs.readFileSync('client/src/pages/VoiceOfDelhiNCRPage.jsx', 'utf8');

content = content.replace(
  'import { useParams, Link } from "react-router-dom";',
  'import { useState, useEffect } from "react";\nimport { useParams, Link } from "react-router-dom";'
);

content = content.replace('const seasons = [', 'const fallbackSeasons = [');

content = content.replace(
  'function VoiceOfDelhiNCRPage() {',
  `function VoiceOfDelhiNCRPage() {
  const [seasons, setSeasons] = useState(fallbackSeasons);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/content/season")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mappedSeasons = data.map((d, i) => ({
            id: \`season-\${i+1}\`,
            title: d.title,
            subtitle: d.subtitle,
            year: d.year,
            description: d.meta?.description || d.description,
            status: d.meta?.status || "completed",
            color: d.meta?.color || "from-amber-500 to-orange-600",
            lightBg: d.meta?.lightBg || "from-amber-50 to-orange-50",
            borderColor: d.meta?.borderColor || "border-amber-200",
            winner: d.meta?.winner || null,
            winnerImg: d.meta?.winnerImg || null,
            youtube: d.meta?.youtube || null,
            poster: d.meta?.poster || d.imageUrl || "/legacy/poster.png",
            grandFinale: d.meta?.grandFinale || null,
            venue: d.meta?.venue || null,
            highlights: d.meta?.highlights || []
          }));
          setSeasons(mappedSeasons.reverse()); // Because we sort by order ascending in DB, wait, no, the DB lists them in order 1, 2, 3, 4. In UI, Season 1 is first. So we don't reverse unless needed.
          setSeasons(mappedSeasons);
        }
      })
      .catch(console.error);
  }, []);
`
);

fs.writeFileSync('client/src/pages/VoiceOfDelhiNCRPage.jsx', content);
console.log("Updated VoiceOfDelhiNCRPage.jsx");

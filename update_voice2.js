const fs = require('fs');
let content = fs.readFileSync('client/src/pages/VoiceOfDelhiNCRPage.jsx', 'utf8');

// Add useState, useEffect
content = content.replace(
  'import { useParams, Link } from "react-router-dom";',
  'import { useState, useEffect } from "react";\nimport { useParams, Link } from "react-router-dom";'
);

// Rename static seasons to staticSeasons
content = content.replace('const seasons = [', 'const staticSeasons = [');

// Find function VoiceOfDelhiNCRPage
content = content.replace(
  'function VoiceOfDelhiNCRPage() {',
  `function VoiceOfDelhiNCRPage() {
  const [seasons, setSeasons] = useState(staticSeasons);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/content/season")
      .then(res => res.json())
      .then(data => {
        const mergedSeasons = [...staticSeasons];
        
        // Update existing static seasons with CMS data if matching by year
        data.forEach((cmsItem, idx) => {
          const matchIndex = mergedSeasons.findIndex(s => s.year === cmsItem.year);
          if (matchIndex !== -1) {
            mergedSeasons[matchIndex] = {
              ...mergedSeasons[matchIndex],
              title: cmsItem.title,
              subtitle: cmsItem.subtitle,
              description: cmsItem.description,
              poster: cmsItem.imageUrl || mergedSeasons[matchIndex].poster
            };
          } else {
            // New season added from CMS
            mergedSeasons.push({
              id: cmsItem._id || \`season-\${idx+1}\`,
              title: cmsItem.title,
              subtitle: cmsItem.subtitle,
              year: cmsItem.year,
              status: idx === data.length - 1 ? "grand-finale" : "completed",
              color: "from-amber-500 to-orange-600",
              lightBg: "from-amber-50 to-orange-50",
              borderColor: "border-amber-200",
              description: cmsItem.description,
              highlights: [],
              poster: cmsItem.imageUrl || "/legacy/poster.png"
            });
          }
        });

        // Ensure season 4 is always marked as grand-finale if it's the last, or whatever logic
        // But the static data already has status: "grand-finale" for season 4.
        
        setSeasons(mergedSeasons);
      })
      .catch(console.error);
  }, []);
`
);

fs.writeFileSync('client/src/pages/VoiceOfDelhiNCRPage.jsx', content);
console.log("Updated VoiceOfDelhiNCRPage.jsx");

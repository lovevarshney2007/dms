const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'musicSociety', 'MusicSocietyShowsPage.jsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Remove fallbackShows completely
code = code.replace(/\/\/ All real shows from dmsaarohi\.com website\nconst fallbackShows = \[\s*\{[\s\S]*?\n\];\n/, '');

// 2. Change initial state to empty array
code = code.replace(/const \[shows, setShows\] = useState\(fallbackShows\);/, 'const [shows, setShows] = useState([]);');

// 3. Update useEffect to only use CMS data
const oldUseEffect = `    fetch(import.meta.env.VITE_API_URL + "/api/content/competition")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map((d, i) => ({
            id: d._id || \`cms-\${i}\`,
            title: d.title,
            subtitle: d.subtitle,
            description: d.description,
            image: d.imageUrl || "/legacy/patrons.jpg",
            tag: d.meta?.tag || "Cultural Event",
            date: d.meta?.date || "TBD",
            location: d.meta?.location || "Delhi NCR"
          }));
          const cmsOnlyShows = mapped.filter((cmsShow) => {
            const cmsKey = cmsShow.title?.trim().toLowerCase();
            return cmsKey && !fallbackShows.some((show) => show.title.trim().toLowerCase() === cmsKey);
          });
          setShows([...fallbackShows, ...cmsOnlyShows]);
        }
      })
      .catch(console.error);`;

const newUseEffect = `    fetch(import.meta.env.VITE_API_URL + "/api/content/competition")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map((d, i) => ({
            id: d._id || \`cms-\${i}\`,
            title: d.title,
            subtitle: d.subtitle,
            description: d.description,
            image: d.imageUrl || "/legacy/patrons.jpg",
            tag: d.meta?.tag || "Cultural Event",
            date: d.meta?.date || "TBD",
            location: d.meta?.location || "Delhi NCR"
          }));
          // Sort by order or date if needed, but we'll just set it
          setShows(mapped);
        }
      })
      .catch(console.error);`;

code = code.replace(oldUseEffect, newUseEffect);

fs.writeFileSync(filePath, code);
console.log('MusicSocietyShowsPage.jsx updated to rely exclusively on CMS.');

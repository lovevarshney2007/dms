const fs = require('fs');
let content = fs.readFileSync('client/src/pages/HomePage.jsx', 'utf8');

// Remove static imports
content = content.replace('  patronsData,\n', '');
content = content.replace('  teamData, \n', '');

const effectStr = `
  const [qualifiedContestants, setQualifiedContestants] = useState([]);
  const [patrons, setPatrons] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(import.meta.env.VITE_API_URL + '/api/content/qualified-contestant').then(r => r.json()),
      fetch(import.meta.env.VITE_API_URL + '/api/content/patron').then(r => r.json())
    ]).then(([qc, pt]) => {
      setQualifiedContestants(qc);
      setPatrons(pt.map(p => ({ ...p, name: p.title, role: p.subtitle, image: p.imageUrl })));
    }).catch(console.error);
  }, []);
`;

content = content.replace(/const \[qualifiedContestants.*?\], \[\]\);\n/s, effectStr);
content = content.replace(/<TeamSliderRow members=\{patronsData\}/g, '<TeamSliderRow members={patrons}');

fs.writeFileSync('client/src/pages/HomePage.jsx', content);

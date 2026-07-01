const fs = require('fs');
let content = fs.readFileSync('client/src/pages/HomePage.jsx', 'utf8');

// We need to replace `function HomePage() {` with the state hook injection
content = content.replace(
  'function HomePage() {',
  `function HomePage() {
  const [patrons, setPatrons] = useState(fallbackPatrons);
  const [qContestants, setQContestants] = useState(fallbackQC);

  useEffect(() => {
    Promise.all([
      fetch(import.meta.env.VITE_API_URL + '/api/content/patron').then(res => res.json()),
      fetch(import.meta.env.VITE_API_URL + '/api/content/qualified-contestant').then(res => res.json())
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
          status: d.meta?.status || 'Contestant',
          city: d.meta?.city || 'Delhi NCR',
          category: d.meta?.category || 'Open'
        })));
      }
    }).catch(console.error);
  }, []);
`
);

fs.writeFileSync('client/src/pages/HomePage.jsx', content);
console.log("Fixed HomePage.jsx error");

const fs = require('fs');
let content = fs.readFileSync('client/src/pages/HomePage.jsx', 'utf8');

const fallbackVars = `
const fallbackPatrons = [
  { name: "Ashok Srivastava", role: "Chief Patron", image: "/patrons/Ashok_Srivastava (Chief Patron).png" },
  { name: "Nalini Kamalni", role: "Patron", image: "/patrons/NALINI KAMALNI.jpg" },
  { name: "Radhika Chopra", role: "Patron", image: "/patrons/RADHIKA CHOPRA.jpg" },
  { name: "Kumar Vishu", role: "Patron", image: "/patrons/KUMAR VISHU.jpg" },
  { name: "G.B. Mathur", role: "Patron", image: "/patrons/G.B. Mathur (Patron).png" }
];
const fallbackQC = [
  { name: "Adaa", status: "Grand Finalist", city: "Delhi NCR", category: "Junior", image: "/seasons/adaa.png" },
  { name: "Arijit", status: "Grand Finalist", city: "Delhi NCR", category: "Senior", image: "/seasons/arijit.png" }
];

function HomePage() {`;

if (!content.includes('const fallbackPatrons')) {
  content = content.replace('function HomePage() {', fallbackVars);
  fs.writeFileSync('client/src/pages/HomePage.jsx', content);
  console.log("Added fallbackPatrons and fallbackQC");
} else {
  console.log("Variables already exist");
}

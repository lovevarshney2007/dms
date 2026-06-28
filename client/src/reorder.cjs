const fs = require('fs');

const file = 'c:\\Users\\lavva\\Downloads\\Dms\\DMS-main\\client\\src\\pages\\HomePage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure PerformancesSection is imported
if (!content.includes('import PerformancesSection')) {
  content = content.replace(
    'import ContactForm from "../components/forms/ContactForm";',
    'import ContactForm from "../components/forms/ContactForm";\nimport PerformancesSection from "../components/sections/PerformancesSection";'
  );
}

// We will split the file by the section comments
// Using a regex to find indices

const getIndex = (str) => content.indexOf(str);

const i3 = getIndex('{/* 3. Current Competition */}');
const i4 = getIndex('{/* 4. Events & Leaderboard Split */}');
const i5 = getIndex('{/* 5. Success Stories */}');
const i6 = getIndex('{/* 6. Voice of Delhi NCR Journey */}');
const i8 = getIndex('{/* 8. Gallery Highlights */}');

if (i3 === -1 || i4 === -1 || i5 === -1 || i6 === -1 || i8 === -1) {
    console.error("Could not find one of the section markers!");
    process.exit(1);
}

const part1 = content.slice(0, i4); // Up to the end of Current Competition
const partEventsSplit = content.slice(i4, i5); // Events & Leaderboard Split
const partSuccessStories = content.slice(i5, i6); // Success Stories
const partJourneyAndAmbassador = content.slice(i6, i8); // Voice of Delhi NCR Journey + Brand Ambassador
const partGalleryAndRest = content.slice(i8); // Gallery and the rest

// Reconstruct
const newContent = part1 
                 + partJourneyAndAmbassador 
                 + '\n      {/* Shows (Performances) */}\n      <PerformancesSection />\n\n      '
                 + partEventsSplit 
                 + partSuccessStories 
                 + partGalleryAndRest;

fs.writeFileSync(file, newContent, 'utf8');
console.log("Successfully reordered HomePage.jsx");

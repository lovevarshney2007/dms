const fs = require('fs');
let content = fs.readFileSync('client/src/pages/HomePage.jsx', 'utf8');

// Add useState, useEffect
content = content.replace(
  'import { Link } from "react-router-dom";',
  'import { useState, useEffect } from "react";\nimport { Link } from "react-router-dom";'
);

// Remove static imports
content = content.replace('  qualifiedContestants, \n', '');
content = content.replace('  successStories\n', '');
content = content.replace('  successStories\r\n', '');
content = content.replace('  successStories,\n', '');

// Add state and fetch
content = content.replace(
  'function HomePage() {',
  'function HomePage() {\n  const [qualifiedContestants, setQualifiedContestants] = useState([]);\n\n  useEffect(() => {\n    fetch(import.meta.env.VITE_API_URL + "/api/content/qualified-contestant")\n      .then(res => res.json())\n      .then(data => setQualifiedContestants(data))\n      .catch(err => console.error(err));\n  }, []);\n'
);

// Map image correctly in the JSX (since CMS uses imageUrl, and static used image)
content = content.replace(/user\.image/g, 'user.imageUrl');
content = content.replace(/user\.status/g, 'user.subtitle');

// Remove success stories section
// The section starts at {/* 5. Success Stories */} and ends before {/* 5b. Transition Heading
content = content.replace(
  /\{\/\*\ 5\.\ Success Stories\ \*\/\}.*?(?=\{\/\*\ 5b\.\ Transition Heading)/s,
  '{/* Testimonials moved out of deleted success stories section */}\n        <div className="mt-16 sm:mt-24">\n          <TestimonialsSlider />\n        </div>\n\n      '
);

fs.writeFileSync('client/src/pages/HomePage.jsx', content);
console.log("Updated HomePage.jsx");

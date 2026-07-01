const fs = require('fs');
let content = fs.readFileSync('client/src/pages/GalleryPage.jsx', 'utf8');

// Add useEffect to import
content = content.replace(
  'import { useState } from "react";',
  'import { useState, useEffect } from "react";'
);

// Replace static galleryItems with state
content = content.replace(
  /const galleryItems \= \[\s*\/\/ Photos.*?\n\];/s,
  ''
);

content = content.replace(
  'function GalleryPage() {',
  'function GalleryPage() {\n  const [galleryItems, setGalleryItems] = useState([]);\n\n  useEffect(() => {\n    fetch(import.meta.env.VITE_API_URL + "/api/content/gallery")\n      .then(res => res.json())\n      .then(data => {\n        setGalleryItems(data.map(item => ({ ...item, image: item.imageUrl, type: item.subtitle || "Photos" })));\n      }).catch(console.error);\n  }, []);\n'
);

fs.writeFileSync('client/src/pages/GalleryPage.jsx', content);
console.log("Updated GalleryPage.jsx");

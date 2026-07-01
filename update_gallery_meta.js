const fs = require('fs');
let content = fs.readFileSync('client/src/pages/GalleryPage.jsx', 'utf8');

content = content.replace(
  'import { useState } from "react";',
  'import { useState, useEffect } from "react";'
);

content = content.replace('const galleryItems = [', 'const fallbackGalleryItems = [');

content = content.replace(
  'function GalleryPage() {',
  `function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState(fallbackGalleryItems);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/content/gallery")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setGalleryItems(data.map(d => ({
            id: d._id,
            type: d.meta?.type || "Photos",
            title: d.title,
            image: d.imageUrl,
            season: d.meta?.season || "All Seasons",
            isVideo: d.meta?.type === "Video" || d.meta?.type === "Videos" || !!d.meta?.youtubeLink,
            videoUrl: d.meta?.youtubeLink || ""
          })));
        }
      })
      .catch(console.error);
  }, []);
`
);

fs.writeFileSync('client/src/pages/GalleryPage.jsx', content);
console.log("Updated GalleryPage.jsx");

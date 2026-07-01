import { useState, useEffect } from "react";

export function usePageMeta(pageIdentifier, fallbackData) {
  const [meta, setMeta] = useState(fallbackData);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/content/page-meta")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // Find the block where name === pageIdentifier
          const pageData = data.find(d => d.name && d.name.trim().toLowerCase() === pageIdentifier.toLowerCase());
          if (pageData) {
            setMeta({
              title: pageData.title || fallbackData.title,
              subtitle: pageData.subtitle || fallbackData.subtitle,
              description: pageData.description || fallbackData.description,
              imageUrl: pageData.imageUrl || fallbackData.imageUrl,
            });
          }
        }
      })
      .catch(console.error);
  }, [pageIdentifier, fallbackData.title, fallbackData.subtitle, fallbackData.description, fallbackData.imageUrl]);

  return meta;
}

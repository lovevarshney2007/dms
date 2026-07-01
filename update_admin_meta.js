const fs = require('fs');
let content = fs.readFileSync('client/src/pages/admin/AdminPage.jsx', 'utf8');

// 1. Update FIELDS_MAP
content = content.replace(
  /const FIELDS_MAP = {[\s\S]*?};\n/,
  `const FIELDS_MAP = {
  competitions: [
    { key: "title",       label: "Title",       type: "text", required: true },
    { key: "subtitle",    label: "Subtitle",    type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "imageUrl",    label: "Image URL",   type: "text" },
    { key: "meta.date",   label: "Event Date",  type: "text" },
    { key: "meta.location", label: "Location",  type: "text" },
    { key: "meta.tag",    label: "Event Tag",   type: "text" },
    { key: "order",       label: "Order",       type: "number" }
  ],
  seasons: [
    { key: "title",       label: "Season Title",  type: "text", required: true },
    { key: "subtitle",    label: "Tagline",        type: "text" },
    { key: "year",        label: "Year",           type: "text" },
    { key: "meta.status", label: "Status (e.g. completed, grand-finale)", type: "text" },
    { key: "meta.color",  label: "CSS Color Class (e.g. from-amber-500 to-orange-600)", type: "text" },
    { key: "meta.lightBg", label: "CSS Light Bg Class", type: "text" },
    { key: "meta.borderColor", label: "CSS Border Class", type: "text" },
    { key: "meta.winner", label: "Winner Name", type: "text" },
    { key: "meta.winnerImg", label: "Winner Image URL", type: "text" },
    { key: "meta.youtube", label: "YouTube Highlight URL", type: "text" },
    { key: "meta.poster", label: "Poster Image URL", type: "text" },
    { key: "meta.grandFinale", label: "Grand Finale Date (if upcoming)", type: "text" },
    { key: "meta.venue", label: "Grand Finale Venue (if upcoming)", type: "text" },
    { key: "meta.description", label: "Full Description",   type: "textarea" },
    { key: "order",       label: "Order",          type: "number" }
  ],
  contestants: [
    { key: "title",       label: "Contestant Name", type: "text", required: true },
    { key: "imageUrl",    label: "Photo URL",       type: "text" },
    { key: "meta.city",   label: "City",            type: "text" },
    { key: "meta.status", label: "Status",          type: "text" },
    { key: "meta.category", label: "Category",      type: "text" },
    { key: "meta.score",  label: "Score",           type: "text" },
    { key: "order",       label: "Order",           type: "number" }
  ],
  stories: [
    { key: "title",       label: "Person Name",   type: "text", required: true },
    { key: "subtitle",    label: "Achievement",   type: "text", required: true },
    { key: "description", label: "Story",         type: "textarea" },
    { key: "imageUrl",    label: "Photo URL",     type: "text" },
    { key: "order",       label: "Order",         type: "number" }
  ],
  gallery: [
    { key: "title",    label: "Caption",    type: "text" },
    { key: "imageUrl", label: "Image URL",  type: "text", required: true },
    { key: "meta.type", label: "Type (Gallery or Video)", type: "text" },
    { key: "meta.season", label: "Season", type: "text" },
    { key: "meta.youtubeLink", label: "YouTube Link", type: "text" },
    { key: "order",    label: "Order",      type: "number" }
  ],
  videos: [
    { key: "title",    label: "Video Title", type: "text", required: true },
    { key: "videoUrl", label: "YouTube URL", type: "text",  required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "order",    label: "Order",       type: "number" }
  ],
  patrons: [
    { key: "title",        label: "Name",         type: "text", required: true },
    { key: "subtitle",     label: "Title/Role",   type: "text" },
    { key: "imageUrl",     label: "Photo URL",    type: "text" },
    { key: "meta.role",    label: "Team Role (if in team)", type: "text" },
    { key: "meta.isTeam",  label: "Is Team Member? (true/false)", type: "text" },
    { key: "order",        label: "Order",        type: "number" }
  ],
  sponsors: [
    { key: "title",        label: "Sponsor Name",  type: "text", required: true },
    { key: "subtitle",     label: "Tier/Level",    type: "text" },
    { key: "imageUrl",     label: "Logo URL",      type: "text" },
    { key: "link",         label: "Website",       type: "text" },
    { key: "order",        label: "Order",         type: "number" }
  ],
  testimonials: [
    { key: "title",       label: "Person Name",  type: "text", required: true },
    { key: "subtitle",    label: "Role",         type: "text" },
    { key: "description", label: "Testimonial",  type: "textarea", required: true },
    { key: "imageUrl",    label: "Photo URL",    type: "text" },
    { key: "order",       label: "Order",        type: "number" }
  ]
};
`
);

// 2. Update handleSubmit to construct nested meta object
content = content.replace(
  'const payload = { ...form };',
  `const payload = {};
        const meta = {};
        for (const [k, v] of Object.entries(form)) {
          if (k.startsWith("meta.")) {
            let val = v;
            if (val === "true") val = true;
            if (val === "false") val = false;
            meta[k.replace("meta.", "")] = val;
          } else {
            payload[k] = v;
          }
        }
        if (Object.keys(meta).length > 0) {
          payload.meta = meta;
        }`
);

// 3. Update startEdit to flatten nested meta object
content = content.replace(
  'if (field.key === "tags" && Array.isArray(item[field.key])) {',
  `if (field.key.startsWith("meta.")) {
          const metaKey = field.key.replace("meta.", "");
          acc[field.key] = item.meta && item.meta[metaKey] !== undefined ? String(item.meta[metaKey]) : "";
        } else if (field.key === "tags" && Array.isArray(item[field.key])) {`
);

// 4. Update the CONTENT_TYPE_MAP to map contestants to qualified-contestant
content = content.replace(
  'seasons:      "season",',
  'seasons:      "season",\n  contestants:  "qualified-contestant",'
);

fs.writeFileSync('client/src/pages/admin/AdminPage.jsx', content);
console.log("AdminPage.jsx updated for meta support.");

// Rules for required fields per content type
const CONTENT_RULES = {
  "competition": [
    { field: "title", required: true },
    { field: "description", required: false }
  ],
  "season": [
    { field: "title", required: true }
  ],
  "qualified-contestant": [
    { field: "title", required: true }
  ],
  "success-story": [
    { field: "title", required: true },
    { field: "subtitle", required: true }
  ],
  "gallery": [
    { field: "imageUrl", required: true }
  ],
  "video": [
    { field: "title", required: true },
    { field: "videoUrl", required: true }
  ],
  "patron": [
    { field: "title", required: true }
  ],
  "sponsor": [
    { field: "title", required: true }
  ],
  "testimonial": [
    { field: "title", required: true },
    { field: "description", required: true }
  ],
  "website-setting": [
    { field: "settingKey", required: true },
    { field: "settingValue", required: true }
  ],
  "page-meta": [
    { field: "name", required: true }
  ]
};

function getRulesForType(type) {
  return CONTENT_RULES[type] || [];
}

module.exports = { getRulesForType };

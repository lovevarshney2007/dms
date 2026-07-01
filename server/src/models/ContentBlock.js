const mongoose = require("mongoose");

const contentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "competition",
        "season",
        "qualified-contestant",
        "success-story",
        "gallery",
        "video",
        "patron",
        "sponsor",
        "testimonial",
        "website-setting",
        "page-meta"
      ],
      required: true,
      index: true
    },
    title: { type: String, trim: true, default: "" },
    subtitle: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    imageUrl: { type: String, trim: true, default: "" },
    videoUrl: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
    name: { type: String, trim: true, default: "" },
    role: { type: String, trim: true, default: "" },
    organization: { type: String, trim: true, default: "" },
    quote: { type: String, trim: true, default: "" },
    settingKey: { type: String, trim: true, default: "" },
    settingValue: { type: String, trim: true, default: "" },
    season: { type: String, trim: true, default: "" },
    year: { type: String, trim: true, default: "" },
    rank: { type: Number, default: null },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    tags: [{ type: String, trim: true }],
    meta: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ContentBlock ||
  mongoose.model("ContentBlock", contentBlockSchema);

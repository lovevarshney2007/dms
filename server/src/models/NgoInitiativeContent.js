const mongoose = require("mongoose");

const ngoInitiativeContentSchema = new mongoose.Schema(
  {
    slug:          { type: String, required: true, unique: true, index: true },
    heroTitle:     { type: String, default: "" },
    heroTagline:   { type: String, default: "" },
    heroImage:     { type: String, default: "" },
    aboutText:     { type: String, default: "" }, // paragraphs joined by \n
    aboutImage:    { type: String, default: "" },
    ctaTitle:      { type: String, default: "" },
    ctaBody:       { type: String, default: "" },
    ctaButtonLabel:{ type: String, default: "" },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.NgoInitiativeContent ||
  mongoose.model("NgoInitiativeContent", ngoInitiativeContentSchema);

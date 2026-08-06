const mongoose = require("mongoose");

const ngoGalleryImageSchema = new mongoose.Schema(
  {
    initiative: { type: String, required: true, index: true },
    url:        { type: String, required: true },
    order:      { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.NgoGalleryImage ||
  mongoose.model("NgoGalleryImage", ngoGalleryImageSchema);

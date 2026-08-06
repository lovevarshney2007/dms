const mongoose = require("mongoose");

const ngoHeroSlideSchema = new mongoose.Schema(
  {
    initiative: { type: String, required: true, index: true }, // e.g. "home", "blood-donation"
    image:      { type: String, required: true },
    title:      { type: String, default: "" },
    subtitle:   { type: String, default: "" },
    order:      { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.NgoHeroSlide ||
  mongoose.model("NgoHeroSlide", ngoHeroSlideSchema);

const mongoose = require("mongoose");

const ngoEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    desc: { type: String, default: "" },
    image: { type: String, default: "" },
    tag: { type: String, default: "Event" },
    tagColor: { type: String, default: "bg-coral" },
    icon: { type: String, default: "📅" },
  },
  { timestamps: true },
);

module.exports = mongoose.models.NgoEvent || mongoose.model("NgoEvent", ngoEventSchema);

const mongoose = require("mongoose");

const ngoTeamMemberSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    role:  { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.NgoTeamMember ||
  mongoose.model("NgoTeamMember", ngoTeamMemberSchema);

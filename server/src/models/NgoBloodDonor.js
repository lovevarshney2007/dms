const mongoose = require("mongoose");

const ngoBloodDonorSchema = new mongoose.Schema(
  {
    name:             { type: String, required: true, trim: true },
    phone:            { type: String, required: true, trim: true },
    email:            { type: String, required: true, trim: true, lowercase: true },
    age:              { type: String, default: "" },
    bloodGroup:       { type: String, default: "" },
    weight:           { type: String, default: "" },
    city:             { type: String, default: "" },
    lastDonationDate: { type: String, default: "" },
    preferredCamp:    { type: String, default: "" },
    notes:            { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "verified"],
      default: "new"
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.NgoBloodDonor ||
  mongoose.model("NgoBloodDonor", ngoBloodDonorSchema);

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    eventDate: {
      type: Date,
      required: true
    },
    eventLocation: {
      type: String,
      required: true,
      trim: true
    },
    posterImage: {
      type: String,
      required: true,
      trim: true
    },
    registrationDeadline: {
      type: Date,
      required: true
    },
    eventType: {
      type: String,
      enum: ["Competition", "Concert", "Workshop"],
      required: true
    },
    liveLink: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Event || mongoose.model("Event", eventSchema);

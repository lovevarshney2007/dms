const mongoose = require("mongoose");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9][0-9\s\-()]{6,14}$/;
// Basic http(s) URL check — good enough to keep out junk/js: URLs without
// being overly strict about valid TLDs etc.
const URL_REGEX = /^https?:\/\/[^\s]+$/i;

const sponsorRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    organization: {
      type: String,
      trim: true,
      default: "",
      maxlength: [150, "Organization name cannot exceed 150 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [254, "Email cannot exceed 254 characters"],
      validate: {
        validator: (v) => EMAIL_REGEX.test(v),
        message: (props) => `${props.value} is not a valid email address`
      }
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: (v) => PHONE_REGEX.test(v),
        message: (props) => `${props.value} is not a valid phone number`
      }
    },
    website: {
      type: String,
      trim: true,
      default: "",
      maxlength: [300, "Website URL cannot exceed 300 characters"],
      validate: {
        // Only validate format if a value was actually provided — field is optional.
        validator: (v) => !v || URL_REGEX.test(v),
        message: (props) => `${props.value} is not a valid URL (must start with http:// or https://)`
      }
    },
    sponsorshipTier: {
      type: String,
      trim: true,
      default: "General",
      maxlength: [50, "Sponsorship tier cannot exceed 50 characters"]
    },
    message: {
      type: String,
      trim: true,
      default: "",
      maxlength: [5000, "Message cannot exceed 5000 characters"]
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "contacted", "approved", "rejected"],
        message: "{VALUE} is not a valid status"
      },
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

sponsorRequestSchema.index({ email: 1 });
sponsorRequestSchema.index({ status: 1 });

module.exports =
  mongoose.models.SponsorRequest ||
  mongoose.model("SponsorRequest", sponsorRequestSchema);
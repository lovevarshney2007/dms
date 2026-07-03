const mongoose = require("mongoose");

// Reusable validators/regex so the same rule is enforced consistently
// across all three schemas.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts optional leading +, 7-15 digits, allows spaces/hyphens/parens
// (covers Indian 10-digit numbers as well as +91-prefixed / intl numbers).
const PHONE_REGEX = /^\+?[0-9][0-9\s\-()]{6,14}$/;

const contactQuerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
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
    source: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "Source cannot exceed 100 characters"]
    },
    subject: {
      type: String,
      trim: true,
      default: "",
      maxlength: [200, "Subject cannot exceed 200 characters"]
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
        values: ["pending", "replied", "resolved"],
        message: "{VALUE} is not a valid status"
      },
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

// Speeds up admin lookups/filters by email and status; not strictly
// "validation" but pairs naturally with the fields above.
contactQuerySchema.index({ email: 1 });
contactQuerySchema.index({ status: 1 });

module.exports = mongoose.models.ContactQuery || mongoose.model("ContactQuery", contactQuerySchema);
const mongoose = require("mongoose");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9][0-9\s\-()]{6,14}$/;
const URL_REGEX = /^https?:\/\/[^\s]+$/i;
// age is stored as a String (kept as-is to avoid a breaking schema change),
// but we now enforce that it's actually a 1-3 digit number in a sane range.
const AGE_REGEX = /^(?:[1-9][0-9]{0,2})$/;

const registrationSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      enum: {
        values: ["join-us", "talent-show"],
        message: "{VALUE} is not a valid form type"
      },
      required: [true, "Form type is required"]
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    stageName: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "Stage name cannot exceed 100 characters"]
    },
    gender: {
      type: String,
      trim: true,
      default: "",
      enum: {
        // Empty string allowed since field is optional.
        values: ["", "Male", "Female", "Other", "Prefer not to say"],
        message: "{VALUE} is not a valid gender option"
      }
    },
    age: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: (v) => {
          if (!v) return true; // optional field
          if (!AGE_REGEX.test(v)) return false;
          const num = Number(v);
          return num >= 5 && num <= 100;
        },
        message: (props) => `${props.value} is not a valid age (must be a number between 5 and 100)`
      }
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
    city: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "City cannot exceed 100 characters"]
    },
    talentCategory: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "Talent category cannot exceed 100 characters"]
    },
    languagePreference: {
      type: String,
      trim: true,
      default: "",
      maxlength: [50, "Language preference cannot exceed 50 characters"]
    },
    videoLink: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Video link cannot exceed 500 characters"],
      validate: {
        validator: (v) => !v || URL_REGEX.test(v),
        message: (props) => `${props.value} is not a valid URL (must start with http:// or https://)`
      }
    },
    shortIntroduction: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "Short introduction cannot exceed 1000 characters"]
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "shortlisted", "approved", "rejected"],
        message: "{VALUE} is not a valid status"
      },
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

registrationSchema.index({ email: 1 });
registrationSchema.index({ formType: 1, status: 1 });

module.exports = mongoose.models.Registration || mongoose.model("Registration", registrationSchema);
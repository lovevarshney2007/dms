import { useState } from "react";
import { defaultJoinUsForm } from "../../data/siteContent";
import { submitForm } from "../../lib/api";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  // Union Territories
  "Andaman & Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi (NCT)", "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const LANGUAGES = [
  "Hindi", "English", "Punjabi", "Bhojpuri", "Urdu", "Bengali",
  "Tamil", "Telugu", "Kannada", "Malayalam", "Gujarati", "Marathi",
  "Rajasthani", "Haryanvi", "Classical (Hindustani)", "Classical (Carnatic)", "Other"
];

const TALENT_CATEGORIES = [
  "Singer", "Instrumentalist", "Band / Group", "Classical Vocalist", "Western Vocalist", "Other"
];

const inputBase = "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 text-sm outline-none placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200";
const selectBase = `${inputBase} cursor-pointer`;
const labelBase = "block text-sm font-semibold text-stone-700 mb-1.5";

function RequiredStar() {
  return <span className="text-orange-500 ml-0.5">*</span>;
}

// eslint-disable-next-line no-unused-vars
function JoinUsForm({ onClose, onStatusChange, showClose = true }) {
  const [form, setForm] = useState(defaultJoinUsForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.age || isNaN(form.age) || Number(form.age) < 5 || Number(form.age) > 70) errs.age = "Please enter a valid age (5-70)";
    if (!form.gender) errs.gender = "Please select your gender";
    if (!form.state) errs.state = "Please select your state";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.whatsapp.trim() || !/^\d{10}$/.test(form.whatsapp.replace(/\s/g, ""))) errs.whatsapp = "Enter valid 10-digit WhatsApp/mobile number";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address";
    if (!form.languagePreference) errs.languagePreference = "Please select a language";
    if (!form.talentCategory) errs.talentCategory = "Please select a talent category";
    if (form.videoLink && form.videoLink.trim() && !/^https?:\/\/[^\s]+$/i.test(form.videoLink.trim())) errs.videoLink = "Please enter a valid URL starting with http:// or https://";
    return errs;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        name: form.fullName,
        age: form.age,
        gender: form.gender,
        state: form.state,
        city: form.city,
        phone: form.whatsapp,
        email: form.email,
        languagePreference: form.languagePreference,
        talentCategory: form.talentCategory,
        videoLink: form.videoLink,
      };

      const result = await submitForm("/forms/join-us", payload);
      // Generate a reference number
      const refNo = `DMS-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const successMessage = result.message 
        ? `${result.message} Your Reference No is ${refNo}.`
        : `Registration submitted successfully! Your Reference No is ${refNo}. We'll contact you soon.`;

      setStatus({ type: "success", message: successMessage });
      onStatusChange?.({ type: "success", message: successMessage });
      setForm(defaultJoinUsForm);
      setErrors({});
      onClose?.();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong. Please try again." });
      onStatusChange?.({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Status Banner */}
      {status.message && (
        <div className={`mb-6 flex items-start gap-3 rounded-2xl border px-5 py-4 text-sm font-medium ${
          status.type === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : "border-red-200 bg-red-50 text-red-800"
        }`}>
          <span className="text-lg shrink-0">{status.type === "success" ? "✅" : "❌"}</span>
          <span>{status.message}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className={labelBase}>
            Full Name <RequiredStar />
          </label>
          <input
            type="text"
            aria-label="Full Name"
            className={`${inputBase} ${errors.fullName ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
            value={form.fullName}
            onChange={set("fullName")}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.fullName}</p>}
        </div>

        {/* Age */}
        <div>
          <label className={labelBase}>
            Age <RequiredStar />
          </label>
          <input
            type="number"
            aria-label="Age"
            min="5"
            max="70"
            className={`${inputBase} ${errors.age ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
            value={form.age}
            onChange={set("age")}
            placeholder="Your age"
          />
          {errors.age && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className={labelBase}>
            Gender <RequiredStar />
          </label>
          <select
            aria-label="Gender"
            className={`${selectBase} ${errors.gender ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
            value={form.gender}
            onChange={set("gender")}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.gender}</p>}
        </div>

        {/* State */}
        <div>
          <label className={labelBase}>
            State <RequiredStar />
          </label>
          <select
            aria-label="State"
            className={`${selectBase} ${errors.state ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
            value={form.state}
            onChange={set("state")}
          >
            <option value="">Select your state </option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.state}</p>}
        </div>

        {/* City */}
        <div>
          <label className={labelBase}>
            City <RequiredStar />
          </label>
          <input
            type="text"
            aria-label="City"
            className={`${inputBase} ${errors.city ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
            value={form.city}
            onChange={set("city")}
            placeholder="Your city"
          />
          {errors.city && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.city}</p>}
        </div>

        {/* WhatsApp / Mobile Number */}
        <div>
          <label className={labelBase}>
            WhatsApp / Mobile Number <RequiredStar />
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-semibold">+91</span>
            <input
              type="tel"
              aria-label="WhatsApp or Mobile Number"
              className={`${inputBase} pl-12 ${errors.whatsapp ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
              value={form.whatsapp}
              onChange={set("whatsapp")}
              placeholder="10-digit number"
              maxLength={10}
            />
          </div>
          {errors.whatsapp && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.whatsapp}</p>}
        </div>

        {/* Email */}
        <div>
          <label className={labelBase}>
            Email Address <RequiredStar />
          </label>
          <input
            type="email"
            aria-label="Email Address"
            className={`${inputBase} ${errors.email ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
            value={form.email}
            onChange={set("email")}
            placeholder="your@email.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
        </div>

        {/* Language Preference */}
        <div className="sm:col-span-2">
          <label className={labelBase}>
            Language / Singing Genre Preference <RequiredStar />
          </label>
          <select
            aria-label="Language Preference"
            className={`${selectBase} ${errors.languagePreference ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
            value={form.languagePreference}
            onChange={set("languagePreference")}
          >
            <option value="">Select language / genre</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          {errors.languagePreference && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.languagePreference}</p>}
        </div>

        {/* Talent Category */}
        <div className="sm:col-span-2">
          <label className={labelBase}>
            Talent Category <RequiredStar />
          </label>
          <select
            aria-label="Talent Category"
            className={`${selectBase} ${errors.talentCategory ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
            value={form.talentCategory}
            onChange={set("talentCategory")}
          >
            <option value="">Select talent category</option>
            {TALENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.talentCategory && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.talentCategory}</p>}
        </div>

        {/* Video Link */}
        <div className="sm:col-span-2">
          <label className={labelBase}>
            Audition Video Link (Optional)
          </label>
          <input
            type="url"
            aria-label="Audition Video Link"
            className={`${inputBase} ${errors.videoLink ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
            value={form.videoLink}
            onChange={set("videoLink")}
            placeholder="https://youtube.com/watch?v=..."
          />
          {errors.videoLink && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.videoLink}</p>}
        </div>

        {/* Submit */}
        <div className="sm:col-span-2 pt-2">
          <p className="text-xs text-stone-400 mb-4">
            Fields marked with <span className="text-orange-500 font-bold">*</span> are required.
            By submitting, you agree to be contacted by the DMS Aarohi team.
          </p>
          <button
            type="submit"
            aria-label="Submit Pre-Registration"
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-sm shadow-[0_8px_20px_rgba(234,88,12,0.25)] hover:shadow-[0_12px_28px_rgba(234,88,12,0.35)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Pre-Register Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default JoinUsForm;

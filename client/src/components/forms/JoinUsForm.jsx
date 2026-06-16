import { useState } from "react";
import { defaultJoinUsForm } from "../../data/siteContent";
import { submitForm } from "../../lib/api";
import { renderInputClassNames } from "../../lib/formStyles";
import FormNotice from "../common/FormNotice";

function JoinUsForm({ onClose, onStatusChange, showClose = true }) {
  const [form, setForm] = useState(defaultJoinUsForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        name: form.fullName,
        // stageName: form.stageName,
        age: form.age,
        gender: form.gender,
        city: form.city,
        phone: form.phone,
        email: form.email,
        talentCategory: form.talentCategory,
        languagePreference: form.languagePreference,
        videoLink: form.videoLink,
        shortIntroduction: form.shortIntroduction
      };

      const result = await submitForm("/api/forms/join-us", payload);
      setStatus({ type: "success", message: result.message });
      onStatusChange?.({ type: "success", message: result.message });
      setForm(defaultJoinUsForm);
      onClose?.();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
      onStatusChange?.({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-stone-950/70 p-6 backdrop-blur">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-100">Join Us Form</p>
          {/* <h3 className="mt-2 font-serif text-3xl text-white">Register your interest for the upcoming event.</h3> */}
        </div>
        {/* {showClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white"
          >
            Close
          </button>
        ) : null} */}
      </div>

      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Full Name
          <input
            className={renderInputClassNames(true)}
            type="text"
            value={form.fullName}
            onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            placeholder="Enter your full name"
            required
          />
        </label>
        {/* <label className="grid gap-2 text-sm font-medium text-stone-100">
          Stage Name (Optional)
          <input
            className={renderInputClassNames(true)}
            type="text"
            value={form.stageName}
            onChange={(event) => setForm({ ...form, stageName: event.target.value })}
            placeholder="Preferred stage/artist name"
          />
        </label> */}
        {/* <label className="grid gap-2 text-sm font-medium text-stone-100">
          Age
          <input
            className={renderInputClassNames(true)}
            type="number"
            min="1"
            value={form.age}
            onChange={(event) => setForm({ ...form, age: event.target.value })}
            placeholder="Enter your age"
            required
          />
        </label> */}
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Gender
          <select
            className={renderInputClassNames(true)}
            value={form.gender}
            onChange={(event) => setForm({ ...form, gender: event.target.value })}
            required
          >
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          City
          <input
            className={renderInputClassNames(true)}
            type="text"
            value={form.city}
            onChange={(event) => setForm({ ...form, city: event.target.value })}
            placeholder="Enter your city"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Phone
          <input
            className={renderInputClassNames(true)}
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            placeholder="Enter your phone"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Email
          <input
            className={renderInputClassNames(true)}
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="Enter your email"
            required
          />
        </label>
        {/* <label className="grid gap-2 text-sm font-medium text-stone-100">
          Talent Category
          <select
            className={renderInputClassNames(true)}
            value={form.talentCategory}
            onChange={(event) => setForm({ ...form, talentCategory: event.target.value })}
            required
          >
            <option>Singer</option>
            <option>Rapper</option>
            <option>Musician</option>
            <option>Band</option>
          </select>
        </label> */}
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Language Preference
          <select
            className={renderInputClassNames(true)}
            value={form.languagePreference}
            onChange={(event) => setForm({ ...form, languagePreference: event.target.value })}
            required
          >
            <option>Hindi</option>
            <option>English</option>
            <option>Regional</option>
          </select>
        </label>
        {/* <label className="grid gap-2 text-sm font-medium text-stone-100 md:col-span-2">
          Performance Video Link
          <input
            className={renderInputClassNames(true)}
            type="url"
            value={form.videoLink}
            onChange={(event) => setForm({ ...form, videoLink: event.target.value })}
            placeholder="YouTube or Drive link"
            required
          />
        </label> */}
        {/* <label className="grid gap-2 text-sm font-medium text-stone-100 md:col-span-2">
          Short Introduction
          <textarea
            className={`${renderInputClassNames(true)} min-h-32`}
            value={form.shortIntroduction}
            onChange={(event) => setForm({ ...form, shortIntroduction: event.target.value })}
            placeholder="Tell us about your musical journey, achievements, and goals"
            required
          />
        </label> */}
        <div className="space-y-4 md:col-span-2">
          <FormNotice status={status} />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JoinUsForm;

import { useState } from "react";
import { defaultNgoContactForm } from "../../data/ngoFormDefaults";
import { submitForm } from "../../lib/api";
import { renderInputClassNames } from "../../lib/formStyles";
import FormNotice from "../common/FormNotice";

function NgoContactForm() {
  const [form, setForm] = useState(defaultNgoContactForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await submitForm("/api/forms/ngo-contact", form);
      setStatus({ type: "success", message: result.message });
      setForm(defaultNgoContactForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="rounded-[1.75rem] border border-white/15 bg-stone-950/80 p-6 backdrop-blur" onSubmit={handleSubmit}>
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-100">NGO Contact Form</p>
        <h3 className="mt-2 font-serif text-3xl text-white">Reach the NGO team.</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Name
          <input
            className={renderInputClassNames(true)}
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Phone Number
          <input
            className={renderInputClassNames(true)}
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            required
          />
        </label>
        {/* <label className="grid gap-2 text-sm font-medium text-stone-100">
          Email
          <input
            className={renderInputClassNames(true)}
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="Enter your email"
            required
          />
        </label> */}
        {/* <label className="grid gap-2 text-sm font-medium text-stone-100">
          City
          <input
            className={renderInputClassNames(true)}
            type="text"
            value={form.city}
            onChange={(event) => setForm({ ...form, city: event.target.value })}
            placeholder="Enter your city"
            required
          />
        </label> */}
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          How You Want to Help
          <select
            className={`${renderInputClassNames(true)} `}
            value={form.helpType}
            onChange={(event) => setForm({ ...form, helpType: event.target.value })}
            required
          >
            <option>Donate Food</option>
            <option>Donate Clothes</option>
            <option>Donate Blood</option>
            <option>Volunteer</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100 md:col-span-2">
          Message
          <textarea
            className={`${renderInputClassNames(true)} min-h-22`}
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            placeholder="Share details about how you’d like to support"
            required
          />
        </label>
      </div>

      <div className="mt-5 space-y-4">
        <FormNotice status={status} />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Submitting..." : "Submit NGO Contact Form"}
        </button>
      </div>
    </form>
  );
}

export default NgoContactForm;

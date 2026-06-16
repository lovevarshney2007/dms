import { useState } from "react";
import { defaultContactForm } from "../../data/siteContent";
import { submitForm } from "../../lib/api";
import { renderInputClassNames } from "../../lib/formStyles";
import FormNotice from "../common/FormNotice";

function ContactForm({
  source = "",
  eyebrow = "Contact Form",
  title = "Send your enquiry directly.",
  submitLabel = "Submit Contact Form"
}) {
  const [form, setForm] = useState(defaultContactForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await submitForm("/api/forms/contact", { ...form, source });
      setStatus({ type: "success", message: result.message });
      setForm(defaultContactForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="rounded-[1.75rem] border border-white/15 bg-stone-950/80 p-5 backdrop-blur sm:p-6"
      onSubmit={handleSubmit}
    >
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-100">{eyebrow}</p>
        <h3 className="mt-2 font-serif text-3xl text-white">{title}</h3>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Full Name
          <input
            className={renderInputClassNames(true)}
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            // placeholder="Enter your full name"
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
            // placeholder="Enter your email"
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
            // placeholder="Enter your phone number"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Subject
          <input
            className={renderInputClassNames(true)}
            type="text"
            value={form.subject}
            onChange={(event) => setForm({ ...form, subject: event.target.value })}
            // placeholder="Event, collaboration, booking, etc."
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100 md:col-span-2">
          Message
          <textarea
            className={`${renderInputClassNames(true)} min-h-24 sm:min-h-28`}
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            // placeholder="Write your message"
            required
          />
        </label>
      </div>

      <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
        <FormNotice status={status} />
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
        >
          {submitting ? "Submitting..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;

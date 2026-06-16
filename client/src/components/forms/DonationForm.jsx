import { useState } from "react";
import { defaultDonationForm } from "../../data/siteContent";
import { submitForm } from "../../lib/api";
import { renderInputClassNames } from "../../lib/formStyles";
import FormNotice from "../common/FormNotice";

function DonationForm() {
  const [form, setForm] = useState(defaultDonationForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await submitForm("/api/forms/donation", form);
      setStatus({ type: "success", message: result.message });
      setForm(defaultDonationForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="rounded-[1.75rem] border border-stone-200 bg-orange-50/70 p-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Full Name
          <input
            className={renderInputClassNames()}
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            // placeholder="Enter your full name"
            required
          />
        </label>
        {/* <label className="grid gap-2 text-sm font-medium text-stone-700">
          Email
          <input
            className={renderInputClassNames()}
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            // placeholder="Enter your email"
            required
          />
        </label> */}
        <label className="grid gap-2 text-sm font-medium text-stone-700">
          Phone Number
          <input
            className={renderInputClassNames()}
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            // placeholder="Enter your phone number"
            required
          />
        </label>
        {/* <label className="grid gap-2 text-sm font-medium text-stone-700">
          Donation Amount
          <input
            className={renderInputClassNames()}
            type="text"
            value={form.amount}
            onChange={(event) => setForm({ ...form, amount: event.target.value })}
            placeholder="Enter donation amount"
            required
          />
        </label> */}
        <label className="grid gap-2 text-sm font-medium text-stone-700 md:col-span-2">
          Purpose
          <select
            className={renderInputClassNames()}
            value={form.purpose}
            onChange={(event) => setForm({ ...form, purpose: event.target.value })}
            required
          >
            {/* <option value="" enabled>
              Select purpose
            </option> */}
            <option>Blood Donation Support</option>
            <option>Child Education</option>
            <option>Senior Citizen Welfare</option>
            <option>Environment Awareness</option>
            <option>General NGO Support</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-700 md:col-span-2">
          Message
          <textarea
            className={`${renderInputClassNames()} min-h-16`}
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            // placeholder="Write your message"
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
          {submitting ? "Submitting..." : "Submit Donation Form"}
        </button>
      </div>
    </form>
  );
}

export default DonationForm;

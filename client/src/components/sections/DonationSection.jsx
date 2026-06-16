import { contactDetails } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";
import DonationForm from "../forms/DonationForm";

function DonationSection() {
  return (
    <section
      id="donation-form"
      className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10"
    >
      <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Donation Form"
            title="Support DMS Aarohi NGO activities."
            text="Donation enquiries from this form are stored in MongoDB along with contact and join-us submissions."
          />
          <div className="grid gap-4">
            {contactDetails.map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-700">{label}</p>
                <p className="mt-2 text-base leading-7 text-stone-700">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <DonationForm />
      </div>
    </section>
  );
}

export default DonationSection;

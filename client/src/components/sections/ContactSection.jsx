import { contactDetails } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";
import ContactForm from "../forms/ContactForm";

function ContactSection() {
  return (
    <section
      id="contact"
      className="rounded-[2rem] border border-white/40 bg-[linear-gradient(135deg,#fff7ee_0%,#f5e0c0_45%,#233b35_45%,#122127_100%)] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10"
    >
      <div className="">
        <div className="">
          {/* <SectionHeading
            eyebrow="Contact"
            title="Reach the society for performances, collaboration, and cultural programs."
            text="The contact area is now fully interactive and stores enquiries in MongoDB along with the other website forms."
          /> */}
          {/* <div className="grid gap-4">
            {contactDetails.map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-stone-200/60 bg-white/85 p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-700">{label}</p>
                <p className="mt-2 text-base leading-7 text-stone-700">{value}</p>
              </div>
            ))}
          </div> */}
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export default ContactSection;

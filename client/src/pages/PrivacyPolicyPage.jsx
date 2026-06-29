import { Link } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";

const sections = [
  {
    title: "Information We Collect",
    body: "When you register for Voice of Delhi NCR or contact DMS Aarohi, we may collect your name, age, contact details, city, audition video links, and any message you submit through our forms.",
  },
  {
    title: "How We Use Your Information",
    body: "We use submitted information to process registrations, respond to enquiries, share competition updates, and improve our events and website experience.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell your personal data. Information may be shared only with authorised DMS Aarohi team members, event partners, or service providers required to operate the competition.",
  },
  {
    title: "Data Security",
    body: "We take reasonable steps to protect submitted information. However, no online transmission can be guaranteed to be completely secure.",
  },
  {
    title: "Your Rights",
    body: "You may request correction or deletion of your personal information by contacting us at dmsaarohi@gmail.com.",
  },
  {
    title: "Updates to This Policy",
    body: "We may update this Privacy Policy from time to time. Continued use of the website after changes means you accept the updated policy.",
  },
];

function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <ScrollReveal direction="up">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          description="How DMS Aarohi Musical Society collects, uses, and protects your information."
        />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <p className="text-sm text-stone-500 mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </ScrollReveal>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <ScrollReveal key={section.title} direction="up" delay={0.05 * idx}>
            <article className="glass-card rounded-2xl border border-stone-200 bg-white/80 p-6 sm:p-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-3">{section.title}</h2>
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">{section.body}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal direction="up" delay={0.2}>
        <p className="mt-10 text-sm text-stone-600">
          Questions?{" "}
          <Link to="/contact" className="font-semibold text-orange-600 hover:text-orange-500">
            Contact us
          </Link>{" "}
          or email{" "}
          <a href="mailto:dmsaarohi@gmail.com" className="font-semibold text-orange-600 hover:text-orange-500">
            dmsaarohi@gmail.com
          </a>
          .
        </p>
      </ScrollReveal>
    </div>
  );
}

export default PrivacyPolicyPage;

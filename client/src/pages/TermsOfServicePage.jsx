import { Link } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import ScrollReveal from "../components/common/ScrollReveal";

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By using the DMS Aarohi website and registering for our events, you agree to these Terms of Service and our Privacy Policy.",
  },
  {
    title: "Eligibility",
    body: "Participants must meet the age and category requirements stated for each competition. False or incomplete registration details may lead to disqualification.",
  },
  {
    title: "Registrations & Auditions",
    body: "Submitting a registration does not guarantee selection. DMS Aarohi reserves the right to accept, reject, or reschedule auditions and live rounds at its discretion.",
  },
  {
    title: "Content & Recordings",
    body: "By participating, you grant DMS Aarohi permission to use photos, videos, and performance recordings for promotion, broadcasts, and event documentation unless otherwise agreed in writing.",
  },
  {
    title: "Code of Conduct",
    body: "Participants, volunteers, and audience members must behave respectfully at all events. Harassment, abusive language, or disruption may result in removal from the venue or competition.",
  },
  {
    title: "Limitation of Liability",
    body: "DMS Aarohi is not liable for delays, cancellations, technical issues, travel costs, or indirect losses arising from event participation or website use, to the extent permitted by law.",
  },
  {
    title: "Changes to Terms",
    body: "We may revise these terms when needed. Updated terms will be posted on this page and apply from the date of publication.",
  },
];

function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <ScrollReveal direction="up">
        <SectionHeading
          eyebrow="Legal"
          title="Terms of Service"
          description="Rules and conditions for using the DMS Aarohi website and participating in our events."
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
          See also our{" "}
          <Link to="/privacy" className="font-semibold text-orange-600 hover:text-orange-500">
            Privacy Policy
          </Link>
          . For support, visit{" "}
          <Link to="/contact" className="font-semibold text-orange-600 hover:text-orange-500">
            Contact
          </Link>
          .
        </p>
      </ScrollReveal>
    </div>
  );
}

export default TermsOfServicePage;

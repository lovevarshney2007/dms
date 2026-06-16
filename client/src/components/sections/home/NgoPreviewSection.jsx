import { Link } from "react-router-dom";
import SectionHeading from "../../common/SectionHeading";

function NgoPreviewSection() {
  const links = [
    { title: "Activities", to: "/ngo/activities", desc: "Focus areas and community support initiatives." },
    { title: "Donation", to: "/ngo/donation", desc: "Donation form saved to MongoDB." },
    { title: "Gallary", to: "/ngo/gallery", desc: "Service activity and outreach images." },
    { title: "Services", to: "/ngo/services", desc: "Browse causes and donate quickly." },
    { title: "Volunteer", to: "/ngo/activities#volunteer", desc: "Get involved and support the mission." }
  ];

  return (
    <section id="ngo" className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="NGO"
          title="Activities, donation, and image gallary."
          text="NGO is split into Activities, Services, Donation, and Image Gallary with a highlight for the Volunteer path."
        />
        <Link
          to="/ngo/activities"
          className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
        >
          Open NGO
        </Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {links.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="group rounded-[1.75rem] border border-stone-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-900">NGO</p>
            <h3 className="mt-3 font-serif text-3xl text-stone-900">{item.title}</h3>
            <p className="mt-3 text-base leading-7 text-stone-600">{item.desc}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-stone-800">Open {item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default NgoPreviewSection;

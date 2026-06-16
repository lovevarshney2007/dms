import { ngoFocusAreas } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";

function NgoHeroSection() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/20 bg-[linear-gradient(135deg,#17352c_0%,#244f42_48%,#e4dac7_48%,#fff8ef_100%)] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:grid md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:p-14">
      <div className="flex flex-col justify-between gap-7">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="NGO and Voluntary Work"
            title="Support lives, strengthen communities, and fund meaningful action."
            text="DMS Aarohi’s NGO work focuses on blood donation awareness, Thalassemia support, child education, senior citizen welfare, and environmental responsibility."
            light
          />
          <div className="flex flex-wrap gap-3">
            <a
              className="rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
              href="/ngo/donation#donation-form"
            >
              Contact Now
            </a>
            {/* <a
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
              href="mailto:dmsaarohi@gmail.com"
            >
              NGO Contact
            </a> */}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ngoFocusAreas.map((item) => (
            <article
              key={item.title}
              className="flex min-h-44 flex-col rounded-[1.6rem] border border-emerald-100/15 bg-[#102922]/85 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.16)]"
            >
              <strong className="text-lg leading-6 text-white">{item.title}</strong>
              <p className="mt-3 text-sm leading-6 text-emerald-50">{item.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="relative mt-8 min-h-full md:mt-0">
        <img
          className="h-full min-h-[460px] w-full rounded-[1.9rem] object-cover"
          src="/legacy/bd4.jpg"
          alt="DMS Aarohi voluntary work"
          loading="lazy"
          decoding="async"
          width="1200"
          height="800"
        />
        <div className="absolute inset-x-6 bottom-6 rounded-[1.6rem] border border-white/10 bg-stone-950/70 p-6 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-100">Community Focus</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-white">
            Volunteer-led outreach backed by donors, partners, and public trust.
          </h2>
        </div>
      </div>
    </section>
  );
}

export default NgoHeroSection;

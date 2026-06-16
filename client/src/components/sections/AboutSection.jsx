import { objectives } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";

function AboutSection() {
  return (
    <section
      id="about"
      className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10"
    >
      <div className="grid items-center gap-7 md:grid-cols-[1.1fr_0.9fr]">
        <SectionHeading
          eyebrow="About Us"
          title="Built to promote music, talent, and cultural participation."
          text="The original DMS Aarohi website describes the society as a voluntary musical organisation dedicated to encouraging talent and motivating people through music, concerts, and shared cultural platforms."
        />
        <img
          className="w-full rounded-[1.75rem] object-cover"
          src="/legacy/about_group.png"
          alt="DMS Aarohi group"
          loading="lazy"
          decoding="async"
          width="1200"
          height="800"
        />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {objectives.map((item) => (
          <article key={item} className="rounded-3xl border border-stone-200 bg-white/80 p-5 text-stone-600 shadow-sm">
            <p className="leading-7">{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutSection;

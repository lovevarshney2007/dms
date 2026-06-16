import PerformancesSection from "../../components/sections/PerformancesSection";
import SectionHeading from "../../components/common/SectionHeading";

function MusicSocietyShowsPage() {
  return (
    <div className="space-y-7">
      <section className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
        <SectionHeading
          eyebrow="Music Society"
          title="Shows"
          text="Concerts, musical evenings, and stage programs curated by DMS Aarohi."
        />
      </section>
      <PerformancesSection />
    </div>
  );
}

export default MusicSocietyShowsPage;

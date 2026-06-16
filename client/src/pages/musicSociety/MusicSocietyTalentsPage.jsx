import SectionHeading from "../../components/common/SectionHeading";
import { teamMembers } from "../../data/siteContent";
import TeamSliderRow from "../../components/common/TeamSliderRow";

function MusicSocietyTalentsPage() {
  const top = teamMembers.slice(0, 5);
  const bottom = teamMembers.slice(5);

  return (
    <div className="space-y-7">
      <section className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
        <SectionHeading
          eyebrow="Music Society"
          title="Talents"
          text="A platform for singers and performers to build stage presence through society events and showcases."
        />
        <div className="mt-8 space-y-5">
          <TeamSliderRow members={top} />
          <TeamSliderRow members={bottom} reverse />
        </div>
      </section>
    </div>
  );
}

export default MusicSocietyTalentsPage;

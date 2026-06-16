import { teamMembers } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";
import TeamSliderRow from "../common/TeamSliderRow";

function TeamSection() {
  const teamTopRow = teamMembers.slice(0, 5);
  // const teamBottomRow = teamMembers.slice(5);

  return (
    <section
      id="team"
      className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-6 shadow-[0_24px_80px_rgba(84,42,24,0.14)] sm:p-7 md:p-10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Our Team"
          title="Leadership and core members behind the society."
          text="Expanded with the real member data carried over from the legacy DMS Aarohi site."
        />
        <div className="w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-600 sm:w-auto sm:rounded-full sm:px-5">
          {teamMembers.length} Team Members
        </div>
      </div>
      <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
        <TeamSliderRow members={teamTopRow} />
        {/* <TeamSliderRow members={teamBottomRow} reverse /> */}
      </div>
    </section>
  );
}

export default TeamSection;

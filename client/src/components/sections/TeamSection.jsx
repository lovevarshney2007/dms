import { teamData } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";
import TeamSliderRow from "../common/TeamSliderRow";

function TeamSection() {
  const teamTopRow = teamData.slice(0, 5);

  return (
    <section id="jury" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 md:mb-24">
      <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between mb-8 sm:mb-12">
        <SectionHeading
          eyebrow="Our Mentors"
          title="Meet the Jury & Mentors."
          text="Learn from the best. Our panel consists of industry experts and renowned artists."
        />
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/50 border border-orange-200">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-orange-800 uppercase">
            {teamData.length} Team Members
          </span>
        </div>
      </div>

      <TeamSliderRow members={teamTopRow} />
    </section>
  );
}

export default TeamSection;

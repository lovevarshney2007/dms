import { useState, useEffect } from "react";
import SectionHeading from "../common/SectionHeading";
import TeamSliderRow from "../common/TeamSliderRow";

const fallbackTeam = [
  { name: "Pankaj Mathur", role: "Founder & President", image: "/team/Pankaj Mathur (Founder & President).JPG" },
  { name: "Dr. Bhawna Bhat", role: "General Secretary", image: "/team/Dr Bhawna Bhat (General Secretary).jpg" }
];

function TeamSection() {
  const [teamData, setTeamData] = useState(fallbackTeam);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/content/patron")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setTeamData(data.filter(d => d.meta?.isTeam).map(d => ({
            name: d.title,
            role: d.meta?.role || d.subtitle,
            image: d.imageUrl
          })));
        }
      })
      .catch(console.error);
  }, []);

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

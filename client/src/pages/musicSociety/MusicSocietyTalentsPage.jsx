import PageShell from "../../components/common/PageShell";
import { teamData } from "../../data/siteContent";
import TeamSliderRow from "../../components/common/TeamSliderRow";

function MusicSocietyTalentsPage() {
  const top = teamData.slice(0, 5);
  const bottom = teamData.slice(5);

  return (
    <PageShell isMusic={true}>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="mb-12 text-center font-serif text-5xl font-bold text-stone-900">
          Our Talents & Mentors
        </h1>
        <div className="space-y-16">
          <TeamSliderRow members={top} />
          <TeamSliderRow members={bottom} />
        </div>
      </div>
    </PageShell>
  );
}

export default MusicSocietyTalentsPage;

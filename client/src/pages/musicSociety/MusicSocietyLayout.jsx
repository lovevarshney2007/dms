import PageShell from "../../components/common/PageShell";
import MusicSocietyMainPage from "./MusicSocietyMainPage";

function MusicSocietyLayout() {
  return (
    <PageShell isMusic={true}>
      <MusicSocietyMainPage />
    </PageShell>
  );
}

export default MusicSocietyLayout;

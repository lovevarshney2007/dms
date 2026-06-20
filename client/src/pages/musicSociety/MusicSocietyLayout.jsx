import { Outlet } from "react-router-dom";
import PageShell from "../../components/common/PageShell";

function MusicSocietyLayout() {
  return (
    <PageShell isMusic={true}>
      <Outlet />
    </PageShell>
  );
}

export default MusicSocietyLayout;

import { Outlet } from "react-router-dom";
import PageShell from "../../components/common/PageShell";

function MusicSocietyLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}

export default MusicSocietyLayout;

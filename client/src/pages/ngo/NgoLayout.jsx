import { Outlet } from "react-router-dom";
import PageShell from "../../components/common/PageShell";

function NgoLayout() {
  return (
    <PageShell basePath="/home">
      <Outlet />
    </PageShell>
  );
}

export default NgoLayout;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LogoLoader from "./components/common/LogoLoader";

const HomePage = lazy(() => import("./pages/HomePage"));
const MusicSocietyLayout = lazy(() => import("./pages/musicSociety/MusicSocietyLayout"));
const MusicSocietyOverviewPage = lazy(() => import("./pages/musicSociety/MusicSocietyOverviewPage"));
const MusicSocietyTalentsPage = lazy(() => import("./pages/musicSociety/MusicSocietyTalentsPage"));
const MusicSocietyEventsPage = lazy(() => import("./pages/musicSociety/MusicSocietyEventsPage"));
const MusicSocietyShowsPage = lazy(() => import("./pages/musicSociety/MusicSocietyShowsPage"));
const MusicSocietyJoinUsPage = lazy(() => import("./pages/musicSociety/MusicSocietyJoinUsPage"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminGuard = lazy(() => import("./pages/admin/AdminGuard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LogoLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/music-society" element={<MusicSocietyLayout />}>
            <Route index element={<MusicSocietyOverviewPage />} />
            <Route path="talents" element={<MusicSocietyTalentsPage />} />
            <Route path="events" element={<MusicSocietyEventsPage />} />
            <Route path="shows" element={<MusicSocietyShowsPage />} />
            <Route path="join-us" element={<MusicSocietyJoinUsPage />} />
          </Route>

          <Route path="/music" element={<MusicSocietyLayout />}>
            <Route index element={<MusicSocietyOverviewPage />} />
            <Route path="talents" element={<MusicSocietyTalentsPage />} />
            <Route path="events" element={<MusicSocietyEventsPage />} />
            <Route path="shows" element={<MusicSocietyShowsPage />} />
            <Route path="register" element={<MusicSocietyJoinUsPage />} />
          </Route>

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminGuard />}>
            <Route index element={<AdminPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

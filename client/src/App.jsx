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

          {/* New Top-Level Routes mapping to existing pages */}
          <Route element={<MusicSocietyLayout />}>
            <Route path="/about" element={<MusicSocietyOverviewPage />} />
            <Route path="/competitions" element={<MusicSocietyEventsPage />} />
            <Route path="/shows" element={<MusicSocietyShowsPage />} />
            <Route path="/success-stories" element={<MusicSocietyTalentsPage />} />
            <Route path="/gallery" element={<MusicSocietyEventsPage />} />
            <Route path="/contact" element={<MusicSocietyJoinUsPage />} />
            <Route path="/register" element={<MusicSocietyJoinUsPage />} />
          </Route>

          {/* Legacy Routes Redirects */}
          <Route path="/music" element={<Navigate to="/" replace />} />
          <Route path="/music-society" element={<Navigate to="/" replace />} />
          <Route path="/music-society/*" element={<Navigate to="/" replace />} />
          <Route path="/music/*" element={<Navigate to="/" replace />} />

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

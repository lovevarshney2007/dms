import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LogoLoader from "./components/common/LogoLoader";

// Main Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/musicSociety/MusicSocietyOverviewPage"));
const ShowsPage = lazy(() => import("./pages/musicSociety/MusicSocietyShowsPage"));
const SuccessStoriesPage = lazy(() => import("./pages/musicSociety/MusicSocietyTalentsPage"));
const MusicSocietyLayout = lazy(() => import("./pages/musicSociety/MusicSocietyLayout"));

// New Pages
const VoiceOfDelhiNCRPage = lazy(() => import("./pages/VoiceOfDelhiNCRPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const RegisterPage = lazy(() => import("./pages/musicSociety/MusicSocietyJoinUsPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const OldMusicHome = lazy(() => import("./pages/musicSociety/MusicSocietyMainPage")); // Temp route for user reference

// Admin
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminGuard = lazy(() => import("./pages/admin/AdminGuard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LogoLoader />}>
        <Routes>
          {/* Main Homepage */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* Main Navigation Routes — wrapped in MusicSocietyLayout (has MusicNavbar + Footer) */}
          <Route element={<MusicSocietyLayout />}>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/voice-of-delhi-ncr" element={<VoiceOfDelhiNCRPage />} />
            <Route path="/voice-of-delhi-ncr/:season" element={<VoiceOfDelhiNCRPage />} />
            <Route path="/shows" element={<ShowsPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
          </Route>

          {/* Temporary Route to view Old Music Home Page */}
          <Route path="/old-music" element={<OldMusicHome />} />

          {/* Legacy Route Redirects */}
          <Route path="/music" element={<Navigate to="/" replace />} />
          <Route path="/music-society" element={<Navigate to="/" replace />} />
          <Route path="/music-society/*" element={<Navigate to="/" replace />} />
          <Route path="/music/*" element={<Navigate to="/" replace />} />
          <Route path="/competitions" element={<Navigate to="/voice-of-delhi-ncr" replace />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminGuard />}>
            <Route index element={<AdminPage />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

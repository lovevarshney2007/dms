import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from './lib/api';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import DashboardPage from './pages/DashboardPage';
import RegistrationsPage from './pages/talent/RegistrationsPage';
import TalentEventsPage from './pages/talent/TalentEventsPage';
import SeasonsPage from './pages/talent/SeasonsPage';
import SuccessStoriesPage from './pages/talent/SuccessStoriesPage';
import TalentGalleryPage from './pages/talent/TalentGalleryPage';
import TalentContactPage from './pages/talent/TalentContactPage';
import SponsorsPage from './pages/talent/SponsorsPage';
import SettingsPage from './pages/SettingsPage';
import ContentBlocksPage from './pages/ContentBlocksPage';

import NgoDashboardPage from './pages/ngo/NgoDashboardPage';
import NgoVolunteersPage from './pages/ngo/NgoVolunteersPage';
import NgoDonorsPage from './pages/ngo/NgoDonorsPage';
import NgoEventsPage from './pages/ngo/NgoEventsPage';
import NgoTeamPage from './pages/ngo/NgoTeamPage';
import NgoGalleryPage from './pages/ngo/NgoGalleryPage';
import NgoContentPage from './pages/ngo/NgoContentPage';
import NgoHeroPage from './pages/ngo/NgoHeroPage';

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* Talent Hunt */}
          <Route path="talent/registrations" element={<RegistrationsPage />} />
          <Route path="talent/events" element={<TalentEventsPage />} />
          <Route path="talent/seasons" element={<SeasonsPage />} />
          <Route path="talent/success-stories" element={<SuccessStoriesPage />} />
          <Route path="talent/gallery" element={<TalentGalleryPage />} />
          <Route path="talent/contact" element={<TalentContactPage />} />
          <Route path="talent/sponsors" element={<SponsorsPage />} />
          
          {/* NGO */}
          <Route path="ngo/dashboard" element={<NgoDashboardPage />} />
          <Route path="ngo/volunteers" element={<NgoVolunteersPage />} />
          <Route path="ngo/donors" element={<NgoDonorsPage />} />
          <Route path="ngo/events" element={<NgoEventsPage />} />
          <Route path="ngo/team" element={<NgoTeamPage />} />
          <Route path="ngo/gallery" element={<NgoGalleryPage />} />
          <Route path="ngo/content" element={<NgoContentPage />} />
          <Route path="ngo/hero" element={<NgoHeroPage />} />

          {/* System */}
          <Route path="settings" element={<SettingsPage />} />
          <Route path="settings/content" element={<ContentBlocksPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

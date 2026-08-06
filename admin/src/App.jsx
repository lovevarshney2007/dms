import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from './lib/api';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import RegistrationsPage from './pages/talent/RegistrationsPage';
import TalentEventsPage from './pages/talent/TalentEventsPage';
import SeasonsPage from './pages/talent/SeasonsPage';
import SuccessStoriesPage from './pages/talent/SuccessStoriesPage';
import TalentGalleryPage from './pages/talent/TalentGalleryPage';
import TalentContactPage from './pages/talent/TalentContactPage';
import SponsorsPage from './pages/talent/SponsorsPage';
import SettingsPage from './pages/SettingsPage';
import NGOAdminConsole from './pages/ngo/NGOAdminConsole';

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ngo-admin-console" element={<PrivateRoute><NGOAdminConsole /></PrivateRoute>} />
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
          {/* System */}
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

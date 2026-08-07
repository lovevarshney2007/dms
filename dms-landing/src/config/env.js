// Environment variables wrapper to ensure graceful fallbacks
export const ENV = {
  // Uses VITE_ prefix for Vite apps
  TALENT_HUNT_URL: import.meta.env.VITE_TALENT_URL || 'http://localhost:5174',
  NGO_URL: import.meta.env.VITE_NGO_URL || 'http://localhost:5175',
  ADMIN_URL: import.meta.env.VITE_ADMIN_URL || 'http://localhost:5173',
};

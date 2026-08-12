// Environment configuration for Client App (Talent Hunt)
const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";

export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || (isLocalhost ? 'http://localhost:5051/api' : 'https://dms-b383.onrender.com/api'),
};

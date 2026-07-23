// ============================================================
//  DMS AAROHI ADMIN — Central Config
// ============================================================
const IS_DEV = import.meta.env.DEV;
export const API_BASE = import.meta.env.VITE_API_BASE || (IS_DEV ? "http://localhost:5051/api" : "https://dms-server.vercel.app/api");
export const TALENT_SITE = "https://dms-ten-gamma.vercel.app/";
export const NGO_SITE    = "https://dms-ngo.vercel.app/";

// Base URL for static assets (images) stored in the client public folder
// Always use deployed Vercel URLs since images are hosted there
export const TALENT_ASSETS = "https://dms-ten-gamma.vercel.app";
export const NGO_ASSETS    = "https://dms-ngo.vercel.app";

// Resolves a potentially-relative image URL to an absolute one
export function resolveImg(url, site = 'talent') {
  if (!url) return '';
  if (url.startsWith('http')) return url;   // already absolute
  const base = site === 'ngo' ? NGO_ASSETS : TALENT_ASSETS;
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
}

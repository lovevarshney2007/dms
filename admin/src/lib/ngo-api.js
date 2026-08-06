import { API_BASE } from '../config';

const TOKEN_KEY = "dms_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function isLoggedIn() {
  return !!getToken();
}

async function request(path, { method = "GET", body, auth = false, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = "Request failed";
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {}
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ── Auth ── (login/logout handled by common admin)
export const login = () => { throw new Error("Use common admin login"); };
export const setToken = () => {};
export const clearToken = () => {};

// ── Team ──
export const getTeam = () => request("/admin/ngo/team", { auth: true });
export const createTeamMember = (data) => request("/admin/ngo/team", { method: "POST", body: data, auth: true });
export const updateTeamMember = (id, data) => request(`/admin/ngo/team/${id}`, { method: "PUT", body: data, auth: true });
export const deleteTeamMember = (id) => request(`/admin/ngo/team/${id}`, { method: "DELETE", auth: true });

// ── Gallery ──
export const getGallery = (initiative) => request(`/admin/ngo/gallery/${initiative}`, { auth: true });
export const addGalleryImage = (initiative, url) => request(`/admin/ngo/gallery/${initiative}`, { method: "POST", body: { url }, auth: true });
export const deleteGalleryImage = (initiative, id) => request(`/admin/ngo/gallery/${initiative}/${id}`, { method: "DELETE", auth: true });

// ── Events ──
export const getEvents = () => request("/admin/ngo/events", { auth: true });
export const createEvent = (data) => request("/admin/ngo/events", { method: "POST", body: data, auth: true });
export const updateEvent = (id, data) => request(`/admin/ngo/events/${id}`, { method: "PUT", body: data, auth: true });
export const deleteEvent = (id) => request(`/admin/ngo/events/${id}`, { method: "DELETE", auth: true });

// ── Initiative Content ──
export const getContent = (slug) => request(`/admin/ngo/content/${slug}`, { auth: true });
export const updateContent = (slug, data) => request(`/admin/ngo/content/${slug}`, { method: "PUT", body: data, auth: true });

// ── Upload ──
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return request("/upload", { method: "POST", body: formData, auth: true, isForm: true });
};

// ── Stats ──
export const getStats = () => request("/admin/ngo/stats", { auth: true });

// ── Hero Slides ──
export const getHeroSlides = (initiative) => request(`/admin/ngo/hero/${initiative}`, { auth: true });
export const addHeroSlide = (initiative, data) => request(`/admin/ngo/hero/${initiative}`, { method: "POST", body: data, auth: true });
export const deleteHeroSlide = (initiative, id) => request(`/admin/ngo/hero/${initiative}/${id}`, { method: "DELETE", auth: true });

// ── Volunteers ──
export const getVolunteers = () => request("/admin/volunteers", { auth: true });
export const updateVolunteerStatus = (id, status) => request(`/admin/volunteers/${id}/status`, { method: "PUT", body: { status }, auth: true });
export const deleteVolunteer = (id) => request(`/admin/volunteers/${id}`, { method: "DELETE", auth: true });

// ── Blood Donors ──
export const getBloodDonors = () => request("/admin/ngo/blood-donors", { auth: true });
export const updateBloodDonorStatus = (id, status) => request(`/admin/ngo/blood-donors/${id}/status`, { method: "PUT", body: { status }, auth: true });
export const deleteBloodDonor = (id) => request(`/admin/ngo/blood-donors/${id}`, { method: "DELETE", auth: true });

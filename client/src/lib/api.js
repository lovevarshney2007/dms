const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const ADMIN_TOKEN_KEY = "adminToken";

async function handleResponse(response) {
  // Gracefully handle empty or non-JSON responses to avoid JSON.parse errors
  let result = null;
  try {
    const text = await response.text();
    result = text ? JSON.parse(text) : {};
  } catch (err) {
    // Fallback when response isn't JSON
    result = {};
  }

  if (!response.ok) {
    const message = result?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return result;
}

export async function submitForm(endpoint, payload) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
}

export async function postJson(endpoint, payload) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
}

export async function getJson(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  return handleResponse(response);
}

export function setAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

function getAdminToken() {
  return typeof localStorage !== "undefined" ? localStorage.getItem(ADMIN_TOKEN_KEY) || "" : "";
}

export async function postAdmin(endpoint, payload) {
  const token = getAdminToken();
  if (!token) throw new Error("Not authenticated");
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
}

export async function getAdmin(endpoint) {
  const token = getAdminToken();
  if (!token) throw new Error("Not authenticated");
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function putAdmin(endpoint, payload) {
  const token = getAdminToken();
  if (!token) throw new Error("Not authenticated");
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
}

export async function deleteAdmin(endpoint) {
  const token = getAdminToken();
  if (!token) throw new Error("Not authenticated");
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

import { API_BASE } from "../config";

const TOKEN_KEY = "dms_admin_token";

export const getToken  = () => localStorage.getItem(TOKEN_KEY);
export const setToken  = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
export const isLoggedIn = () => !!getToken();

async function req(method, path, body) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) { clearToken(); window.location.href = "/"; }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const api = {
  get:    (path)        => req("GET",    path),
  post:   (path, body)  => req("POST",   path, body),
  put:    (path, body)  => req("PUT",    path, body),
  delete: (path)        => req("DELETE", path),
};

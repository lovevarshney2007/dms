import { Navigate, Outlet } from "react-router-dom";

// Decode JWT and check if it has expired
function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // payload.exp is in seconds
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function AdminGuard() {
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("adminToken") : "";

  if (!isTokenValid(token)) {
    // Remove stale / expired token
    if (token) localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default AdminGuard;

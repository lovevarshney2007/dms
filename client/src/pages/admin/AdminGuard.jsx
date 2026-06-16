import { Navigate, Outlet } from "react-router-dom";

function AdminGuard() {
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("adminToken") : "";
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}

export default AdminGuard;

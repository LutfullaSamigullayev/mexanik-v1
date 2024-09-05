import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function RoleCheck(allowedRoles) {
  // const isAuthenticated = useSelector((state) => state.auth);

  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

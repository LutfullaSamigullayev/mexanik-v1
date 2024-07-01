import { Navigate, Outlet } from "react-router-dom";

export function AuthCheck() {
  const isAuthenticated = true;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

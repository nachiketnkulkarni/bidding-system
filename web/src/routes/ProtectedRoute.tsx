// src/routes/ProtectedRoute.tsx
import { useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "../types/auth";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]; // roles allowed to access this route (if not provided, any authenticated user is allowed)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, role, refresh } = useAuth();

  // Attempt to silently refresh token on initial mount, if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // try to refresh (e.g., if user has a valid refresh token cookie)
      refresh().catch(() => {
        /* ignore errors here, handled in state */
      });
    }
  }, [isAuthenticated, refresh]);

  // If still not authenticated, block access and redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a role restriction is provided, check if the user's role is allowed
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // User is logged in but not authorized for this route
    // Redirect to their respective dashboard (or a 403 page if implemented)
    const dashboardPath =
      role === "admin" ? "/admin/dashboard" : "/user/dashboard";
    return <Navigate to={dashboardPath} replace />;
  }

  // User is authenticated (and authorized if role restriction applies)
  return <Outlet />; // Render the child routes/components
};

export default ProtectedRoute;

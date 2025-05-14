// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./features/login/Login";
import UserDashboard from "./features/dashboard/UserDashboard";
import AdminDashboard from "./features/dashboard/AdminDashboard";

const App: React.FC = () => {
  const { isAuthenticated, role, refresh } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  // On app mount, attempt to restore auth state via refresh token (silent refresh)
  useEffect(() => {
    const checkAuth = async () => {
      await refresh(); // try to get new access token if refresh token is valid
      setAuthChecked(true);
    };
    checkAuth();
  }, [refresh]);

  if (!authChecked) {
    // While checking/refreshing token, we can show a loading indicator
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route: Login page (redirect to dashboard if already logged in) */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate
                to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                replace
              />
            ) : (
              <Login />
            )
          }
        />
        {/* Protected routes for regular users */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>
        {/* Protected routes for admin users */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        {/* Redirect root to login (or to dashboard if authenticated) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate
                to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                replace
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Catch-all for undefined routes, redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

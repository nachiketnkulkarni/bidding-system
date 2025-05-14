// src/auth/useAuth.ts
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "./store";
import type { LoginResponse } from "../types/auth";
import { api, refreshApi } from "../services/api";

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    role,
    accessToken,
    isAuthenticated,
    login,
    logout,
    setAccessToken,
  } = useAuthStore();

  // Login method: authenticate and get tokens
  const loginUser = async (email: string, password: string) => {
    try {
      // Send login request to backend
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      const data = response.data;
      // On success, the server should have set a refresh token cookie (HttpOnly)
      // and returned an access token and user info in the response body.
      login(data.user, data.accessToken); // Update Zustand state
      // Navigate to appropriate dashboard based on role
      if (data.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    } catch (error: any) {
      // Handle login error (e.g., incorrect credentials)
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout method: invalidate session
  const logoutUser = async () => {
    try {
      // (Optional) notify server to invalidate refresh token cookie
      await api.post("/auth/logout"); // assuming this endpoint clears the cookie
    } catch (error) {
      console.error("Logout API call failed:", error);
      // Even if server logout fails, proceed to clear client state
    }
    // Clear client-side auth state
    logout();
    // Redirect to login page
    navigate("/login", { replace: true });
  };

  // Attempt to silently refresh the access token using the refresh token cookie
  const tryRefreshToken = async (): Promise<boolean> => {
    try {
      const response = await refreshApi.get<LoginResponse>("/auth/refresh");
      // Assume response contains new access token (and possibly updated user info)
      const data = response.data;
      if (data.user) {
        // If backend returns user info on refresh, update it
        login(data.user, data.accessToken);
      } else {
        // If no user info in response, just update the token
        setAccessToken(data.accessToken);
      }
      return true;
    } catch (error) {
      // Refresh failed (token expired or invalid)
      logout(); // ensure state is cleared
      return false;
    }
  };

  // Expose state and methods
  return {
    user,
    role,
    accessToken,
    isAuthenticated,
    login: loginUser,
    logout: logoutUser,
    refresh: tryRefreshToken,
    getRole: () => role,
    isAuth: () => isAuthenticated,
  };
};

// src/auth/store.ts
import { create } from "zustand";
import type { User, UserRole } from "../types/auth";

interface AuthState {
  user: User | null;
  role: UserRole | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  // Actions to update state:
  login: (user: User, token: string) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  accessToken: null,
  isAuthenticated: false,
  // Set user info and token on login
  login: (user, token) => {
    set({
      user,
      role: user.role,
      accessToken: token,
      isAuthenticated: true,
    });
  },
  // Clear all auth state on logout
  logout: () => {
    set({
      user: null,
      role: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
  // Update token (e.g., after refresh)
  setAccessToken: (token) => {
    set({
      accessToken: token,
      isAuthenticated: true,
    });
  },
}));

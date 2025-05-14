// src/types/auth.ts
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
  // Note: refresh token is not exposed here – it's delivered via HttpOnly cookie
}

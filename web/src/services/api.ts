// src/services/api.ts
import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../auth/store";

// Create an axios instance for API calls
export const api = axios.create({
  baseURL: "https://your-api.example.com/api", // replace with actual API base URL
  withCredentials: true, // send cookies (for refresh token) with requests
});

// Create a second axios instance for refresh calls (to avoid interceptor loops)
export const refreshApi = axios.create({
  baseURL: "https://your-api.example.com/api",
  withCredentials: true,
});

// Request interceptor: attach access token to Authorization header for **all** requests (except refresh/login)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      // Ensure headers object exists
      config.headers = config.headers ?? {};
      // Now safely assign the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle 401 errors by attempting token refresh
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // If no refresh in progress, start a refresh token request
      if (!refreshPromise) {
        refreshPromise = refreshApi
          .get("/auth/refresh")
          .then((res) => {
            const newToken: string = (res.data as any).accessToken;
            // Update the global auth state with the new token
            useAuthStore.getState().setAccessToken(newToken);
            refreshPromise = null;
            return newToken;
          })
          .catch((err) => {
            refreshPromise = null;
            // Refresh failed, force logout
            useAuthStore.getState().logout();
            // Optionally, you could redirect to login here:
            // window.location.href = '/login';
            return Promise.reject(err);
          });
      }
      try {
        const newToken = await refreshPromise;
        // Retry the original request with the new token
        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    // If error is not 401 or refresh failed, propagate it
    return Promise.reject(error);
  }
);

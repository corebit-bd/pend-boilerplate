import axios from "axios";
import { API_ENDPOINTS, API_TIMEOUT, STORAGE_KEYS } from "@/lib/constants/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || API_ENDPOINTS.BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: API_TIMEOUT,
});

// Request Interceptor to add Auth Token (If Available)
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

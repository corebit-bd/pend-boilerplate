export const API_ENDPOINTS = {
  BASE_URL: "http://localhost:8000/api/v1",
  GRAPHQL_URL: "http://localhost:8000/graphql",
  FASTAPI_URL: "http://localhost:8001",
} as const;

export const API_TIMEOUT = 10000; // 10 Seconds

export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",
  ME: "/users/me",
} as const;

export const USER_ENDPOINTS = {
  ME: "/users/me",
  BY_ID: (id: string) => `/users/${id}`,
  LIST: "/users",
  UPDATE_ME: "/users/me",
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

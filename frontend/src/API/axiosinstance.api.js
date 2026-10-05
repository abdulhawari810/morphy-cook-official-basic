import axios from "axios";
import { API_BASE_URL } from "@/config/env";

// ─────────────────────────────────────────────���───────────────
// Refresh-token flow
//
// - Hanya endpoint privat yang memicu refresh.
// - Request refresh di-*collapse* jadi satu (lihat `refreshPromise`)
//   supaya 5 request paralel yang kena 401 tidak menembak 5x refresh.
// - Network error dicek lebih dulu: `error.response` undefined saat
//   offline/CORS/DNS gagal, dan itu TIDAK boleh masuk flow refresh.
// ─────────────────────────────────────────────────────────────

const PUBLIC_PATHS = ["/auth/login", "/auth/register", "/auth/refresh"];

const isPublicPath = (url = "") =>
  PUBLIC_PATHS.some((path) => url.includes(path));

let refreshPromise = null;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    // 1) Network error: tidak ada response sama sekali
    if (!error?.response) {
      error.type = "NETWORK_ERROR";
      return Promise.reject(error);
    }

    // 2) Server error: tidak ada gunanya retry
    if (status >= 500) {
      error.type = "SERVER_ERROR";
      return Promise.reject(error);
    }

    // 3) Token kedaluwarsa → coba refresh sekali
    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isPublicPath(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        refreshPromise = refreshPromise ?? axiosInstance.post("/auth/refresh");

        await refreshPromise;

        refreshPromise = null;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
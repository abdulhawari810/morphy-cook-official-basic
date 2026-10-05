// ─────────────────────────────────────────────────────────────
// Single source of truth untuk konfigurasi runtime.
//
//_eval `import.meta.env` hanya boleh dibaca satu file ini supaya
//_(magic string) `VITE_DEMO === "true"` tidak tersebar di 30+ modul.
// ─────────────────────────────────────────────────────────────

const ENV = import.meta.env;

/** Mode demo: data diambil dari IndexedDB (Dexie), bukan backend. */
export const IS_DEMO = ENV.VITE_DEMO === "true";

/** Mode development: tampilkan pesan error mentah dari server. */
export const IS_DEV = ENV.VITE_ENVIRONMENT === "development";

/** Base URL API. Demo tidak pernah menyentuh backend. */
export const API_BASE_URL =
  ENV.VITE_ENVIRONMENT === "production"
    ? ENV.VITE_BASE_API_URL
    : "http://localhost:5000/api";

export const API_UPLOAD_URL = ENV.VITE_BASE_API_UPLOAD;

/** Default options untuk seluruh query di aplikasi ini. */
export const QUERY_DEFAULTS = {
  staleTime: 1000 * 60 * 5, // data dianggap segar 5 menit
  gcTime: 1000 * 60 * 10, // cache dibuang 10 menit setelah tidak dipakai
  refetchOnWindowFocus: true,
  retry: 1,
};

export default {
  IS_DEMO,
  IS_DEV,
  API_BASE_URL,
  API_UPLOAD_URL,
  QUERY_DEFAULTS,
};
import { IS_DEV } from "@/config/env";

/**
 * Ambil pesan error yang aman untuk ditampilkan ke user.
 *
 * - 4xx: pesan dari server aman ditampilkan (validasi, auth, dll)
 * - 5xx / network: pesan server disembunyikan di production agar
 *   tidak membocorkan detail internal, hanya tampil di development
 */
export const getErrorMessage = (error, fallback = "terjadi kesalahan") => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message;

  if (status >= 400 && status < 500 && message) {
    return message;
  }

  if (IS_DEV) {
    return message || error?.message || fallback;
  }

  return fallback;
};
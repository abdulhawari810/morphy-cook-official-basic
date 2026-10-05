// ─────────────────────────────────────────────────────────────
// Konstanta domain.
//
// Nilai role di sini WAJIB sama dengan enum di backend:
//   backend/models/users.model.js -> ENUM("admin", "chief", "users")
//
// Catatan: backend memakai "chief" (bukan "chef"), jadi frontend
// mengikuti nilai tersebut agar role check di client tidak selalu
// gagal saat mode production.
// ─────────────────────────────────────────────────────────────

export const ROLES = {
  ADMIN: "admin",
  CHIEF: "chief",
  USER: "users",
};

/** Status akun; juga harus sama dengan enum backend. */
export const USER_STATUS = {
  ACTIVE: "active",
  IN_ACTIVE: "in_active",
  BANNED: "banned",
  DELETED: "deletes",
};

/** Status verifikasi 2FA. */
export const TWO_FACTOR_STATUS = {
  INACTIVE: "nonactive",
  ACTIVE: "active",
};

/**
 * Transisi status akun pada tabel admin.
 * Menentukan tombol aksi yang muncul untuk status saat ini.
 */
export const NEXT_USER_STATUS = {
  [USER_STATUS.ACTIVE]: USER_STATUS.BANNED,
  [USER_STATUS.IN_ACTIVE]: USER_STATUS.BANNED,
  [USER_STATUS.BANNED]: USER_STATUS.IN_ACTIVE,
  [USER_STATUS.DELETED]: USER_STATUS.IN_ACTIVE,
};
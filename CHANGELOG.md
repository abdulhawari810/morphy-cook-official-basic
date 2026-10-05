# Catatan Perubahan

Semua perubahan penting pada proyek ini didokumentasikan di file ini.

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), dan proyek ini mengikuti Semantic Versioning (`package.json: version 1.0.0`).

---

## [Belum dirilis]

### Ditambahkan

#### ⭐ Ulasan Resep (Review)

- Tambah tabel `reviews` (`backend/database/migrations/007_create_reviews_table.js`).
- Kolom: `userId`, `recipeId`, `rating` (1-5 wajib), `comment` (opsional, maks 1000 karakter).
- Satu user hanya boleh 1 review per resep (`unique[userId, recipeId]`).
- Endpoint di `backend/routes/review.routes.js` (base `/api/reviews`):
  - `GET /recipe/:recipeId` — publik, hanya resep `accept`, pagination.
  - `GET /recipe/:recipeId/summary` — publik, `{totalReviews, averageRating}`.
  - `GET /me` — login, lihat review milik sendiri.
  - `POST /recipe/:recipeId` — login, buat review (409 kalau sudah pernah).
  - `PATCH /:id` — pemilik saja.
  - `DELETE /:id` — pemilik atau admin.
- Relasi di `backend/models/relationship.model.js`: `users 1-N reviews`, `recipes 1-N reviews`.

### Diperbaiki

- `register` tidak lagi `ReferenceError` (`backend/controllers/auth.controller.js` pakai `UsersModels`, `count()`).
- Refresh token pakai `APP_REFRESH_SECRET`, ada rotasi + deteksi reuse, logout hapus token di DB.
- Challenge 2FA (`type: 2fa-login`) ditolak di `middleware/auth.js`, expiry 10 menit.
- Verifikasi OTP disatukan ke `speakeasy` (hapus import `otplib` yang rusak).
- CORS diperbaiki (`APP_ORIGIN || localhost:5173`).
- `DELETE favourite` kini `where: {userId, recipeId}` (tidak hapus milik orang lain).
- `getRecipesByAuthor` tidak lagi bocorkan `password`.
- `getRecipesById` / `getRecipesByCategory` publik hanya tampilkan `status: accept`.

### Rencana

- Lupa password
- Verifikasi email
- Reset password
- Alur pemulihan akun
- Komunikasi pemulihan akun dengan admin yang lebih baik
- Peningkatan autentikasi dan keamanan lanjutan
- Peningkatan manajemen resep dan user
- Opsi kustomisasi aplikasi tambahan
- Frontend untuk fitur review (service + komponen `ReviewSection`, saat ini baru API + dokumentasi di `docs/Customization/Components.md`)

---

## [1.0.0] - 2026-09-04

### Ditambahkan

#### 🌐 Dukungan Multi-bahasa

- Mendukung bahasa **Indonesia** dan **Inggris**.
- User bisa ganti bahasa dari pengaturan bahasa.
- Status: sudah jadi — `frontend/src/i18n.js`, `frontend/src/locales/id.json`, `en.json`, `frontend/src/components/profile/LanguageSection.jsx`.

#### 🎨 Dukungan Tema

- Pilihan tema aplikasi: Default, Light, Dark.
- User bisa ganti tema sesuai keinginan.
- Status: sudah jadi — `frontend/src/utils/theme.utils.js` (`useTheme()`), `frontend/src/components/profile/ThemeSection.jsx`.

#### 🔐 Autentikasi & Keamanan

- Registrasi dan login user.
- Autentikasi berbasis **JWT** (access token + refresh token).
- Dukungan **2FA (autentikasi dua faktor)** via TOTP/`speakeasy`.
- Status: sudah jadi — `backend/controllers/auth.controller.js`, `backend/controllers/qrcode.controller.js`, `backend/services/token.services.js`.

> **Catatan:** Lupa password dan verifikasi email belum ada di rilis ini, direncanakan untuk update berikutnya.

#### 👥 Hak Akses Berbasis Role (RBAC)

- Ada role **admin**, **chief**, **users**.
- Akses sumber daya dilindungi sesuai role.
- Status: sudah jadi — `backend/middleware/auth.js` (`verifyAdmin`, `verifyChef`), dipakai di `recipe.routes.js`, `users.routes.js`, `categories.routes.js`.

#### 🍳 Manajemen Resep

- User bisa kelola data resep sesuai izinnya.
- Admin bisa kelola semua resep (termasuk update status `draft/pending/reject/accept`).
- Status: sudah jadi — `backend/controllers/recipe.controller.js`, `backend/routes/recipe.routes.js`.

#### ❤️ Resep Favorit

- User bisa simpan dan hapus resep favorit.
- Status: sudah jadi — `backend/controllers/favourite.controller.js`, `backend/routes/favourite.routes.js` (`/api/favourite`).

#### 👤 Manajemen User

- Admin bisa kelola user terdaftar.
- Hak akses diatur lewat RBAC.
- Status: sudah jadi — `backend/controllers/users.controllers.js`, `backend/routes/users.routes.js`.

#### 🖼️ Upload Avatar

- User bisa upload avatar, disimpan di server backend (`uploads/avatars/`).
- Path file disimpan dan ditampilkan di profil.
- Status: sudah jadi — `backend/controllers/upload.controller.js`, `backend/middleware/upload.js`, `backend/routes/upload.routes.js`.

#### ✏️ Manajemen Profil

- User bisa update info profil dan avatar.
- Status: sudah jadi — `backend/controllers/profile.controller.js`, `backend/routes/profile.routes.js`.

#### 🗑️ Hapus Akun

- Akun yang dihapus (`is_active = deletes`) tidak bisa login lagi.
- Dianggap permanen dari sisi user, tidak ada pemulihan mandiri.
- Status: sudah jadi — `backend/controllers/users.controllers.js:391`, dicek di `middleware/auth.js` dan `auth.controller.js`.

> **Catatan:** Kalau akun terhapus tidak sengaja, harus hubungi administrator. Belum ada sistem pesan/pemulihan akun di dalam aplikasi.

---

### Cakupan Autentikasi

Fitur autentikasi di versi `1.0.0` yang sudah jadi:

- Register
- Login
- Autentikasi JWT
- Access token
- Refresh token
- Autentikasi 2FA
- Otorisasi berbasis role

Yang **belum ada**:

- Lupa password
- Verifikasi email
- Reset password
- Permintaan pemulihan akun

Fitur di atas mungkin hadir di rilis berikutnya.

---

### Keterbatasan yang Diketahui

- Akun yang dihapus tidak bisa dipulihkan sendiri oleh user.
- Belum ada mekanisme di aplikasi untuk menghubungi admin soal pemulihan akun.
- Fitur lupa password belum tersedia.
- Fitur verifikasi email belum tersedia.
- File avatar disimpan di server backend, bukan di layanan object-storage eksternal.
- Beberapa fitur keamanan/autentikasi masih bisa diperluas di rilis berikutnya.

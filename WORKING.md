# Log Kerja — Migrasi Database IndexedDB + Dexie

Catatan harian pengerjaan mockup data (IndexedDB/Dexie) dan kompatibilitasnya
dengan backend. Format: tanggal terbaru di atas.

---

## 05-10-2026

### Tugas selesai hari ini

#### Mockup Reviews (baru, sejajar backend):

- Tabel `reviews` di `db.js` (Dexie version 4): `userId, recipeId, rating, [userId+recipeId]`
- `reviewMock` di `mockup.js`: `getReviewsByRecipe` (filter accept + pagination), `getReviewSummaryByRecipe` (Σ rating / total, 1 desimal), `getMyReviews`, `createReview` (rating 1-5, komentar maks 1000, unik per user per resep), `updateReview` (owner), `deleteReview` (owner/admin)
- Pesan error review ID/EN di `mockup.errors.js` (11 key)
- Seed 3 review contoh di `seeders.js`

#### Seed 100 resep + 20 kategori:

- `seeders.js`: 20 kategori unik, 100 resep unik (20 lama dipertahankan + 80 baru khas Indonesia)
- Resep disebar round-robin ke semua kategori (sebelumnya semua numpuk di `breakfast`)
- Status: mayoritas `accept`, sebagian kecil `pending`/`draft`

#### Perbaikan seeding otomatis:

- `seedDemoUsers` pakai `DEMO_SEED_VERSION` di localStorage: versi beda atau tabel kosong = reset penuh + seed ulang tahap per tahap (bukan 1 transaksi raksasa)
- `main.jsx`: seeding dibungkus try/catch + log `[demo-seed]` supaya aplikasi tetap tampil walau seeding gagal
- Helper debug: `await window.resetDemoData()` di console browser untuk paksa seed ulang
- Fix bug role: query `chief` tidak pernah cocok karena backend memakai ejaan `chief` (`constants.js`) — diganti ke konstanta `ROLES`

#### Perbaikan pagination:

- `pagination.components.jsx`: `clampPage(totalPage, 1)` selalu menghasilkan 1 (argumen kedua adalah batas atas) — total halaman kini dihitung apa adanya

---

## 30-09-2026

### Tugas selesai hari ini

#### Review & fix kompatibilitas backend vs frontend mockup:

- Review skema database backend (Sequelize) vs frontend mockup (Dexie/IndexedDB) — 90% cocok
- Fix 4 item ketidaksesuaian:
  1. `two_factor_enabled`: boolean → enum string (`active`/`nonactive`) di `seeders.js`, `mockup.js`, `db.js`
  2. `is_active`: `delete` → `deletes` (samakan enum backend) di `mockup.js`
  3. `ingredients` & `instructions` resep: parse JSON string → object di `createRecipe` & `updateRecipe`
  4. Migrasi DB v3: default `two_factor_enabled` `false` → `nonactive`
- Verifikasi switching `IS_DEMO=false`: backend tetap connect via axios + health check

#### Code cleanup backend (3 prioritas):

- **Hapus unreachable code**: 8 controller, 20+ fungsi (recipe, categories, users, auth, profile, qrcode, favourite)
  - Pattern `if-else return` diikuti `success()` tanpa return → diubah ke pattern `if-else if-return`
- **Fix typo**: `generate2FAChallangeToken.js` → `generate2FAChallengeToken.js` + update import
- **Standardisasi import model**: semua controller pakai `../models/initialize.model.js`
- **Bonus**: tambah `return` yang hilang di semua pemanggilan `success()`, fix bug `err.name`, fix pengecekan `!category`

#### UI improvement:

- Tambah tombol "Kembali ke Beranda" / "Back to Home" di halaman Login & Register
- Tambah translation key `backToHome` di `id.json` & `en.json`
- Styling: full width, teks abu-abu, hover orange, dukung dark mode

---

## 28-09-2026

### Tugas selesai hari ini

#### Mockup API:

- Menambahkan mockup API lengkap sesuai folder hooks (profile, qrcode/2FA, upload, users)
- Membuat file `mockup.errors.js` untuk pesan error i18n (ID/EN)
- Mengubah semua throw error di `mockup.js` memakai `getMockupError()`
- Menambahkan section `mockup` ke locales (`id.json`, `en.json`)

#### Profile:

- Memperbaiki hook `useProfile` untuk struktur response demo/production
- Memperbaiki `ProfileSection.jsx`: tampilkan data dari IndexedDB, refresh setelah update
- Menambahkan `queryClient.invalidateQueries` setelah create/update profile

#### QRCode / 2FA:

- Memperbaiki struktur response qrCode (`res.data.data` → `res.data`)
- Memakai QRCodeSVG dari `qrcode.react` untuk tampilkan gambar QR
- Implementasi TOTP RFC 6238 dengan encoding Base32 (RFC 4648)
- Secret di-generate sebagai Base32 valid (kompatibel Google Authenticator)
- `verify2FAS` dan `verify2FasLogin` memakai verifikasi berbasis secret

#### Skema IndexedDB:

- Menambahkan field 2FA di tabel users: `two_factor_enabled`, `two_factor_temp_secret`, `two_factor_secret`, `two_factor_updateAt`
- Upgrade skema ke version 2 dan 3 dengan upgrade script
- Menambahkan fungsi `resetDatabase()`

#### Dashboard admin users:

- Memperbaiki hook `useAllUsers` dan `useSingleUsers` untuk struktur response
- Memperbaiki `usersMock.getAllUsers`: filter by role/status/verified, sort, search
- Proteksi admin: tidak bisa diubah, di-banned, atau dihapus

#### Upload avatar:

- Mengubah penyimpanan avatar menjadi base64 di IndexedDB
- Memperbaiki tampilan avatar di `ProfileSection` dan table component

#### Form upload (chef recipe):

- Menambahkan tipe field `file` di `FormComponent`
- Membuat komponen `FileUploadField` dengan drag & drop
- Membuat komponen Button (shadcnUI)
- Mengubah input thumbnail menjadi file upload dengan preview

#### Bug fix:

- Memperbaiki error "Rendered more hooks than during the previous render" (useRef di dalam conditional)
- Memperbaiki format key pesan error (UPPER_SNAKE_CASE → lower_snake_case)

---

## 25-09-2026

### Tugas selesai hari ini

#### recipesMock:

- createRecipe
- updateStatusRecipes
- updateRecipe
- deleteRecipe

---

## 24-09-2026

### Tugas selesai hari ini

#### recipesMock:

- getRecipeById

#### favouriteMock:

- getAllFavourite
- createFavourite
- deleteFavourite
- countFavourite

---

## 23-09-2026

### Tugas selesai hari ini

#### recipesMock:

- getAllRecipes
- getRecipesForAdmin
- getRecipesByAuthor
- countRecipeByAuthor
- countAllRecipesStatus

#### categoryMock:

- getAllCategories

---

## 21-09-2026

### Tugas selesai hari ini

#### authMock:

- login
- me
- register
- logout
- updatePassword

---

## Fitur mockup data yang tersedia (status: selesai)

Tabel IndexedDB (`db.js`, Dexie version 4): `users`, `recipes`, `categories`, `favourite`, `profile_information`, `refresh_token`, `reviews`.

| Mockup | Fungsi | Status |
| --- | --- | --- |
| `authMock` | login, me, register, logout, updatePassword, verify2FasLogin | Selesai |
| `categoryMock` | getAllCategories | Selesai |
| `categoryMockExtended` | createCategories, createAllCategories, deleteCategoriesById | Selesai |
| `recipesMock` | getAllRecipes, getRecipesForAdmin, getRecipesByAuthor, countRecipeByAuthor, countAllRecipesStatus, getRecipeById, createRecipe, updateStatusRecipes, updateRecipe, deleteRecipe | Selesai |
| `recipesMockExtended` | getRecipesByCategory | Selesai |
| `favouriteMock` | getAllFavourite, countFavourite, createFavorite, deleteFavourite | Selesai |
| `profileMock` | getProfile, createProfile, updateProfile | Selesai |
| `qrcodeMock` | setup2FAS, verify2FAS, disable2FAS (TOTP Base32, kompatibel Google Authenticator) | Selesai |
| `uploadMock` | avatarUpload (base64 ke IndexedDB) | Selesai |
| `usersMock` | getAllUsers (search/filter/sort), getUserById, updateUserById, updateProfileUsers, updateStatusUsers, deleteUser (proteksi admin) | Selesai |
| `reviewMock` | getReviewsByRecipe, getReviewSummaryByRecipe, getMyReviews, createReview, updateReview, deleteReview | Selesai |

Data seed (`seeders.js`, otomatis saat `VITE_DEMO=true`): 3 users (admin/chief/users), 20 kategori, 100 resep (round-robin per kategori), 3 review contoh. Versi seed dilacak via `demo_seed_version` di localStorage.

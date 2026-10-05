<style>
  *{
    transition: all ease-in-out .2s;
  }
  .drawer{
    display:none;
    position: fixed; top: 70px; right: 0px; width: 250px; background: rgba(255, 255, 255, 1); padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;
    height: fit-content;
  }
  .box-menu{
    position: fixed; top: 20px; right: 0px; width: 20px;height:20px; display: flex; flex-direction:column; justify-content:center; align-items:center;background:white;border-radius:10px;padding:10px;cursor:pointer;overflow:hidden;
  }
  .box-menu span {
    position:absolute;width:60%;height:3px;background:black;border-radius:30px;
  }
  .box-menu span:nth-child(1){
    transform:translateY(7px);
  }
  .box-menu span:nth-child(2){
    transform:translateY(-7px);
  }
  b{
    color: #091540;
  }
  .box-menu-items{
    margin: 5px 0 0 0; padding-left: 20px; padding: 5px 20px; overflow:scroll; scrollbar-width: none;font-size: 14px;color: #091540; font-size:14px;
  }
  .menu-items .title{
    color: #091540; text-decoration: none; font-size:16px;
  }
  .list{
    padding:0; padding-left:12px; color:#1B2CC1;
  }
  .menu-items .items {
    color:#1B2CC1; text-decoration: none;
  }
  #nav-toggle{
    display: none;
  }
  #nav-toggle:checked ~ .drawer{
    display: flex;
    flex-direction:column;
  }
  #nav-toggle:checked ~ .box-menu span:nth-child(1){
    transform:rotate(45deg);
  }
  #nav-toggle:checked ~ .box-menu span:nth-child(2){
    transform:rotate(-220deg);
  }
  #nav-toggle:checked ~ .box-menu span:nth-child(3){
    transform:translateX(-220px);
    transition: all ease-in-out 0s;
  }
</style>

<input type="checkbox" id="nav-toggle">
<label for="nav-toggle" class="box-menu">
    <span class="menu"></span>
    <span class="menu"></span>
    <span class="menu"></span>
</label>

<div class="drawer">
  <b>Menu List</b>
  <ul class="box-menu-items">
      <li class="menu-items">
        <a href="#configuration" class="title">Configuration Overview</a>
      </li>
      <li class="menu-items">
        <a href="#frontend" class="title">Frontend</a>
      </li>
      <li class="menu-items">
        <a href="#backend" class="title">Backend</a>
      </li>
      <li class="menu-items">
        <a href="#database" class="title">Database Migration & Seeders</a>
      </li>
      <li class="menu-items">
        <a href="#flow" class="title">Configuration Flow</a>
      </li>
      <li class="menu-items">
        <a href="#changes" class="title">Where to Make Changes</a>
      </li>
      <li class="menu-items">
        <a href="#important" class="title">Important Note</a>
      </li>
      <li class="menu-items">
        <a href="#roadmap" class="title">Roadmap Documentation</a>
      </li>
  </ul>
</div>

# Konfigurasi Proyek

Dokumen ini menjelaskan bagian penting proyek. Cocok untuk pemula yang baru mulai.

Proyek dibagi dua aplikasi:

- **Frontend** — Tampilan, tombol, halaman, dan permintaan API.
- **Backend** — API, database, login, CORS, session, dan pengaturan server.

<h2 id="configuration">Gambaran Konfigurasi</h2>

Bagian penting proyek:

```text
Project
│
├── Frontend
│   ├── src/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── ...
│   │
│   ├── .env
│   └── API
│
└── Backend
    ├── .env
    ├── app.js
    └── config/
        └── database.js
```

Setiap bagian punya tugas sendiri.

<h2 id="frontend">Konfigurasi Frontend</h2>

Frontend mengatur tampilan dan cara bicara ke backend.

### 1. Folder `src/`

1. Ini isi utama kode frontend.
2. Di sini ada komponen, halaman, hooks, dan services.
3. Kalau mau ubah tampilan, ubah file di sini.

### 2. File `.env`

1. File `.env` ada di folder `frontend`.
2. Isinya seperti ini:

```env
VITE_ENVIRONMENT=development
VITE_BASE_API_URL=http://localhost:5000
VITE_BASE_API_UPLOAD=http://localhost:5000/uploads
```

3. Variabel ini mengatur alamat API backend.
4. Info lengkap ada di [Environment Variables.md](./Environment_Variables.md).

### 3. Folder `services/`

1. Folder ini berisi file penghubung ke API backend.
2. Satu file biasanya untuk satu fitur.
3. Contoh:

```text
services/
├── auth.service.js
├── recipe.service.js
├── user.service.js
├── review.service.js
└── ...
```

4. Jangan taruh permintaan API langsung di komponen. Taruh di service.
5. Fitur review juga punya service sendiri. Contoh: ambil review resep, tambah review, hapus review.

### 4. Folder `hooks/`

1. Folder ini berisi React hooks buatan sendiri.
2. Gunanya untuk ambil, tambah, ubah, dan hapus data.
3. Contoh:

```text
hooks/
├── useGetRecipes.js
├── useCreateRecipe.js
├── useUpdateRecipe.js
├── useDeleteRecipe.js
├── useGetReviews.js
└── ...
```

4. Hooks biasanya memanggil service.

### 5. Konfigurasi `API`

1. Bagian ini mengatur koneksi Axios ke backend.
2. Alurnya seperti ini:

```text
Frontend
   │
   ├── API
   │    └── Pengaturan Axios
   │
   ├── Services
   │    └── Minta data ke endpoint
   │
   └── Hooks
        └── Get / Create / Update / Delete
```

3. API membaca nilai dari:

```env
VITE_BASE_API_URL=http://localhost:5000
```

4. Jadi pindah lingkungan (lokal ke hosting) cukup ubah `.env`.

<h2 id="backend">Konfigurasi Backend</h2>

Backend mengatur server dan logika aplikasi.

### 1. File `.env`

1. File `.env` ada di folder `backend`.
2. Contoh isi:

```env
# APP

APP_ENVIRONMENT=development
APP_PORT=5000
APP_HOST=localhost
APP_ORIGIN=http://localhost:5173
APP_ACCESS_SECRET=your_access_secret
APP_REFRESH_SECRET=your_refresh_secret
APP_SESS_SECRET=your_session_secret

# DATABASE

APP_DATABASE_HOST=localhost
APP_DATABASE_NAME=morphy_cook
APP_DATABASE_USERNAME=root
APP_DATABASE_PASSWORD=your_mysql_password
APP_DATABASE_PORT=3306

# SEED table users column email and password

SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=admin_password
SEED_CHIEF_EMAIL=chief@example.com
SEED_CHIEF_PASSWORD=chief_password
SEED_USER_EMAIL=user@example.com
SEED_USER_PASSWORD=user_password
```

3. Nilai ini dipakai untuk database, server, CORS, dan keamanan login.
4. Info tiap variabel ada di [Environment Variables.md](./Environment_Variables.md).

### 2. File `app.js`

1. File `app.js` adalah pengaturan utama backend.
2. Di sini diatur:

- CORS
- Session
- Host server
- Port server
- Middleware

3. Nilai diambil dari `.env`. Alurnya:

```text
.env
 │
 ├── APP_HOST
 ├── APP_PORT
 ├── APP_ORIGIN
 └── APP_SESS_SECRET
        │
        ▼
     app.js
        │
        ├── Pengaturan Server
        ├── Pengaturan CORS
        └── Pengaturan Session
```

4. Kalau mau ubah port atau CORS, cek `app.js` dan `.env`.

### 3. File `config/database.js`

1. File ini mengatur koneksi ke MySQL.
2. Dia membaca:

```env
APP_DATABASE_HOST=localhost
APP_DATABASE_NAME=morphy_cook
APP_DATABASE_USERNAME=root
APP_DATABASE_PASSWORD=your_mysql_password
APP_DATABASE_PORT=3306
```

3. Alurnya:

```text
Backend
   │
   │ config/database.js
   ▼
Koneksi MySQL
   │
   ├── Nama Database
   ├── Username
   └── Password
```

4. Kalau koneksi gagal, cek file ini dan `.env` backend.

<h2 id="database">Migrasi Database & Seeder</h2>

Backend punya fitur migrasi dan seeder.

- **Migrasi** = Cara membuat tabel database yang rapi dan tercatat.
- **Seeder** = Cara mengisi data awal. Contoh: akun admin, kategori, resep.

Jadi kamu tidak perlu buat tabel manual satu per satu.

### 1. Migrasi

1. Migrasi membuat tabel dan relasi yang dibutuhkan aplikasi.
2. Daftar tabel:

- `users`
- `profile_information`
- `categories`
- `recipes`
- `favourite`
- `refresh_tokens`
- `reviews`

3. Daftar file migrasi di `backend/database/migrations/`:

```text
001_create_users_table.js
002_create_categories_table.js
003_create_profile_information_table.js
004_create_recipes_table.js
005_create_refresh_tokens_table.js
006_create_favourite_table.js
007_create_reviews_table.js
```

4. Tabel `reviews` menyimpan ulasan resep. Isinya antara lain `userId`, `recipeId`, `rating`, dan `comment`.
5. Alur migrasi:

```text
File Migrasi
      │
      ▼
Perintah Migrasi Database
      │
      ▼
Database MySQL
      │
      ├── users
      ├── profile_information
      ├── categories
      ├── recipes
      ├── favourite
      ├── refresh_tokens
      └── reviews
```

6. Relasi penting tabel `reviews`:

```text
users (1) ───< reviews (N)      lewat userId
recipes (1) ───< reviews (N)    lewat recipeId
```

Artinya:

- Satu user bisa menulis banyak review. (users 1-N reviews)
- Satu resep bisa punya banyak review. (recipes 1-N reviews)
- Kalau resep dihapus, review ikut terhapus (CASCADE).

7. Sebelum migrasi, pastikan `.env` backend sudah benar:

```env
APP_DATABASE_HOST=localhost
APP_DATABASE_NAME=morphy_cook
APP_DATABASE_USERNAME=root
APP_DATABASE_PASSWORD=your_mysql_password
APP_DATABASE_PORT=3306
```

8. Jalankan migrasi setelah database MySQL dibuat.

Contoh perintah (sesuaikan dengan `package.json` backend):

```bash
cd backend
npx knex migrate:latest
```

### 2. Seeder

1. Seeder mengisi data awal agar aplikasi bisa langsung dicoba.
2. Data awal meliputi:

- Akun admin
- Akun chef
- Akun user biasa
- Kategori resep
- Data resep
- Data awal lain

3. Ada tiga peran user:

```text
admin
chief
users
```

4. Email dan password awal diambil dari `.env`:

```env
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=admin_password
SEED_CHIEF_EMAIL=chief@example.com
SEED_CHIEF_PASSWORD=chief_password
SEED_USER_EMAIL=user@example.com
SEED_USER_PASSWORD=user_password
```

5. Jangan tulis password asli langsung di file seeder. Taruh di `.env`.

### 3. Seeder Resep

1. Seeder resep mengisi tabel `recipes`.
2. Setiap resep butuh user dan kategori yang sudah ada.
3. Gunakan:

- User peran `chief` sebagai penulis resep.
- Kategori `breakfast` sebagai kategori resep.

4. Relasinya:

```text
users
  │
  │ userId
  ▼
recipes
  │
  │ categoryId
  ▼
categories
```

5. Contoh:

```text
User
└── role: chief

Category
└── slug: breakfast

Recipe
├── userId: user chief
└── categoryId: kategori breakfast
```

6. Pastikan data chief dan kategori ada dulu sebelum isi resep.

### 4. Seeder Review (Opsional)

1. Tabel `reviews` butuh `userId` dan `recipeId` yang sudah ada.
2. Jadi urutan yang aman: isi users dulu, lalu recipes, baru reviews.
3. Contoh relasi:

```text
User (user biasa)
  │
  │ userId
  ▼
reviews
  ▲
  │ recipeId
  │
Recipe (milik chief)
```

### 5. Urutan Menjalankan Migrasi dan Seeder

Ikuti urutan ini:

```text
1. Buat database MySQL
        │
        ▼
2. Isi file backend .env
        │
        ▼
3. Jalankan migrasi (termasuk 007_create_reviews_table.js)
        │
        ▼
4. Jalankan seeder users
        │
        ▼
5. Jalankan seeder categories
        │
        ▼
6. Jalankan seeder recipes
        │
        ▼
7. Jalankan backend
```

Contoh perintah (sesuaikan dengan proyek kamu):

```bash
cd backend
npx knex migrate:latest
npx knex seed:run
npm run dev
```

4. Selalu jalankan migrasi dulu sebelum seeder.
5. Kalau seeder butuh data tabel lain, isi tabel induk dulu.
6. Contoh: seeder resep butuh user `chief` dan kategori `breakfast`.

### 6. Variabel `.env` untuk Seeder

```env
# APP
APP_ENVIRONMENT=development
APP_PORT=5000
APP_ORIGIN=http://localhost:5173
APP_ACCESS_SECRET=your_access_secret
APP_REFRESH_SECRET=your_refresh_secret
APP_SESS_SECRET=your_session_secret

# DATABASE
APP_DATABASE_HOST=localhost
APP_DATABASE_NAME=morphy_cook
APP_DATABASE_USERNAME=root
APP_DATABASE_PASSWORD=your_mysql_password
APP_DATABASE_PORT=3306

# SEED table users column email and password
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=admin_password
SEED_CHIEF_EMAIL=chief@example.com
SEED_CHIEF_PASSWORD=chief_password
SEED_USER_EMAIL=user@example.com
SEED_USER_PASSWORD=user_password
```

- `APP_*` dipakai aplikasi dan koneksi database.
- `SEED_*` dipakai untuk membuat user awal.
- Info lengkap ada di [Environment Variables.md](./Environment_Variables.md).

### 7. Catatan Penting Database

1. File migrasi dan seeder adalah bagian kode proyek. Jangan ubah database produksi manual kalau bisa pakai migrasi.
2. Kalau struktur berubah, buat migrasi baru. Jangan ubah migrasi lama yang sudah jalan.
3. Buat seeder agar aman dijalankan ulang. Hindari data ganda.
4. Sebelum jalan di produksi, pahami dulu: perintah ini buat, ubah, atau hapus data?

<h2 id="flow">Alur Konfigurasi</h2>

Alur frontend ke backend:

```text
                    FRONTEND
                       │
                       ▼
                     .env
                       │
              VITE_BASE_API_URL
                       │
                       ▼
                      API
                Pengaturan Axios
                       │
                       ▼
                   Services
             Minta data ke endpoint
                       │
                       ▼
                    Hooks
           Get / Create / Update / Delete
                       │
                       ▼
                    BACKEND
                       │
                       ▼
                    app.js
           ┌───────────┼───────────┐
           │           │           │
         CORS       Session      Server
           │           │           │
           └───────────┼───────────┘
                       │
                       ▼
              config/database.js
                       │
           ┌────────────┴────────────┐
           │                         │
           ▼                         ▼
       Migrasi                    Seeder
           │                         │
           │                    ┌────┼────┐
           │                    │    │    │
           │                  Users Categories Recipes
           │
           └────────────┬────────────┘
                       │
                       ▼
                     MySQL
                       │
                       ├── users 1-N reviews
                       └── recipes 1-N reviews
```

<h2 id="changes">Di Mana Harus Ubah?</h2>

Panduan cepat:

| Kebutuhan | Lokasi |
| ------------------------------ | ---------------------------- |
| Pengaturan frontend | `frontend/.env` |
| Kode frontend | `frontend/src/` |
| Pengaturan API / Axios | `frontend/API` |
| Minta data API | `frontend/src/services/` |
| Hooks Get/Create/Update/Delete | `frontend/src/hooks/` |
| Service dan hooks review | `frontend/src/services/review.service.js`, `frontend/src/hooks/useGetReviews.js` |
| Pengaturan backend | `backend/.env` |
| Pengaturan server | `backend/app.js` |
| Pengaturan CORS | `backend/app.js` |
| Pengaturan session | `backend/app.js` |
| Koneksi database | `backend/config/database.js` |
| Migrasi database | `backend/database/migrations/` |
| File migrasi review | `backend/database/migrations/007_create_reviews_table.js` |
| Seeder database | `backend/database/seeders/` |
| Kredensial database | `backend/.env` |
| Email dan password seeder | `backend/.env` |
| Kunci JWT | `backend/.env` |
| Rute review | `backend/routes/review.routes.js` |
| Model review | `backend/models/review.model.js` |

<h2 id="important">Catatan Penting</h2>

1. Cek dulu file `.env` sebelum ubah kode.
2. Jangan tulis langsung di kode:

- Password database
- URL API
- Kunci login (JWT)
- Kunci session
- Nilai yang beda tiap lingkungan

3. Data sensitif harus di `.env`. Jangan upload `.env` asli ke repo publik.
4. Migrasi dan seeder adalah bagian penting backend.
5. Di komputer baru: jalankan migrasi dulu, lalu seeder.
6. Pastikan `.env` database dan seeder sudah benar.
7. Kredensial seeder hanya untuk lokal, testing, atau setup awal. Jangan pakai password produksi asli di repo.

<h2 id="roadmap" style="padding-top:10px;">Roadmap Documentation</h2>

### Introduction

<ul>
  <li><a href="../Introduction/Overview.md">Overview</a></li>
  <li><a href="../Introduction/Features.md">Features</a></li>
  <li><a href="../Introduction/Requirements.md">Requirements</a></li>
</ul>

### Getting Started

<ul>
  <li><a href="../Getting Started/Installation.md">Installation</a></li>
  <li><a href="../Getting Started/Configuration.md">Configuration</a></li>
  <li><a href="../Getting Started/Environment_Variables.md">Environment Variables</a></li>
  <li><a href="../Getting Started/Running_Locally.md">Running Locally</a></li>
</ul>

### Customization

<ul>
  <li><a href="../Customization/Components.md">Components</a></li>
  <li><a href="../Customization/Language.md">Language</a></li>
  <li><a href="../Customization/Theme.md">Theme</a></li>
</ul>

### Deployment

<ul>
  <li><a href="../Deployment/Vercel.md">Frontend to Vercel</a></li>
  <li><a href="../Deployment/Railway.md">Backend to Railway</a></li>
</ul>

### [Troubleshooting](../Troubleshooting/troubleshooting.md)

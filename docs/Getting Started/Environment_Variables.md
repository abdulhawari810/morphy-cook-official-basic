<style>
  *{
    transition: all ease-in-out .2s;
  }
  .drawer{
    display:none;
    position: fixed; top: 70px; right: 0px; width: 300px; background: rgba(255, 255, 255, 1); padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;
    height: 300px;
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
        <a href="#environment" class="title">Environment Variables</a>
      </li>
      <li class="menu-items">
        <a href="#frontend" class="title">Frontend</a>
      </li>
      <li class="menu-items">
        <a href="#backend" class="title">Backend</a>
      </li>
      <li class="menu-items">
        <a href="#database" class="title">Database Configuration</a>
      </li>
      <li class="menu-items">
        <a href="#application" class="title">Application Configuration</a>
      </li>
      <li class="menu-items">
        <a href="#authentication" class="title">Authentication Secrets</a>
      </li>
      <li class="menu-items">
        <a href="#relationship" class="title">Frontend and Backend Relationship</a>
      </li>
      <li class="menu-items">
        <a href="#production" class="title">Production Configuration</a>
      </li>
      <li class="menu-items">
        <a href="#security" class="title">Security Recommendations</a>
      </li>
      <li class="menu-items">
        <a href="#env_file" class="title">Environment Files</a>
      </li>
      <li class="menu-items">
        <a href="#important" class="title">Important Note About Vite Variables</a>
      </li>
      <li class="menu-items">
        <a href="#roadmap" class="title">Roadmap Documentation</a>
      </li>
  </ul>
</div>

<h1 id="environment">Variabel Environment</h1>

Dokumen ini menjelaskan variabel environment untuk **Frontend** dan **Backend**.

Variabel environment menyimpan pengaturan di luar kode. Gunanya untuk alamat API, database, kunci login, dan data awal seeder.

> **Peringatan:** Jangan upload file `.env` asli ke repo publik. Jaga password dan kunci rahasia.

<h2 id="frontend">Variabel Frontend</h2>

1. Frontend memakai Vite. Semua variabel harus diawali `VITE_`.
2. Buat file `.env` di folder `frontend`.
3. Isi dasarnya:

```env
VITE_ENVIRONMENT=development
VITE_BASE_API_URL=http://localhost:5000
VITE_BASE_API_UPLOAD=http://localhost:5000/uploads
```

### 1. `VITE_ENVIRONMENT`

1. Menentukan mode jalan frontend.
2. Contoh:

```env
VITE_ENVIRONMENT=development
```

3. Pilihan umum:

- `development` — Untuk latihan di komputer sendiri.
- `production` — Untuk aplikasi yang sudah online.

### 2. `VITE_BASE_API_URL`

1. Alamat backend API yang dipakai frontend.
2. Contoh lokal:

```env
VITE_BASE_API_URL=http://localhost:5000
```

3. Contoh produksi:

```env
VITE_BASE_API_URL=https://api.example.com
```

4. Semua fitur frontend (resep, user, favorit, review) memakai URL ini. Jadi kalau URL salah, semua data gagal dimuat.

### 3. `VITE_BASE_API_UPLOAD`

1. Alamat untuk membuka file upload. Contoh: foto avatar.
2. Contoh lokal:

```env
VITE_BASE_API_UPLOAD=http://localhost:5000/uploads
```

3. Contoh produksi:

```env
VITE_BASE_API_UPLOAD=https://api.example.com/uploads
```

4. Sesuaikan dengan cara backend menyajikan file upload.

<h2 id="backend">Variabel Backend</h2>

1. Backend memakai variabel untuk server, CORS, database, keamanan login, dan data seeder.
2. Buat file `.env` di folder `backend`.
3. Isi dasarnya:

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

4. Kelompok variabel ada tiga:

- **Aplikasi** — Mengatur server backend.
- **Database** — Mengatur koneksi MySQL.
- **Seed** — Email dan password awal untuk seeder.

5. Fitur review tidak butuh variabel baru. Selama database dan API benar, review ikut jalan. Termasuk tabel `reviews` dari migrasi `007_create_reviews_table.js`.

<h2 id="database">Pengaturan Database</h2>

Variabel ini menghubungkan backend ke MySQL.

### 1. `APP_DATABASE_HOST`

1. Alamat server MySQL.
2. Contoh:

```env
APP_DATABASE_HOST=localhost
```

3. Kalau database online, isi dengan host dari penyedia database.

### 2. `APP_DATABASE_NAME`

1. Nama database yang dipakai.
2. Contoh:

```env
APP_DATABASE_NAME=morphy_cook
```

3. Buat dulu database-nya di MySQL sebelum jalan backend.

### 3. `APP_DATABASE_USERNAME`

1. Username untuk login ke MySQL.
2. Contoh:

```env
APP_DATABASE_USERNAME=root
```

3. Sesuaikan dengan user MySQL di komputer kamu.

### 4. `APP_DATABASE_PASSWORD`

1. Password untuk login ke MySQL.
2. Contoh:

```env
APP_DATABASE_PASSWORD=your_mysql_password
```

3. Jangan sebar password asli ke publik.

### 5. `APP_DATABASE_PORT`

1. Port server MySQL.
2. Contoh:

```env
APP_DATABASE_PORT=3306
```

3. Port bawaan MySQL adalah `3306`.
4. Kalau MySQL kamu pakai port lain, ganti nilainya.

<h2 id="application">Pengaturan Aplikasi</h2>

Variabel ini mengatur server backend.

### 1. `APP_ENVIRONMENT`

1. Mode jalan backend.
2. Contoh:

```env
APP_ENVIRONMENT=development
```

3. Pilihan umum:

- `development` — Untuk latihan lokal.
- `production` — Untuk server online.

### 2. `APP_HOST`

1. Alamat backend mendengarkan permintaan.
2. Contoh lokal:

```env
APP_HOST=localhost
```

3. Contoh produksi (banyak hosting butuh ini):

```env
APP_HOST=0.0.0.0
```

### 3. `APP_PORT`

1. Port backend.
2. Contoh:

```env
APP_PORT=5000
```

3. Frontend harus menunjuk ke alamat dan port yang sama. Contoh:

```env
VITE_BASE_API_URL=http://localhost:5000
```

### 4. `APP_ORIGIN`

1. Alamat frontend yang boleh mengakses backend.
2. Contoh lokal:

```env
APP_ORIGIN=http://localhost:5173
```

3. Contoh produksi:

```env
APP_ORIGIN=https://example.com
```

4. Nilai ini penting untuk CORS. Kalau salah, API diblokir browser.
5. Sesuaikan dengan alamat frontend yang sebenarnya.

<h2 id="authentication">Kunci Keamanan Login</h2>

Variabel ini menjaga keamanan token dan session.

### 1. `APP_ACCESS_SECRET`

1. Kunci untuk access token.
2. Contoh:

```env
APP_ACCESS_SECRET=your_access_secret
```

3. Pakai teks acak yang panjang di produksi.

### 2. `APP_REFRESH_SECRET`

1. Kunci untuk refresh token.
2. Contoh:

```env
APP_REFRESH_SECRET=your_refresh_secret
```

3. Harus beda dengan `APP_ACCESS_SECRET`.

### 3. `APP_SESS_SECRET`

1. Kunci untuk session aplikasi.
2. Contoh:

```env
APP_SESS_SECRET=your_session_secret
```

3. Pakai nilai kuat dan unik, terutama di produksi.

<h2 id="seed">Pengaturan Seed</h2>

1. Variabel seed dipakai saat menjalankan seeder database.
2. Seeder membuat user awal di tabel `users`.
3. Isi sebelum jalan perintah seed.

### 1. `SEED_ADMIN_EMAIL` dan `SEED_ADMIN_PASSWORD`

```env
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=admin_password
```

Ini akun **Admin** awal. Pakai password kuat di produksi.

### 2. `SEED_CHIEF_EMAIL` dan `SEED_CHIEF_PASSWORD`

```env
SEED_CHIEF_EMAIL=chief@example.com
SEED_CHIEF_PASSWORD=chief_password
```

Ini akun **Chief** awal. Chief biasanya penulis resep.

### 3. `SEED_USER_EMAIL` dan `SEED_USER_PASSWORD`

```env
SEED_USER_EMAIL=user@example.com
SEED_USER_PASSWORD=user_password
```

Ini akun **User** biasa. User biasa bisa coba fitur favorit dan review.

> Jaga email dan password seed. Jangan upload password asli ke repo publik.

<h2 id="complete-frontend">Contoh Lengkap Frontend</h2>

Contoh untuk latihan lokal:

```env
VITE_ENVIRONMENT=development
VITE_BASE_API_URL=http://localhost:5000
VITE_BASE_API_UPLOAD=http://localhost:5000/uploads
```

<h2 id="complete-backend">Contoh Lengkap Backend</h2>

Contoh untuk latihan lokal:

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

Ganti nilainya sesuai komputer kamu.

<h2 id="relationship">Hubungan Frontend dan Backend</h2>

1. Beberapa variabel harus cocok satu sama lain.
2. Contoh alur lokal:

```text
Frontend
http://localhost:5173
       │
       │ VITE_BASE_API_URL
       ▼
Backend
http://localhost:5000
       │
       │ Kredensial database
       ▼
MySQL
localhost:3306
```

3. Frontend ini:

```env
VITE_BASE_API_URL=http://localhost:5000
```

harus cocok dengan backend ini:

```env
APP_HOST=localhost
APP_PORT=5000
```

4. Backend ini:

```env
APP_ORIGIN=http://localhost:5173
```

harus sama dengan alamat frontend yang sebenarnya.

5. Koneksi database backend:

```env
APP_DATABASE_HOST=localhost
APP_DATABASE_PORT=3306
```

harus menunjuk ke MySQL yang jalan.

<h2 id="production">Pengaturan Produksi</h2>

1. Sebelum online, ubah variabel sesuai hosting kamu.
2. Contoh frontend produksi:

```env
VITE_ENVIRONMENT=production
VITE_BASE_API_URL=https://api.example.com
VITE_BASE_API_UPLOAD=https://api.example.com/uploads
```

3. Contoh backend produksi:

```env
# APP

APP_ENVIRONMENT=production
APP_PORT=5000
APP_HOST=0.0.0.0
APP_ORIGIN=https://example.com
APP_ACCESS_SECRET=strong_random_access_secret
APP_REFRESH_SECRET=strong_random_refresh_secret
APP_SESS_SECRET=strong_random_session_secret

# DATABASE

APP_DATABASE_HOST=production_database_host
APP_DATABASE_NAME=production_database
APP_DATABASE_USERNAME=production_database_user
APP_DATABASE_PASSWORD=production_database_password
APP_DATABASE_PORT=3306

# SEED table users column email and password

SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=strong_admin_password
SEED_CHIEF_EMAIL=chief@example.com
SEED_CHIEF_PASSWORD=strong_chief_password
SEED_USER_EMAIL=user@example.com
SEED_USER_PASSWORD=strong_user_password
```

4. Nilai produksi tergantung hosting, database, domain, dan arsitektur kamu.
5. Kalau seeder hanya untuk setup awal, jaga kredensial seed baik-baik di produksi.

<h2 id="security">Saran Keamanan</h2>

1. Jangan upload file `.env` asli ke repo publik.
2. Jangan sebar password database.
3. Jangan sebar kunci JWT dan session.
4. Bedakan kunci access token, refresh token, dan session.
5. Pakai kunci acak yang kuat di produksi.
6. Bedakan kredensial database lokal dan produksi.
7. Pakai password kuat untuk user seed.
8. Ganti password bawaan kalau perlu.
9. Ganti kunci kalau tidak sengaja bocor.
10. Simpan pengaturan sensitif di luar kode.
11. Jangan taruh rahasia backend di variabel `VITE_`.

<h2 id="env_file">File Environment</h2>

Struktur yang disarankan:

```text
project/
├── frontend/
│   ├── .env
│   └── ...
│
└── backend/
    ├── .env
    └── ...
```

Frontend dan backend punya file sendiri karena keduanya aplikasi terpisah.

<h2 id="important">Catatan Penting Tentang Variabel Vite</h2>

1. Variabel `VITE_` bisa dilihat di browser. Jadi tidak aman untuk rahasia.
2. Jangan simpan di `VITE_`: password, private key, kredensial database, kunci JWT, kunci session, atau kredensial seed.
3. Rahasia cukup disimpan di backend.

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

### <a href="../Troubleshooting/troubleshooting.md">Troubleshooting</a>

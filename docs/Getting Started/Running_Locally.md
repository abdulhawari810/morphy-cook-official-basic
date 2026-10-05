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
        <a href="#running" class="title">Running Locally</a>
      </li>
      <li class="menu-items">
        <a href="#issues" class="title">Common Local Development Issues</a>
      </li>
      <li class="menu-items">
        <a href="#roadmap" class="title">Roadmap Documentation</a>
      </li>
  </ul>
</div>

<h1 id="running">Menjalankan di Komputer Sendiri</h1>

Dokumen ini menjelaskan cara menjalankan **Frontend** dan **Backend** di komputer kamu.

Proyek ini ada dua aplikasi. Keduanya harus jalan bersamaan.

## Syarat Sebelum Jalan

Pastikan sudah selesai:

- [ ] Software yang dibutuhkan sudah dipasang.
- [ ] Dependency frontend sudah dipasang (`npm install`).
- [ ] Dependency backend sudah dipasang (`npm install`).
- [ ] File `.env` frontend sudah diisi.
- [ ] File `.env` backend sudah diisi.
- [ ] MySQL sudah jalan.
- [ ] Database sudah dibuat.
- [ ] Username dan password database sudah benar.
- [ ] Alamat API frontend menunjuk ke backend.
- [ ] Migrasi sudah jalan (termasuk tabel `reviews`).

Cara pasang lengkap ada di [Installation.md](./Installation.md).

## 1. Jalankan Backend

1. Buka terminal.
2. Masuk ke folder backend:

```bash
cd backend
```

3. Jalankan server:

```bash
npm run dev
```

4. Backend memakai host dan port dari `.env`. Contoh:

```env
APP_HOST=localhost
APP_PORT=5000
```

5. Maka backend tersedia di:

```text
http://localhost:5000
```

> Alamat bisa beda kalau kamu ubah pengaturan.

6. Biarkan terminal ini tetap terbuka.

## 2. Jalankan Frontend

1. Buka terminal kedua.
2. Masuk ke folder frontend:

```bash
cd frontend
```

3. Jalankan server:

```bash
npm run dev
```

4. Vite akan menampilkan alamat web. Contoh:

```text
http://localhost:5173
```

5. Buka alamat itu di browser.

## 3. Jalankan Keduanya

Gunakan dua terminal.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Jangan tutup keduanya saat masih dipakai.

Alurnya:

```text
Browser
   │
   │ http://localhost:5173
   ▼
Frontend
   │
   │ Minta data API
   ▼
Backend
   │
   │ Tanya database
   ▼
MySQL
```

## 4. Cek Backend

1. Lihat terminal backend.
2. Pastikan ada:

- Pesan server jalan.
- Status koneksi database aman.
- Tidak ada error port.
- Tidak ada error login atau session.

3. Kalau backend tidak bisa ke MySQL, cek:

```env
APP_DATABASE_HOST=localhost
APP_DATABASE_NAME=morphy_cook
APP_DATABASE_USERNAME=root
APP_DATABASE_PASSWORD=your_mysql_password
APP_DATABASE_PORT=3306
```

4. Pastikan juga MySQL sudah jalan.

## 5. Cek Frontend

1. Buka URL dari Vite. Contoh:

```text
http://localhost:5173
```

2. Cek satu per satu:

- Halaman terbuka dengan benar.
- Pindah halaman bisa.
- Data API muncul.
- Login bisa.
- Data resep bisa dimuat.
- Fitur user bisa dipakai.
- Upload avatar bisa.
- Fitur review tampil di halaman resep.

## 6. Cek Alamat API Frontend

1. Pastikan frontend menunjuk ke backend yang benar.
2. Contoh:

```env
VITE_BASE_API_URL=http://localhost:5000
```

3. Kalau backend pakai host atau port lain, ubah juga di sini.
4. Untuk file upload, cek:

```env
VITE_BASE_API_UPLOAD=http://localhost:5000/uploads
```

5. URL upload harus cocok dengan tempat backend menyimpan file.

## 7. Cek CORS

1. Backend harus mengizinkan frontend.
2. Contoh: frontend jalan di:

```text
http://localhost:5173
```

3. Maka backend harus berisi:

```env
APP_ORIGIN=http://localhost:5173
```

4. Kalau port frontend beda, sesuaikan `APP_ORIGIN`.
5. Kalau salah, API diblokir oleh CORS.

## 8. Coba API Review

1. Setelah backend jalan, coba API review.
2. Buka di browser atau Postman:

```text
GET http://localhost:5000/api/reviews/recipe/1
```

3. Angka `1` adalah ID resep. Ganti sesuai data kamu.
4. Kalau berhasil, kamu dapat daftar review resep itu.
5. Kalau kosong, berarti belum ada review untuk resep tersebut. Itu normal.
6. Untuk tambah review, login dulu sebagai user, lalu kirim POST ke `/api/reviews`.

## Alur Kerja Harian

Urutan kerja yang disarankan:

```text
1. Nyalakan MySQL
       │
       ▼
2. Nyalakan Backend
       │
       ▼
3. Nyalakan Frontend
       │
       ▼
4. Buka Frontend di Browser
       │
       ▼
5. Koding dan Tes
```

Saat ubah kode:

- Ubah tampilan di `frontend/src/`.
- Ubah server di folder sumber backend.
- Frontend otomatis reload saat file disimpan.
- Backend otomatis restart kalau Nodemon aktif.

## Cara Berhenti

1. Klik terminal yang mau dihentikan.
2. Tekan:

```text
Ctrl + C
```

3. Frontend dan backend bisa dihentikan terpisah.
4. Kalau sudah selesai, matikan juga MySQL kalau tidak dipakai aplikasi lain.

---

<h1 id="issues">Masalah Umum Saat Lokal</h1>

### 1. Backend Tidak Jalan

Cek:

- Apakah `npm install` sudah jalan di backend?
- Apakah file `.env` backend ada?
- Apakah `APP_HOST` benar?
- Apakah `APP_PORT` tidak dipakai aplikasi lain?
- Apakah ada error ketik di kode?

Coba pasang ulang kalau perlu:

```bash
cd backend
npm install
```

### 2. Frontend Tidak Bisa ke Backend

Cek:

```env
VITE_BASE_API_URL=http://localhost:5000
```

1. Pastikan URL sama dengan alamat backend.
2. Pastikan backend sedang jalan.

### 3. Error CORS

Cek backend:

```env
APP_ORIGIN=http://localhost:5173
```

Pastikan cocok dengan URL frontend yang sebenarnya.

### 4. Error Koneksi Database

Cek:

```env
APP_DATABASE_HOST=localhost
APP_DATABASE_NAME=morphy_cook
APP_DATABASE_USERNAME=root
APP_DATABASE_PASSWORD=your_mysql_password
APP_DATABASE_PORT=3306
```

1. Pastikan MySQL jalan.
2. Pastikan database sudah dibuat.
3. Pastikan migrasi sudah jalan, termasuk `007_create_reviews_table.js`.

### 5. Gambar Upload Tidak Muncul

Cek:

```env
VITE_BASE_API_UPLOAD=http://localhost:5000/uploads
```

1. Pastikan menunjuk ke tempat backend menyimpan file.
2. Pastikan backend melayani folder upload dengan benar.

### 6. Review Tidak Muncul

1. Coba langsung API-nya:

```text
GET http://localhost:5000/api/reviews/recipe/1
```

2. Kalau error tabel tidak ada, migrasi `reviews` belum jalan. Jalankan:

```bash
cd backend
npx knex migrate:latest
```

3. Kalau kosong tapi status 200, berarti data review memang belum ada.

## Contoh Lengkap Lokal

### Backend

```env
APP_ENVIRONMENT=development
APP_HOST=localhost
APP_PORT=5000
APP_ORIGIN=http://localhost:5173
APP_DATABASE_HOST=localhost
APP_DATABASE_NAME=morphy_cook
APP_DATABASE_USERNAME=root
APP_DATABASE_PASSWORD=your_mysql_password
APP_DATABASE_PORT=3306
APP_ACCESS_SECRET=your_access_secret
APP_REFRESH_SECRET=your_refresh_secret
APP_SESS_SECRET=your_session_secret
```

### Frontend

```env
VITE_ENVIRONMENT=development
VITE_BASE_API_URL=http://localhost:5000
VITE_BASE_API_UPLOAD=http://localhost:5000/uploads
```

Lalu jalankan:

```bash
# Terminal 1
cd backend
npm run dev
```

```bash
# Terminal 2
cd frontend
npm run dev
```

Terakhir, buka URL frontend dari Vite di browser.

## Selesai

Kalau kedua aplikasi jalan dan frontend bisa bicara ke backend dan database, proyek siap dipakai.

Untuk info lain, baca:

- [Requirements.md.md](./Requirements.md)
- [Installation.md](./Installation.md)
- [Environment Variables.md](./Environment_Variables.md)
- [Configuration.md](./Configuration.md)

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

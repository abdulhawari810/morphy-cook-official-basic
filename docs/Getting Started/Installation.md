<style>
  *{
    transition: all ease-in-out .2s;
  }
  .drawer{
    display:none;
    position: fixed; top: 70px; right: 0px; width: 200px; background: rgba(255, 255, 255, 1); padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;
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
        <a href="#title" class="title">Installation</a>
      </li>
      <li class="menu-items">
        <a href="#title0" class="title">Project Structure</a>
      </li>
      <li class="menu-items">
        <a href="#title1" class="title">Extract the Project</a>
      </li>
      <li class="menu-items">
        <a href="#title2" class="title">Before You Begin</a>
      </li>
      <li class="menu-items">
        <a href="#title3" class="title">Frontend Installation</a>
      </li>
      <li class="menu-items">
        <a href="#title4" class="title">Backend Installation</a>
      </li>
      <li class="menu-items">
        <a href="#title5" class="title">Running Frontend and Backend</a>
      </li>
      <li class="menu-items">
        <a href="#title6" class="title">Verify the Installation</a>
      </li>
      <li class="menu-items">
        <a href="#title7" class="title">Installation Complete</a>
      </li>
      <li class="menu-items">
        <a href="#roadmap" class="title">Roadmap Documentation</a>
      </li>
  </ul>
</div>

<h1 id="title">Instalasi</h1>

Panduan ini menjelaskan cara memasang **Morphy Cook Official** di komputer kamu.

Proyek ini dibagikan dalam bentuk **file ZIP**. Isinya ada dua aplikasi terpisah:

- **Frontend** — Tampilan web yang dilihat pengguna.
- **Backend** — Server API. Mengatur login, database, resep, user, upload file, dan review.

Kedua aplikasi harus berjalan agar proyek bisa dipakai.

<h2 id="title0">Struktur Proyek</h2>

Setelah file ZIP diekstrak, strukturnya seperti ini:

```text
MCO/
├── frontend/
├── backend/
├── documentation/
├── LICENSE.txt
└── README.md
```

> Struktur bisa sedikit berbeda tergantung versi proyek.

<h2 id="title1">Cara Ekstrak Proyek</h2>

1. Unduh file ZIP dari tempat kamu membeli proyek.
2. Cari file ZIP di folder `Downloads`.
3. Ekstrak file ZIP dengan aplikasi arsip (WinRAR, 7-Zip, atau bawaan Windows).
4. Buka folder hasil ekstrak.
5. Pastikan ada folder `frontend`, `backend`, dan `docs`.

Contoh:

```text
Downloads/
└── MCO.zip

Setelah diekstrak:

MCO/
├── frontend/
├── backend/
├── docs/
├── LICENSE.txt
└── README.md
```

> Jangan jalankan proyek dari dalam ZIP. Ekstrak dulu semuanya.

<h2 id="title2">Sebelum Mulai</h2>

1. Baca dulu syarat sistem di [docs/Introduction/Requirements.md](../Introduction/Requirements.md).
2. Pastikan Node.js, npm, dan MySQL sudah terpasang.
3. Pastikan MySQL sudah berjalan.
4. Frontend dan backend dipasang terpisah. Jadi perintah `npm install` dijalankan dua kali.

<h2 id="title3">Instalasi Frontend</h2>

Frontend adalah tampilan web. Dia meminta data ke backend lewat API.

### 1. Masuk ke folder frontend

```bash
cd frontend
```

Kalau kamu masih di folder utama proyek:

```bash
cd MCO/frontend
```

### 2. Pasang dependency

```bash
npm install
```

Perintah ini membaca file `package.json`. Tunggu sampai selesai.

### 3. Buat file `.env`

1. Buat file baru bernama `.env` di dalam folder `frontend`.
2. Isi dengan format ini:

```env
VITE_ENVIRONMENT=development
VITE_BASE_API_URL=http://localhost:5000
VITE_BASE_API_UPLOAD=http://localhost:5000/uploads
```

3. Sesuaikan URL dengan alamat backend kamu.

### 4. Jalankan frontend

```bash
npm run dev
```

Terminal akan menampilkan alamat web. Contoh:

```text
http://localhost:5173
```

Buka alamat itu di browser.

<h2 id="title4">Instalasi Backend</h2>

Backend adalah server API. Dia terhubung ke database MySQL.

### 1. Masuk ke folder backend

Buka terminal baru, lalu jalankan:

```bash
cd backend
```

Kalau kamu masih di folder utama proyek:

```bash
cd MCO/backend
```

### 2. Pasang dependency

```bash
npm install
```

Tunggu sampai selesai.

### 3. Buat file `.env`

1. Buat file baru bernama `.env` di dalam folder `backend`.
2. Lihat contoh lengkap di [docs/Getting Started/Environment_variables.md](../Getting%20Started/Environment_Variables.md).
3. Isi nama database, username, dan password MySQL kamu.

### 4. Buat database MySQL

1. Buka MySQL (phpMyAdmin, HeidiSQL, atau Workbench).
2. Buat database baru. Contoh nama: `morphy_cook`.
3. Tulis nama database itu ke file `.env` backend.
4. Lihat cara migrasi dan seeder di [docs/Getting Started/Configuration.md](../Getting%20Started/Configuration.md).

### 5. Jalankan backend

```bash
npm run dev
```

Backend berjalan sesuai isi `.env`. Contoh:

```env
APP_HOST=localhost
APP_PORT=5000
```

Maka API tersedia di:

```text
http://localhost:5000
```

> Alamat bisa berbeda kalau kamu ubah `APP_HOST` dan `APP_PORT`.

<h2 id="title5">Menjalankan Frontend dan Backend</h2>

Frontend dan backend adalah dua aplikasi berbeda. Keduanya harus jalan bersamaan.

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

Pastikan isi `VITE_BASE_API_URL` sama dengan alamat backend. Contoh:

```env
VITE_BASE_API_URL=http://localhost:5000
```

<h2 id="title6">Cek Instalasi</h2>

Setelah kedua aplikasi jalan, cek satu per satu:

1. Buka frontend di browser. Pastikan halaman tampil.
2. Lihat terminal backend. Pastikan tidak ada error merah.
3. Coba login. Pastikan JWT bekerja.
4. Coba buka data resep. Pastikan data muncul.
5. Coba upload avatar. Pastikan gambar tampil.
6. Coba fitur 2FA. Pastikan kode bisa dipakai.
7. Coba fitur review. Buka di browser atau Postman:

```text
GET http://localhost:5000/api/reviews/recipe/1
```

8. Kalau ada yang gagal, cek file `.env`, koneksi database, URL API, dan log backend.

<h2 id="title7">Instalasi Selesai</h2>

Kalau frontend dan backend jalan dan bisa terhubung ke MySQL, **Morphy Cook Official** siap dipakai untuk belajar dan pengembangan.

Untuk langkah lanjut, baca file lain di folder `docs/`.

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
  <li><a href="../Deployment/frontend/Vercel.md">Frontend to Vercel</a></li>
  <li><a href="../Deployment/backend/Railway.md">Backend to Railway</a></li>
</ul>

### [Troubleshooting](../Troubleshooting/troubleshooting.md)

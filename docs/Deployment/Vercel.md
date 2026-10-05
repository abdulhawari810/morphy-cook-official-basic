<style>
    *{
    transition: all ease-in-out .2s;
  }
  .drawer{
    display:none;
    position: fixed; top: 70px; right: 0px; width: 300px; background: rgba(255, 255, 255, 1); padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;
  }
  .box-menu{
    position: fixed; top: 20px; right: 0px; width: 20px;height:20px; display: flex; flex-direction:column; justify-content:center; align-items:center;background:white; padding:10px;border-radius:10px;cursor:pointer;overflow:hidden;
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
    margin: 5px 0 0 0; padding-left: 20px; padding: 5px 20px; overflow:scroll; scrollbar-width: none;  height:300px;font-size: 14px;color: #091540; font-size:14px;
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
    <li class="menu-items"><a href="#title" class="title">Frontend Deployment to Vercel</a></li>
    <li class="menu-items"><a href="#title1" class="title">Prerequisites</a></li>
    <li class="menu-items"><a href="#title2" class="title">1. Push the Frontend Project to Git</a></li>
    <li class="menu-items"><a href="#title3" class="title">2. Create a Vercel Project</a></li>
    <li class="menu-items"><a href="#title4" class="title">3. Configure the Build Settings</a></li>
    <li class="menu-items"><a href="#title5" class="title">4. Configure Environment Variables</a></li>
    <li class="menu-items"><a href="#title6" class="title">5. Deploy the Application</a></li>
    <li class="menu-items"><a href="#title7" class="title">6. Connect the Frontend to the Backend</a></li>
    <li class="menu-items"><a href="#title8" class="title">7. Configure SPA Routing</a></li>
    <li class="menu-items"><a href="#title9" class="title">8. Verify the Deployment</a></li>
    <li class="menu-items"><a href="#title10" class="title">Automatic Deployment</a></li>
    <li class="menu-items"><a href="#title11" class="title">Custom Domain</a></li>
    <li class="menu-items"><a href="#title12" class="title">Troubleshooting</a></li>
    <li class="menu-items"><a href="#title13" class="title">Deployment Summary</a></li>
    <li class="menu-items"><a href="#roadmap" class="title">Roadmap Documentation</a></li>
  </ul>
</div>

<h1 id="title">Deploy Frontend ke Vercel</h1>

Panduan ini menjelaskan cara deploy aplikasi frontend ke **Vercel**.

Vercel dipakai untuk build, hosting, dan deploy otomatis aplikasi frontend dari repository Git.

<h2 id="title1">Prasyarat</h2>

Sebelum deploy, pastikan kamu sudah punya:

- [ ] Akun GitHub, GitLab, atau Bitbucket.
- [ ] Project frontend sudah di-push ke repository Git.
- [ ] Akun Vercel.
- [ ] Project frontend bisa jalan dengan baik di komputer lokal.
- [ ] Semua environment variable yang dibutuhkan sudah diketahui.

<h2 id="title2">1. Push Project Frontend ke Git</h2>

Pastikan project frontend sudah di-upload ke repository Git.

Contohnya:

```bash
git add .
git commit -m "Initial frontend release"
git push origin main
```

Pastikan repository berisi source code frontend dan file konfigurasi yang dibutuhkan, contohnya:

```text
package.json
vite.config.js
src/
public/
```

Jangan upload informasi sensitif seperti file `.env` yang berisi kredensial pribadi.

<h2 id="title3">2. Buat Project di Vercel</h2>

1. Login ke Vercel.
2. Pilih **Add New → Project**.
3. Hubungkan akun Git kamu kalau belum terhubung.
4. Pilih repository yang berisi project frontend.
5. Klik **Import**.

Vercel akan mendeteksi konfigurasi project secara otomatis.

<h2 id="title4">3. Atur Build Settings</h2>

Untuk aplikasi frontend Vite pada umumnya, pakai konfigurasi ini:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework Preset | Vite            |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |
| Install Command  | `npm install`   |

Kalau `package.json` kamu sudah berisi script build yang benar, pengaturan bawaan Vercel biasanya bisa langsung dipakai tanpa diubah.

Contohnya:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

<h2 id="title5">4. Atur Environment Variables</h2>

Kalau frontend perlu ngobrol dengan backend API, atur URL backend lewat environment variable Vite.

Contohnya:

```env
VITE_API_URL=https://your-backend-url.up.railway.app
```

Tambahkan variable di:

**Vercel → Project → Settings → Environment Variables**

Pastikan nama variable diawali `VITE_`, karena Vite hanya meneruskan variable dengan awalan itu ke kode client.

Contohnya:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

> **Penting:** Jangan simpan password, kredensial database, JWT secret, atau rahasia server lain di environment variable frontend. Variable Vite ikut dibundel ke frontend dan bisa dilihat pengguna.

<h2 id="title6">5. Deploy Aplikasi</h2>

Setelah project dikonfigurasi:

1. Periksa lagi pengaturan project.
2. Klik **Deploy**.
3. Tunggu Vercel meng-install dependency dan mem-build aplikasi.
4. Kalau build berhasil, Vercel akan memberi URL deploy.

URL-nya biasanya terlihat seperti ini:

```text
https://your-project.vercel.app
```

Buka URL itu di browser untuk memastikan aplikasi berjalan dengan benar.

<h2 id="title7">6. Hubungkan Frontend ke Backend</h2>

Setelah backend selesai di-deploy, update environment variable frontend dengan URL backend Railway.

Contoh:

```env
VITE_API_URL=https://your-backend.up.railway.app
```

Lalu picu deploy ulang dari Vercel.

Kalau project memakai deploy berbasis Git, push commit baru ke branch yang dikonfigurasi biasanya otomatis memicu deploy baru.

<h2 id="title8">7. Atur SPA Routing</h2>

Kalau aplikasi memakai client-side routing seperti **React Router**, navigasi langsung ke route butuh konfigurasi rewrite Vercel.

Buat file `vercel.json` di folder root frontend:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Ini membuat route seperti:

```text
/login
/recipes
/recipes/123
/dashboard
```

ditangani oleh aplikasi frontend, bukan mengembalikan `404` saat diakses langsung.

Tambahkan konfigurasi ini hanya kalau aplikasimu butuh SPA fallback routing.

<h2 id="title9">8. Verifikasi Hasil Deploy</h2>

Setelah deploy, periksa hal berikut:

- [ ] Halaman utama bisa dibuka.
- [ ] Route client-side berjalan benar.
- [ ] Request API sampai ke backend.
- [ ] Login/auth berjalan benar.
- [ ] Gambar dan aset lain bisa dimuat.
- [ ] Environment variable sudah benar.
- [ ] Console browser tidak ada error penting.
- [ ] Build production jalan tanpa error.

<h2 id="title10">Deploy Otomatis</h2>

Kalau project Vercel sudah terhubung ke repository Git, Vercel bisa deploy otomatis setiap ada perubahan.

Alurnya biasanya:

```text
Local Development
       ↓
Git Commit
       ↓
Git Push
       ↓
Vercel Build
       ↓
Production Deployment
```

Artinya kamu umumnya tidak perlu upload file frontend manual setiap kali rilis update.

<h2 id="title11">Domain Sendiri</h2>

Kalau kamu punya domain sendiri, hubungkan dari:

**Vercel → Project → Settings → Domains**

Setelah DNS dikonfigurasi, aplikasi bisa diakses pakai domain sendiri, bukan alamat `.vercel.app` bawaan.

<h2 id="title12">Troubleshooting</h2>

### Masalah: Build Gagal
**Penyebab:** dependency atau error kompilasi.
**Solusi:** cek log deploy di Vercel dan pastikan project bisa di-build di lokal:

```bash
npm install
npm run build
```

Perbaiki dulu error dependency atau kompilasi sebelum deploy ulang.

### Masalah: Request API Gagal
**Penyebab:** URL backend salah, backend mati, atau CORS belum diizinkan.
**Solusi:** periksa hal berikut:

1. `VITE_API_URL` berisi URL backend Railway yang benar.
2. Backend sedang berjalan.
3. Backend mengizinkan request dari domain Vercel lewat CORS.
4. Frontend di-deploy ulang setelah mengubah environment variable.

### Masalah: Halaman 404 Setelah Refresh
**Penyebab:** SPA routing belum dikonfigurasi.
**Solusi:** kalau memakai client-side routing, pastikan konfigurasi rewrite `vercel.json` sudah ditambahkan.

### Masalah: Environment Variable Undefined
**Penyebab:** nama salah, belum disetting di Vercel, atau belum redeploy.
**Solusi:** pastikan:

- Nama variable diawali `VITE_`.
- Sudah dikonfigurasi di Vercel.
- Environment deploy yang dipilih sudah benar.
- Aplikasi di-deploy ulang setelah menambah/mengubah variable.

<h2 id="title13">Ringkasan Deploy</h2>

Alur deploy frontend yang disarankan:

```text
Frontend Project
      ↓
Git Repository
      ↓
Vercel
      ↓
Configure Environment Variables
      ↓
Build & Deploy
      ↓
Production Website
      ↓
Connect to Railway Backend
```

Frontend sekarang siap di-hosting di Vercel dan dihubungkan ke API backend yang di-deploy di Railway.

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

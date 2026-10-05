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
        <a href="#overview" class="title">Overview</a>
      </li>
      <li class="menu-items">
        <a href="#features" class="title">Feature</a>
      </li>
      <li class="menu-items">
        <a href="#technology" class="title">Technology Stack</a>
      </li>
      <li class="menu-items"><a href="#roadmap" class="title">Roadmap Documentation</a></li>
  </ul>
</div>

<h1 id="overview">Overview</h1>

## Proyek Ini Apa Sih?

Morphy Cook Official (MCO) adalah website resep makanan.

Fungsinya ada dua:
- Buat belajar full-stack. Kamu bisa lihat cara frontend dan backend ngobrol lewat API.
- Buat modal bikin aplikasi sendiri. Tinggal install, lalu ubah sesuai kebutuhan. Tidak perlu mulai dari nol.

> Istilah penting:
> - **Frontend** = tampilan yang dilihat pengguna.
> - **Backend** = mesin di belakang layar yang olah data.
> - **API** = jembatan antara frontend dan backend.

## Masalah Apa yang Dibantu?

Bikin struktur awal aplikasi itu lama dan capek.

MCO sudah menyediakan struktur jadi. Kamu bisa langsung fokus ke hal penting:
- Bikin fitur baru.
- Rapikan tampilan.
- Sesuaikan dengan kebutuhanmu.

## Siapa yang Cocok Pakai?

- Pemula yang mau belajar web.
- Developer yang mau coba-coba atau kejar cepat.
- Siapa saja yang mau bikin usaha kuliner dan butuh website dasar.

---

<h1 id="features">Features</h1>

MCO punya fitur umum yang sering ada di aplikasi modern. Ringkasannya:

### 1. Authentication

Daftar, login, logout, dan atur sesi login. Pintu masuk utama aplikasi.

### 2. JWT Authentication

Login pakai token bernama JWT. Token ini jadi bukti kalau kamu sudah login saat akses halaman khusus.

> **JWT** = kode digital sebagai tanda pengenal. Disimpan di frontend, dicek oleh backend.

### 3. Filter

Saring resep berdasarkan kategori. Biar gampang cari yang sesuai selera.

### 4. Search

Cari resep pakai kata kunci. Ketik, langsung keluar hasilnya.

### 5. Manage Recipes

Buat, lihat, ubah, dan hapus resep. Hanya user yang punya izin yang bisa melakukannya.

### 6. Manage Users

Admin bisa lihat dan atur data user. Termasuk peran dan izinnya.

### 7. Upload Avatar

User bisa upload foto profil. Biar akun lebih personal.

### 8. Role-Based Access Control

Akses dibatasi sesuai peran (role). Contoh: hanya admin yang bisa buka halaman admin.

### 9. Language

Bisa ganti bahasa aplikasi sesuai pilihanmu.

### 10. Theme

Bisa ganti tema terang atau gelap. Biar mata nyaman.

### 11. Two-Factor Authentication (2FA)

Keamanan tambahan. Selain password, kamu masukkan kode verifikasi kedua.

> **2FA** = login dua langkah. Password + kode sekali pakai.

### 12. Review Resep

User bisa kasih nilai dan komentar ke resep.

Aturannya simpel:
- Rating 1 sampai 5 bintang.
- Bisa tambah komentar teks.
- 1 user hanya bisa kasih 1 review untuk 1 resep.

Endpoint-nya:
- `GET /api/reviews/recipe/:recipeId` — publik. Lihat semua review satu resep.
- `GET /api/reviews/recipe/:recipeId/summary` — publik. Lihat rata-rata rating dan total review.
- `GET /api/reviews/me` — login dulu. Lihat review milikmu sendiri.
- `POST /api/reviews/recipe/:recipeId` — login dulu. Buat review baru.
- `PATCH /api/reviews/:id` — hanya pemilik. Ubah review milikmu.
- `DELETE /api/reviews/:id` — pemilik atau admin. Hapus review.

Data disimpan di tabel `reviews` dengan kolom `userId`, `recipeId`, `rating`, `comment`. Kombinasi `userId` + `recipeId` harus unik.

---

<h1 id="technology">Technology Stack</h1>

Proyek ini pakai teknologi modern. Tujuannya biar cepat, aman, dan gampang dirawat.

Berikut bahan utamanya:

## Frontend :

### Vite

Alat bantu buat jalanin frontend. Start-nya cepat. Kalau ada perubahan kode, langsung tampil (HMR).

> **HMR** = layar update otomatis tanpa refresh manual.

### React.js

Buat bangun tampilan. Sistemnya potongan kecil bernama komponen. Gampang dirawat dan ditambah.

### TanStack Query

Urus ambil data dari API. Atur cache dan update otomatis. Biar tidak boros request ke server.

> **Cache** = simpan data sementara biar loading cepat.

### Tailwind CSS

Buat styling tampilan. Tinggal tempel class siap pakai. Gampang bikin layout responsif.

### shadcn/ui

Kumpulan komponen jadi seperti tombol, form, dan dialog. Tinggal pakai dan ubah sesuai selera.

## Backend :

### Node.js

Buat jalanin JavaScript di server. Jadi fondasi backend.

### Express.js

Urus request API dan logika server. Ringan dan fleksibel.

### MySQL

Database utama. Simpan data user, resep, kategori, dan review dengan rapi.

### Sequelize ORM

Penghubung Express ke MySQL. Kamu atur database pakai JavaScript, tidak perlu tulis SQL yang rumit tiap saat.

> **ORM** = cara atur database pakai objek JavaScript.

### JWT Authentication

Buat cek siapa yang login. Hanya user resmi yang bisa buka fitur khusus.

---

<h1 id="roadmap" style="padding-top:10px;">Roadmap Documentation</h1>

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

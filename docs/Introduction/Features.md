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
        <a href="#frontend" class="title">Frontend</a>
      </li>
      <li class="menu-items">
        <a href="#backend" class="title">Backend</a>
      </li>
      <li class="menu-items">
        <a href="#roadmap" class="title">Roadmap Documentation</a>
      </li>
  </ul>
</div>

# Fitur

Dokumen ini menjelaskan fitur MCO dengan bahasa sederhana. Dibagi dua: frontend (tampilan) dan backend (mesin).

<h2 id="frontend">Frontend</h2>

Frontend dibuat modular. Artinya kode dipotong kecil-kecil biar gampang dibaca, diubah, dan ditambah.

### Komponen yang Bisa Dipakai Ulang

Tampilan dibuat dari potongan kecil bernama komponen. Satu komponen bisa dipakai di banyak halaman.

Contohnya:

- Tombol
- Input
- Modal (jendela pop-up)
- Tabel
- Pagination (pindah halaman)
- Form
- Kartu
- Filter
- Navigasi
- Loading (tampilan saat loading)
- Empty state (tampilan saat data kosong)

> **Catatan:** Jangan ubah file di `src/components/ui` kalau belum paham shadcn/ui. Itu komponen dasar. Ubah di tempat lain saja.

### Dibuat dengan Komponen shadcn/ui

Frontend pakai [shadcn/ui](https://ui.shadcn.com/). Ini kumpulan tampilan jadi yang modern dan gampang diubah.

Sekarang dipakai:
- `Select` (pilihan dropdown)
- `Skeleton` (efek loading)

Komponen lain sengaja disimpan. Biar bisa dipakai lagi nanti kalau butuh.

### Custom React Hooks

Hooks = cara simpan logika biar bisa dipakai ulang. Tampilan jadi lebih bersih.

Contoh logika yang disimpan di hooks:

- Login dan auth
- Ambil data
- Olah data
- Upload file

> **Hooks** = fungsi khusus React buat simpan logika. **Auth** = singkatan authentication (login).

### API Service yang Terpisah

Semua request ke backend dikelompokkan per topik. Tidak dicampur dengan tampilan.

Contoh:

```text
services/
├── auth.services.jsx
├── recipes.services.jsx
├── users.services.jsx
├── categories.services.jsx
├── reviews.services.jsx
```

Satu file urus satu topik. Gampang dicari dan diubah.

Untuk review, frontend pakai `reviews.services.jsx` buat panggil `GET`, `POST`, `PATCH`, dan `DELETE` ke `/api/reviews`.

### Fungsi Bantuan Bersama

Operasi yang sering dipakai disimpan di satu tempat. Biar tidak tulis ulang terus.

Contohnya:

- RegExp (pola teks)
- Parsing data (ubah bentuk data)
- Format tampilan
- Validasi umum
- Helper lain

### Kunci Query yang Terpusat

Frontend pakai file `queryKeys.js` buat simpan nama kunci data.

Lokasinya:

```text
src/
└── utils/
    └── queryKeys.js
```

Manfaatnya:

- Nama kunci selalu sama
- Tidak ada duplikat
- Terhindar dari typo
- Gampang dirawat
- Satu tempat buat atur semua

> Catatan: File ini hanya simpan nama variabel. Bukan sistem query baru.

### Arsitektur Berbasis Komponen

Tampilan dipecah jadi komponen kecil yang fokus ke satu tugas.

Manfaatnya:

- Kode rapi
- Bisa dipakai ulang
- Gampang dirawat
- Gampang tes dan debug
- Gampang bikin fitur baru

### Pemisahan Tugas

Setiap bagian punya tugas sendiri:

```text
components/  → Tampilan
hooks/       → Logika yang dipakai ulang
services/    → Ngobrol ke API
utils/       → Fungsi bantuan
```

Kalau satu bagian diubah, bagian lain tidak ikut rusak.

### Dukungan Tema

User bisa ganti tema:

- Tema terang
- Tema gelap
- Tombol ganti tema

Tampilan diatur konsisten di semua halaman.

### Dukungan Banyak Bahasa

User bisa ganti bahasa tanpa ganggu fungsi utama.

Teks terjemahan dipisah dari komponen. Jadi gampang tambah bahasa baru dan komponen tetap bersih.

---

<h2 id="backend">Backend</h2>

Backend adalah otak aplikasi. Urus akun, resep, keamanan, dan data.

### Search (Pencarian)

User bisa cari resep pakai kata kunci. Pencarian diproses di server, lalu hasilnya dikirim ke frontend.

### Filter Data

User bisa saring data pakai kriteria tertentu. Contoh: berdasarkan kategori.

Bisa digabung dengan search. Jadi hasil lebih pas tanpa load semua data ke frontend.

### Kelola Resep

Backend sediakan API buat atur data resep.

User yang punya izin bisa:

- Buat resep
- Lihat resep
- Ubah resep
- Hapus resep
- Atur info resep

Dilindungi login dan peran (role). Yang tidak punya izin akan ditolak.

### Kelola User

Backend sediakan fitur atur akun user.

Sesuai peran, user bisa:

- Lihat info user
- Ubah info user
- Atur akun
- Atur peran dan izin

### Authentication

Sistem login buat jaga akses.

Urus hal seperti:

- Daftar
- Login
- Status login
- Logout
- Halaman khusus yang butuh login

### Login Pakai Token JWT

Setelah login berhasil, server kasih token JWT. Token ini dikirim tiap request ke endpoint khusus.

Backend cek token tanpa harus simpan sesi tiap request di server.

> **JWT** = kode tanda pengenal digital.

### Batas Akses Sesuai Peran (RBAC)

Akses diatur sesuai peran user. Contoh: hanya admin yang bisa buka fitur admin.

> **RBAC** = Role-Based Access Control. Artinya izin mengikuti peran.

### Two-Factor Authentication (2FA)

Keamanan lapis dua. Selain password, user masukkan kode verifikasi kedua.

Bikin akun lebih aman dari login ilegal.

### Upload Foto Avatar

Backend urus upload foto profil.

File diproses di server lalu ditempel ke akun yang sesuai.

### Review Resep

Fitur baru. User bisa kasih nilai dan komentar ke resep.

Aturannya:

- Rating angka 1 sampai 5.
- Bisa tambah komentar teks.
- 1 user hanya 1 review untuk 1 resep. Kalau kirim lagi, akan ditolak atau dianggap duplikat.

Endpoint-nya (awalan `/api/reviews`):

- `GET /recipe/:recipeId` — publik, tidak perlu login. Lihat daftar review satu resep.
- `GET /recipe/:recipeId/summary` — publik. Lihat rata-rata rating dan jumlah review.
- `GET /me` — harus login. Lihat review yang kamu buat.
- `POST /recipe/:recipeId` — harus login. Buat review baru.
- `PATCH /:id` — hanya pemilik review. Ubah rating atau komentar milikmu.
- `DELETE /:id` — pemilik atau admin. Hapus review.

Contoh alur:
1. User login.
2. User buka resep.
3. User kirim rating 5 + komentar "Enak!".
4. User lain bisa lihat review itu tanpa login.
5. Pemilik bisa ubah atau hapus. Admin juga bisa hapus kalau perlu.

Data disimpan di tabel `reviews`:

| Kolom | Isi |
| --- | --- |
| `userId` | ID user yang kasih review |
| `recipeId` | ID resep yang direview |
| `rating` | Angka 1-5 |
| `comment` | Teks komentar |

Kombinasi `userId` + `recipeId` harus unik. Artinya tidak boleh ada dua baris dengan user dan resep yang sama.

> **Note:** Proyek ini akan terus diperbaiki. Fitur baru bisa muncul di update berikutnya.

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

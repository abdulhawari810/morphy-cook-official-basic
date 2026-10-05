<style>
    *{
    transition: all ease-in-out .2s;
  }
  .drawer{
    display:none;
    position: fixed; top: 70px; right: 0px; width: 200px; background: rgba(255, 255, 255, 1); padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;
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
    <li class="menu-items">
      <a href="#frontend" class="title">Frontend</a>
      <ol class="list">
        <li class="menu-items"><a class="items" href="#npm-install-fails">Npm Install Fails</a></li>
        <li class="menu-items"><a class="items" href="#npm-run-dev-does-not">Npm Run Dev Does Not Start</a></li>
        <li class="menu-items"><a class="items" href="#the-application-shows-a-blank">The Application Shows a Blank White Screen</a></li>
        <li class="menu-items"><a class="items" href="#environment-variables-are-not-working">Environment Variables Are Not Working</a></li>
        <li class="menu-items"><a class="items" href="#images-or-assets-are-not">Images or Assets Are Not Displayed</a></li>
        <li class="menu-items"><a class="items" href="#production-build-fails">Production Build Fails</a></li>
        <li class="menu-items"><a class="items" href="#routes-return-a-404-error">Routes Return a 404 Error After Deployment</a></li>
        <li class="menu-items"><a class="items" href="#changes-are-not-visible-in">Changes Are Not Visible in the Browser</a></li>
        <li class="menu-items"><a class="items" href="#port-is-already-in-use">Port Is Already in Use</a></li>
        <li class="menu-items"><a class="items" href="#deployment-works-but-environment-variables">Deployment Works but Environment Variables Do Not Problem</a></li>
      </ol>
    </li>
    <li class="menu-items">
      <a href="#backend" class="title">Backend</a>
      <ol class="list">
        <li class="menu-items"><a class="items" href="#backend-server-does-not-start">Backend Server Does Not Start</a></li>
        <li class="menu-items"><a class="items" href="#database-connection-fails">Database Connection Fails</a></li>
        <li class="menu-items"><a class="items" href="#api-returns-500-internal-server">API Returns 500 Internal Server Error</a></li>
        <li class="menu-items"><a class="items" href="#api-returns-401-unathorized">API Returns 401 Unathorized</a></li>
        <li class="menu-items"><a class="items" href="#api-returns-403-forbidden">API Returns 403 Forbidden</a></li>
        <li class="menu-items"><a class="items" href="#cors-error">CORS Error</a></li>
        <li class="menu-items"><a class="items" href="#api-request-times-out">API Request Times Out</a></li>
        <li class="menu-items"><a class="items" href="#environment-variables-are-undefined">Environment Variables Are Undefined</a></li>
        <li class="menu-items"><a class="items" href="#backend-works-locally-but-fails">Backend Works Locally but Fails After Deployment</a></li>
        <li class="menu-items"><a class="items" href="#database-migrations-or-seed-data">Database Migrations or Seed Data Fail</a></li>
        <li class="menu-items"><a class="items" href="#error-409-already-reviewed">Error 409 Sudah Pernah Review</a></li>
        <li class="menu-items"><a class="items" href="#error-400-rating-validation">Error 400 Validasi Rating</a></li>
        <li class="menu-items"><a class="items" href="#migrasi-007-reviews-gagal">Migrasi 007 Reviews Gagal</a></li>
      </ol>
    </li>
    <li class="menu-items"><a href="#roadmap" class="title">Roadmap Documentation</a></li>
  </ul>
</div>

# Troubleshooting

Bagian ini berisi masalah umum yang mungkin kamu temui saat install, menjalankan, build, atau deploy aplikasi MCO. Setiap entri memakai format **Masalah – Penyebab – Solusi**.

---

<h1 id="frontend">Frontend</h1>

<h2 id="npm-install-fails">1. `npm install` Gagal</h2>
### Masalah

Menjalankan `npm install` menghasilkan error dependency atau instalasi gagal.

### Penyebab

- Versi Node.js tidak cocok.
- Folder `node_modules` yang ada sudah rusak.
- Versi dependency saling bertentangan.
- `package-lock.json` berisi info dependency yang tidak cocok.

### Solusi

Pastikan kamu memakai versi Node.js yang disarankan.

Lalu hapus dependency lama dan install ulang:

`bash:`

```
rm -rf node_modules package-lock.json
npm install
```

On Windows:

`Powershell:`

```
rmdir /s /q node_modules
del package-lock.json
npm install
```

<h2 id="npm-run-dev-does-not">2. `npm run dev` Tidak Bisa Start</h2>
### Masalah

Server development tidak jalan setelah menjalankan:

`bash:`

```
npm run dev
```

### Penyebab

- Dependency belum di-install.
- Port development dipakai proses lain (port bawaan `5173`).
- Konfigurasi project ada yang salah.

### Solusi

Pertama, pastikan dependency sudah di-install:

`bash:`

```
npm install
```

Lalu coba jalankan lagi server development:

`bash:`

```
npm run dev
```

kalau port sudah dipakai, coba port lain:

`bash:`

```
npm run dev -- --port 5174
```

<h2 id="the-application-shows-a-blank">3. Aplikasi Hanya Menampilkan Layar Putih</h2>
### Masalah

Aplikasi berhasil start, tapi browser hanya menampilkan halaman kosong.

### Penyebab

- Ada error runtime Javascript.
- Path import salah.
- Environment variable hilang.
- Ada komponen yang error.

### Solusi

Buka Developer Tools di browser dan cek tab Console untuk melihat error.

Lalu pastikan:

- Semua dependency sudah di-install.
- Path import sudah benar.
- Environment variable sudah dikonfigurasi dengan benar.
- Tidak ada komponen yang runtime error.

Restart server development setelah mengubah sesuatu.

<h2 id="environment-variables-are-not-working">4. Environment Variable Tidak Jalan</h2>
### Masalah

Environment variable tidak bisa dipakai di lokal atau tidak tersedia di dalam aplikasi.

### Penyebab

Variable mungkin tidak memakai aturan penamaan yang benar atau konfigurasinya salah.

### Solusi

Untuk aplikasi Vite, variable client-side harus memakai awalan VITE\_.

Contoh:
`bash:`

```
VITE_BASE_API_URL=https://your-api-url.com
```

Akses di aplikasi memakai:

`Javascript`

```
import.meta.env.VITE_BASE_API_URL
```

Setelah mengubah file `.env`, restart server development.

> Catatan: Jangan pernah mengekspos API key pribadi, password, kredensial database, atau rahasia lain lewat environment variable client-side.

<h2 id="images-or-assets-are-not">5. Gambar atau Aset Tidak Muncul</h2>
### Masalah

Gambar, ikon, font, atau aset lain tidak tampil dengan benar.

### Penyebab

- Path file salah.
- Kapitalisasi nama file salah.
- Aset dipindah atau dihapus.
- Cara mereferensikan aset salah.

### Solusi

Pastikan file-nya ada dan path-nya benar.

Contohnya:

`logo.png`

berbeda dengan:
`Logo.png`
Ini penting terutama saat deploy ke server berbasis Linux karena path file bersifat case-sensitive.

<h2 id="production-build-fails">6. Build Production Gagal</h2>
### Masalah

Aplikasi jalan di mode development atau di komputer lokal tapi gagal saat menjalankan:

`bash:`

```
npm run build
```

### Penyebab

- Error tipe atau sintaks.
- Dependency hilang.
- Import tidak valid.
- Environment variable hilang.

### Solusi

Jalankan perintah build dan baca pesan error dengan teliti:

`bash:`

```
npm run build
```

Perbaiki masalah yang dilaporkan lalu jalankan build lagi.

Kamu juga bisa install ulang dependency:

`bash:`

```
rm -rf node_modules package-lock.json
npm install
npm run build
```

<h2 id="routes-return-a-404-error">7. Route Mengembalikan 404 Setelah Deploy</h2>
### Masalah

Halaman utama jalan, tapi mengakses langsung route seperti:

```
/dashboard
/settings
/profile
/recipes
```

mengembalikan error `404 Not Found`.

### Penyebab

Server deploy belum dikonfigurasi untuk mengarahkan route aplikasi ke `index.html`.

### Solusi

Atur platform hosting-mu supaya menyajikan `index.html` untuk route client-side.

Contohnya, kalau memakai platform yang mendukung SPA rewrite, atur rewrite rule yang sesuai supaya:

```
/* -> /index.html
```

Lihat dokumentasi hosting yang kamu pakai untuk konfigurasi yang dibutuhkan.

<h2 id="changes-are-not-visible-in">8. Perubahan Tidak Muncul di Browser</h2>
### Masalah

Kamu sudah mengubah source code, tapi browser masih menampilkan versi lama.

### Penyebab

- Cache browser.
- Cache server development.
- File yang diubah salah.
- Deploy terbaru belum selesai.

### Solusi

Coba langkah berikut:

1. Simpan semua perubahan.
2. Restart server development.
3. Lakukan hard refresh di browser.
4. Pastikan kamu mengubah file source yang benar.
5. Kalau sudah di-deploy, pastikan deploy terbaru sudah selesai.

<h2 id="port-is-already-in-use">9. Port Sudah Dipakai</h2>
### Masalah

Server development menampilkan error seperti:

```
Port 5173 is already in use.
```

### Penyebab

Aplikasi atau server development lain sudah memakai port yang sama.

### Solusi

Hentikan proses yang memakai port itu atau jalankan aplikasi di port lain:

`bash:`

```
npm run dev -- --port 5174
```

<h2 id="deployment-works-but-environment-variables">10. Deploy Jalan tapi Environment Variable Tidak Jalan</h2>
### Masalah

Aplikasi jalan baik di komputer lokal, tapi beberapa fitur gagal setelah deploy.

### Penyebab

Environment variable di file `.env` lokal tidak otomatis tersedia di platform deploy.

### Solusi

Tambahkan environment variable yang dibutuhkan ke pengaturan environment variable hosting-mu.

Contohnya:
`.env`

```
VITE_BASE_API_URL=https://your-api-url.com
```

Setelah menambah atau mengubah environment variable, deploy ulang aplikasi.

> Penting: Jangan commit file `.env` sensitif yang berisi kredensial pribadi ke repository publik.

---

<h1 id="backend">Backend</h1>

<h2 id="backend-server-does-not-start">1. Server Backend Tidak Bisa Start</h2>
### Masalah

Server backend gagal saat menjalankan perintah start.

### Penyebab

- Dependency hilang.
- Environment variable hilang.
- Port yang dikonfigurasi tidak tersedia.
- Ada error di konfigurasi backend.

### Solusi

Install dependency yang dibutuhkan:
`bash:`

```
npm install
```

Lalu jalankan lagi backend:

`bash:`

```
node app.js
```

> Catatan: nodemon enak untuk mode development tapi tidak disarankan untuk production.
> Kalau memakai nodemon, server tidak perlu di-restart manual (misalnya dengan CTRL + C).
> Jalankan perintah npm install -g nodemon kalau kamu tertarik memakainya, ini akan meng-install-nya secara global di Node.js kamu.

Cek output terminal untuk pesan error yang spesifik.

<h2 id="database-connection-fails">2. Koneksi Database Gagal</h2>
### Masalah

Backend tidak bisa terhubung ke database.

### Penyebab

- URL database salah.
- Kredensial database salah.
- Server database tidak tersedia.
- Akses jaringan dibatasi.
- Environment variable yang dibutuhkan hilang.

### Solusi

Periksa konfigurasi database dan environment variable-mu.

Contoh:
`.env`

```
APP_DATABASE=your_database_connection_string
```

Pastikan bahwa:

- Server database sedang berjalan.
- Kredensial sudah benar.
- Connection string valid.
- Backend punya akses jaringan ke database.

<h2 id="api-returns-500-internal-server">3. API Mengembalikan `500 Internal Server Error`</h2>
### Masalah

Request API mengembalikan:

```
500 Internal Server Error
```

### Penyebab

Terjadi exception di sisi server saat memproses request.

### Solusi

Cek terminal backend atau log server untuk melihat error aslinya.

Periksa:

Data request.
Query database.
Environment variable.
Logika authentication.
Koneksi API eksternal.

Jangan menampilkan detail error server langsung ke pengguna production.

<h2 id="api-returns-401-unathorized">4. API Mengembalikan `401 Unauthorized`</h2>
### Masalah

Endpoint API yang diproteksi mengembalikan:

```
401 Unauthorized
```

### Penyebab

Token auth hilang.
Token tidak valid.
Token sudah kedaluwarsa.
Konfigurasi authentication salah.

### Solusi

Pastikan client mengirim kredensial auth yang dibutuhkan.

Contohnya:
`http`

```
Authorization: Bearer YOUR_TOKEN
```

Pastikan token valid dan konfigurasi auth backend sudah benar.

<h2 id="api-returns-403-forbidden">5. API Mengembalikan `403 Forbidden`</h2>
### Masalah

User sudah login tapi menerima:

```
403 Forbidden
```

### Penyebab

User yang login tidak punya izin yang cukup untuk mengakses resource tersebut.

### Solusi

Periksa konfigurasi role atau permission user.

Contohnya:

```
Admin -> Full access
User -> Limited access
Chef -> Certain access
```

Pastikan logika authorization backend sesuai dengan struktur izin yang diinginkan aplikasi.

<h2 id="cors-error">6. Error CORS</h2>
### Masalah

Frontend tidak bisa mengakses API backend dan browser melaporkan error CORS.

### Penyebab

Origin frontend tidak diizinkan oleh konfigurasi CORS backend.

### Solusi

Tambahkan domain aplikasi frontend ke daftar origin yang diizinkan backend.

Contoh:

```
https://your-frontend-domain.com
```

Jangan mengizinkan semua origin di production kecuali memang dibutuhkan.

Untuk development, kamu bisa mengizinkan sementara origin frontend lokal:

```
http://localhost:5173
```

<h2 id="api-request-times-out">7. Request API Timeout</h2>
### Masalah

Request API terlalu lama dan akhirnya gagal.

### Penyebab

- Query database lambat.
- API eksternal tidak tersedia.
- Masalah jaringan.
- Keterbatasan resource server.
- Ada operasi yang terlalu lama.

### Solusi

Cek log backend dan cari operasi mana yang lambat.

Pertimbangkan:

- Optimasi query database.
- Tambah index database yang sesuai.
- Cek waktu respons API eksternal.
- Tambah request timeout.
- Periksa pemakaian resource server.

<h2 id="environment-variables-are-undefined">8. Environment Variable Undefined</h2>
### Masalah

Backend melaporkan bahwa environment variable yang dibutuhkan bernilai `undefined`.

### Penyebab

Environment variable belum dikonfigurasi atau namanya salah.

### Solusi

Periksa file `.env` kamu:

`.env`

```
APP_DATABASE=your_database_url
APP_JWT_SECRET=your_secret
APP_PORT=5000
```

Pastikan backend memuat environment variable sebelum mengaksesnya.

Saat deploy, atur variable yang sama di pengaturan environment hosting-mu.

> Penting: Jangan pernah commit file `.env` yang berisi password database, JWT secret, API key, atau kredensial sensitif lain ke repository publik.

<h2 id="backend-works-locally-but-fails">9. Backend Jalan di Lokal tapi Gagal Setelah Deploy</h2>
### Masalah

Backend jalan baik di komputer lokal tapi tidak jalan setelah di-deploy.

### Penyebab

Environment production mungkin berbeda dalam hal:

- Environment Variables.
- Node.js versions.
- Database configuration.
- Network permissions.
- Build/start commands.
- File system behavior.

### Solusi

Periksa log deploy dan verifikasi konfigurasi production.

Pastikan platform deploy sudah mengatur dengan benar:

```
Build Command
Start Command
Environment Variables
Database Configuration
Node.js Version
```

sudah dikonfigurasi dengan benar.

<h2 id="database-migrations-or-seed-data">10. Migrasi Database atau Seed Data Gagal</h2>
### Masalah

Migrasi database atau script seed gagal saat setup atau deploy.

### Penyebab

Koneksi database salah.
Skema database tidak cocok.
Tabel yang dibutuhkan sudah ada.
File migrasi hilang.
User database tidak punya izin yang cukup.

### Solusi

Verifikasi dulu koneksi database.

Lalu jalankan perintah migrasi project sesuai konfigurasi backend.

Contohnya:

`bash:`

```
npm run migrate
```

kalau butuh seed data:

`bash:`

```
npm run seed
```

Periksa log migrasi dan database untuk melihat error pastinya sebelum mengubah database secara manual.

> Peringatan: Selalu backup data production sebelum melakukan operasi database yang destruktif.

---

<h2 id="error-409-already-reviewed">11. API Mengembalikan `409 You have already reviewed`</h2>
### Masalah

Request `POST /api/recipes/:recipeId/reviews` mengembalikan:

```
409 Conflict — "You have already reviewed this recipe"
```

### Penyebab

Tabel `reviews` memakai unique constraint gabungan `userId` + `recipeId` (lihat `backend/database/migrations/007_create_reviews_table.js`). Satu user hanya boleh membuat satu review untuk satu resep, jadi POST kedua untuk pasangan yang sama ditolak di `backend/controllers/review.controller.js`.

### Solusi

Jangan kirim POST lagi untuk pasangan user + resep yang sama. Untuk mengubah review yang sudah ada, pakai PATCH ke review milik sendiri:

```http
PATCH /api/reviews/:id
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "rating": 5,
  "comment": "Update komentar saya"
}
```

Rating harus integer 1–5. Untuk menghapus lalu membuat baru, pakai `DELETE /api/reviews/:id` dulu (pemilik atau admin).

<h2 id="error-400-rating-validation">12. API Mengembalikan `400 Rating must be between 1-5`</h2>
### Masalah

Request membuat atau mengubah review mengembalikan:

```
400 Bad Request — "Rating must be an integer between 1 and 5"
```

### Penyebab

Validasi rating gagal di `backend/controllers/review.controller.js` (fungsi `parseRating`) dan `backend/models/review.model.js`: nilai bukan integer, kurang dari 1, lebih dari 5, atau dikirim sebagai string/desimal yang tidak valid.

### Solusi

Kirim `rating` sebagai angka bulat (integer) 1 sampai 5:

```http
POST /api/recipes/123/reviews
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "rating": 5,
  "comment": "Enak banget!"
}
```

Periksa: jangan kirim `"5"` (string), `4.5`, `0`, atau `6`. Untuk update, aturan yang sama berlaku di `PATCH /api/reviews/:id`.

<h2 id="migrasi-007-reviews-gagal">13. Migrasi `007_create_reviews_table` Gagal</h2>
### Masalah

Perintah `npm run migrate` gagal pada file `007_create_reviews_table.js` dengan error foreign key ke `users` atau `recipes`.

### Penyebab

Tabel `reviews` punya foreign key ke `users.id` dan `recipes.id` (`onDelete CASCADE`). Migrasi `007` hanya bisa jalan kalau tabel `users` dan `recipes` (migrasi sebelumnya) sudah ada. Urutan migrate yang salah, database kosong sebagian, atau migrasi lama yang di-skip menyebabkan FK gagal dibuat.

### Solusi

1. Pastikan migrasi dijalankan berurutan dari awal, jangan loncat langsung ke `007`:
   ```bash
   npm run migrate
   ```
2. Cek status tabel yang sudah ada (`users`, `recipes`) sebelum menjalankan ulang.
3. Kalau database setengah jadi, rollback lalu migrate ulang, atau restore dari backup.
4. Di Railway, pastikan migrasi dijalankan ke database MySQL yang benar (cek `DB_HOST`, `DB_NAME`), bukan ke database lokal.

> Peringatan: Selalu backup data production sebelum rollback atau migrate ulang.

---

### Kalau masalah dan solusi di atas belum menjawab, kamu bisa memakai AI untuk membantu: cek terminal-mu, salin pesan error, lalu tempel ke prompt.

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

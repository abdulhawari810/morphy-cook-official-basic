<style>
    *{
    transition: all ease-in-out .2s;
  }
  .drawer{
    display:none;
    position: fixed; top: 70px; right: 0px; width: 290px; background: rgba(255, 255, 255, 1); padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;
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
    <li class="menu-items"><a href="#title" class="title">Backend Deployment to Railway</a></li>
    <li class="menu-items"><a href="#title1" class="title">Prerequisites</a></li>
    <li class="menu-items"><a href="#title2" class="title">1. Push the Backend to Git</a></li>
    <li class="menu-items"><a href="#title3" class="title">2. Create a Railway Project</a></li>
    <li class="menu-items"><a href="#title4" class="title">3. Configure the Backend Service</a></li>
    <li class="menu-items"><a href="#title5" class="title">4. Add a MySQL Database</a></li>
    <li class="menu-items"><a href="#title6" class="title">5. Get the MySQL Connection Information</a></li>
    <li class="menu-items"><a href="#title7" class="title">6. Configure Backend Environment Variables</a></li>
    <li class="menu-items"><a href="#title8" class="title">7. Connect the Backend to MySQL</a></li>
    <li class="menu-items"><a href="#title9" class="title">8. Run Database Migrations or Initialization</a></li>
    <li class="menu-items"><a href="#title10" class="title">9. Configure the Server Port</a></li>
    <li class="menu-items"><a href="#title11" class="title">10. Configure CORS</a></li>
    <li class="menu-items"><a href="#title12" class="title">11. Deploy the Backend</a></li>
    <li class="menu-items"><a href="#title13" class="title">12. Generate a Public Backend URL</a></li>
    <li class="menu-items"><a href="#title14" class="title">13. Test the Production API</a></li>
    <li class="menu-items"><a href="#title15" class="title">14. Automatic Deployment</a></li>
    <li class="menu-items"><a href="#title16" class="title">15. Production Architecture</a></li>
    <li class="menu-items"><a href="#title17" class="title">Troubleshooting</a></li>
    <li class="menu-items"><a href="#title18" class="title">Deployment Summary</a></li>
    <li class="menu-items"><a href="#roadmap" class="title">Roadmap Documentation</a></li>
  </ul>
</div>

<h1 id="title">Deploy Backend ke Railway</h1>

Panduan ini menjelaskan cara deploy aplikasi backend ke **Railway**, termasuk cara membuat database MySQL, mengatur environment variable, dan menghubungkan backend ke database.

Railway dipakai untuk meng-host API backend dan database MySQL dalam satu project, supaya infrastruktur production lebih mudah dikelola.

<h2 id="title1">Prasyarat</h2>

Sebelum deploy, pastikan kamu sudah punya:

- [ ] Akun GitHub.
- [ ] Project backend sudah di-push ke repository Git.
- [ ] Akun Railway.
- [ ] Aplikasi backend bisa jalan dengan baik di lokal.
- [ ] Semua environment variable yang dibutuhkan sudah diketahui.
- [ ] Konfigurasi database yang dipakai backend sudah diketahui.

Project backend biasanya berisi file seperti ini:

```text
backend/
├── src/
├── package.json
├── package-lock.json
└── ...
```

Jangan upload file `.env` berisi kredensial production ke repository.

<h2 id="title2">1. Push Backend ke Git</h2>

Pastikan project backend sudah ada di repository Git.

Contohnya:

```bash
git add .
git commit -m "Initial backend release"
git push origin main
```

Pastikan `package.json` berisi script start yang dibutuhkan.

Contohnya:

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  }
}
```

Railway akan memakai script `start` untuk menjalankan server production.

<h2 id="title3">2. Buat Project di Railway</h2>

1. Login ke Railway.
2. Buat **New Project**.
3. Pilih **Deploy from GitHub Repo**.
4. Izinkan Railway mengakses akun GitHub kamu jika diminta.
5. Pilih repository yang berisi backend.
6. Mulai deploy.

Railway akan membuat service untuk aplikasi backend.

Setelah deploy awal, service backend akan muncul di dalam project Railway.

<h2 id="title4">3. Konfigurasi Service Backend</h2>

Buka service backend di Railway dan periksa konfigurasi deploy-nya.

Railway biasanya mendeteksi bahasa dan package manager project secara otomatis.

Untuk backend Node.js, Railway akan mendeteksi:

```text
Node.js
```

dan meng-install dependency memakai package manager project.

Proses production pada akhirnya akan menjalankan perintah yang setara dengan:

```bash
npm start
```

Kalau project-mu butuh perintah lain, atur **Start Command** yang sesuai di pengaturan service Railway.

<h2 id="title5">4. Tambah Database MySQL</h2>

Railway bisa menyediakan database MySQL sebagai service terpisah di dalam project yang sama.

Caranya:

1. Buka project Railway.
2. Pilih **Create** atau **Add Service**.
3. Pilih **Database**.
4. Pilih **MySQL**.
5. Tunggu Railway menyiapkan database.

Project sekarang berisi dua service:

```text
Railway Project
├── Backend API
└── MySQL Database
```

Service MySQL mengelola database production, sedangkan service backend terhubung ke database itu.

<h2 id="title6">5. Ambil Info Koneksi MySQL</h2>

Buka service MySQL di Railway dan lihat **Variables** atau info koneksinya.

Railway menyediakan nilai seperti:

```text
MYSQL_HOST
MYSQL_PORT
MYSQL_USER
MYSQL_PASSWORD
MYSQL_DATABASE
```

Tergantung konfigurasi Railway dan cara koneksinya, Railway juga bisa memberi URL koneksi MySQL lengkap.

> **Penting:** Jangan mengarang kredensial database sendiri. Pakai variable koneksi yang diberikan Railway.

<h2 id="title7">6. Atur Environment Variable Backend</h2>

Backend butuh environment variable untuk terhubung ke MySQL dan mengatur layanan production lainnya.

Buka:

**Railway → Backend Service → Variables**

Lalu tambahkan variable yang dibutuhkan aplikasimu.

Contohnya:

```env
NODE_ENV=production

PORT=3000

DB_HOST=...
DB_PORT=3306
DB_USER=...
DB_PASSWORD=...
DB_NAME=...

JWT_SECRET=your-production-secret
```

Nama variable yang tepat tergantung implementasi backend-mu.

Contohnya, kalau aplikasimu memakai:

```javascript
process.env.DB_HOST;
process.env.DB_USER;
process.env.DB_PASSWORD;
process.env.DB_NAME;
```

maka variable tersebut harus memakai nama yang persis sama di Railway.

### Pemetaan Variable Database

Konfigurasi yang umum terlihat seperti ini:

| Backend Variable | Railway MySQL Value |
| ---------------- | ------------------- |
| `DB_HOST`        | MySQL host          |
| `DB_PORT`        | MySQL port          |
| `DB_USER`        | MySQL username      |
| `DB_PASSWORD`    | MySQL password      |
| `DB_NAME`        | MySQL database name |

Jangan pakai nilai dari file `.env` lokal kalau isinya menunjuk ke MySQL lokal seperti `localhost`.

Backend production harus memakai info koneksi MySQL dari Railway.

<h2 id="title8">7. Hubungkan Backend ke MySQL</h2>

Konfigurasi database backend harus membaca info koneksi production dari environment variable.

Contohnya:

```javascript
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
```

Poin pentingnya: kode aplikasi tidak perlu berisi kredensial production secara langsung.

Alur koneksinya menjadi:

```text
Backend API
     │
     │ DB_HOST / DB_USER / DB_PASSWORD / DB_NAME
     ▼
Railway MySQL
```

Ini membuat codebase backend yang sama bisa dipakai di development dan production dengan konfigurasi database yang berbeda.

<h2 id="title9">8. Jalankan Migrasi atau Inisialisasi Database</h2>

Kalau project memakai migrasi, jalankan proses migrasi yang dibutuhkan backend-mu setelah service MySQL tersedia.

Contohnya:

```bash
npm run migrate
```

Kalau project-mu tidak memakai migrasi dan hanya menyediakan file SQL, import skema SQL tersebut ke database MySQL Railway.

Database harus berisi semua tabel yang dibutuhkan sebelum API production dipakai.

Contohnya:

```text
users
recipes
reviews
...
```

Tabel `reviews` menyimpan rating dan komentar (satu review per user per resep, unique `userId` + `recipeId`), berelasi ke tabel `users` dan `recipes` lewat foreign key.

> Perintah migrasi atau inisialisasi yang tepat tergantung library database dan implementasi project-mu.

<h2 id="title10">9. Atur Port Server</h2>

Backend harus listen di port yang diberikan Railway.

Untuk server Node.js, pakai environment variable `PORT`:

```javascript
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

Jangan hanya mengandalkan port production yang di-hardcode.

Railway yang menentukan port untuk service yang di-deploy.

<h2 id="title11">10. Atur CORS</h2>

Karena frontend dan backend di-deploy terpisah, backend harus mengizinkan request dari domain frontend.

Contohnya:

```javascript
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
```

Lalu tambahkan URL frontend ke Railway:

```env
FRONTEND_URL=https://your-frontend.vercel.app
```

Setelah domain sendiri dikonfigurasi, pakai domain frontend production sebagai gantinya.

Contohnya:

```env
FRONTEND_URL=https://example.com
```

Ini penting terutama kalau ada auth, cookie, atau request API.

<h2 id="title12">11. Deploy Backend</h2>

Setelah environment variable dikonfigurasi:

1. Simpan variable-nya.
2. Picu deploy baru kalau Railway tidak otomatis redeploy.
3. Buka log deploy.
4. Pastikan aplikasi bisa start dengan sukses.
5. Pastikan koneksi database berhasil.

Deploy yang sukses akan menunjukkan server backend sudah jalan tanpa error.

<h2 id="title13">12. Buat URL Publik Backend</h2>

Backend butuh URL publik supaya frontend Vercel bisa mengakses API.

Di service backend Railway:

1. Buka **Settings** atau **Networking**.
2. Generate public domain.
3. Salin URL yang dibuat.

Hasilnya terlihat seperti:

```text
https://your-backend.up.railway.app
```

Pakai URL ini sebagai base URL API frontend.

Contohnya, di Vercel:

```env
VITE_API_URL=https://your-backend.up.railway.app
```

Lalu deploy ulang frontend.

<h2 id="title14">13. Tes API Production</h2>

Sebelum deploy dianggap selesai, tes API backend secara langsung.

Contohnya:

```text
https://your-backend.up.railway.app/api/recipes
```

Periksa hal berikut:

- [ ] API merespons dengan benar.
- [ ] Query database jalan.
- [ ] Registrasi user jalan.
- [ ] Login jalan.
- [ ] Auth JWT jalan.
- [ ] Route yang diproteksi jalan.
- [ ] Upload file jalan (kalau ada).
- [ ] CORS mengizinkan request dari frontend.
- [ ] Tidak ada kredensial production yang bocor di respons API atau log.

<h2 id="title15">14. Deploy Otomatis</h2>

Kalau service Railway sudah terhubung ke GitHub, push perubahan ke branch yang dikonfigurasi bisa otomatis memicu deploy baru.

Alur yang umum:

```text
Local Development
       ↓
Git Commit
       ↓
Git Push
       ↓
Railway
       ↓
Install Dependencies
       ↓
Build / Start Backend
       ↓
Production API
       ↓
Railway MySQL
```

Ini membuat update berikutnya lebih mudah karena backend tidak perlu di-upload manual setiap rilis.

<h2 id="title16">15. Arsitektur Production</h2>

Setelah frontend dan backend selesai di-deploy, arsitektur production kurang lebih seperti ini:

```text
                    ┌──────────────────────┐
                    │       Browser        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Vercel Frontend    │
                    └──────────┬───────────┘
                               │
                         HTTPS / API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Railway Backend    │
                    │       API            │
                    └──────────┬───────────┘
                               │
                         MySQL Connection
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Railway MySQL      │
                    └──────────────────────┘
```

Frontend berkomunikasi dengan backend Railway, sedangkan backend mengatur auth, business logic, operasi database (termasuk tabel `users`, `recipes`, dan `reviews`), dan fungsi server lainnya.

<h2 id="title17">Troubleshooting</h2>

### Masalah: Backend Tidak Bisa Start
**Penyebab:** script start salah, dependency kurang, environment variable hilang, atau runtime error.
**Solusi:** cek log deploy Railway dan pastikan:

- `package.json` berisi script `start` yang benar.
- Semua dependency sudah ter-install.
- Environment variable yang dibutuhkan sudah ada.
- Tidak ada runtime error.

### Masalah: Koneksi Database Gagal
**Penyebab:** kredensial salah, service MySQL mati, atau masih memakai `localhost`.
**Solusi:** periksa:

- `DB_HOST` menunjuk ke host MySQL Railway.
- `DB_PORT` sudah benar.
- `DB_USER` sudah benar.
- `DB_PASSWORD` sudah benar.
- `DB_NAME` sudah benar.
- Service MySQL sedang berjalan.

Jangan pakai:

```env
DB_HOST=localhost
```

untuk database production Railway, kecuali arsitektur-mu memang membutuhkannya.

### Masalah: CORS Error dari Vercel
**Penyebab:** domain frontend belum diizinkan backend.
**Solusi:** pastikan backend mengizinkan domain frontend yang tepat:

```env
FRONTEND_URL=https://your-frontend.vercel.app
```

Lalu deploy ulang backend kalau perlu.

### Masalah: Frontend Tidak Bisa Menghubungi Backend
**Penyebab:** belum ada public domain, URL salah, atau CORS belum benar.
**Solusi:** pastikan:

1. Backend Railway sudah punya public domain.
2. `VITE_API_URL` menunjuk ke URL backend yang benar.
3. Backend sedang berjalan.
4. CORS dikonfigurasi dengan benar.
5. Frontend di-deploy ulang setelah mengubah `VITE_API_URL`.

### Masalah: Tabel Database Tidak Ada
**Penyebab:** migrasi belum dijalankan; membuat service MySQL tidak otomatis membuat tabel `users`, `recipes`, dan `reviews`.
**Solusi:** jalankan proses migrasi atau inisialisasi database project-mu ke database MySQL Railway.

Jangan menganggap membuat service MySQL otomatis membuat tabel aplikasimu.

<h2 id="title18">Ringkasan Deploy</h2>

Alur deploy production yang disarankan:

```text
GitHub Repository
       │
       ├──────────────► Vercel
       │                 │
       │                 └── Frontend
       │
       └──────────────► Railway
                         │
                         ├── Backend API
                         │
                         └── MySQL Database
```

Hubungan konfigurasi utamanya:

```text
Vercel
  │
  │ VITE_API_URL
  ▼
Railway Backend
  │
  │ DB_* variables
  ▼
Railway MySQL
```

Setelah komponen ini dikonfigurasi, frontend bisa berkomunikasi dengan backend production, dan backend bisa berkomunikasi dengan aman ke database MySQL production.

> **Catatan Keamanan:** Jangan commit password production, JWT secret, kredensial database, atau environment variable sensitif lainnya ke Git. Simpan di pengaturan environment variable Railway dan Vercel.

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

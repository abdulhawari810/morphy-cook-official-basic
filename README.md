# MCO — Morphy Cook Official

Aplikasi manajemen resep full-stack modern dan starter kit yang dibangun dengan **React, Vite, Node.js, Express, MySQL, dan Sequelize**.

Morphy Cook Official dirancang sebagai fondasi praktis untuk membangun aplikasi web resep, makanan, dan konten modern. Proyek ini sudah termasuk arsitektur frontend dan backend lengkap: autentikasi, otorisasi, manajemen resep, pencarian, filter, manajemen user, dan fitur penting lainnya.

## Fitur

- Autentikasi dan otorisasi
- Autentikasi berbasis JWT (access token + refresh token + rotasi)
- Hak akses berbasis role / RBAC (admin, chief, users)
- Autentikasi dua faktor / 2FA (TOTP)
- Manajemen resep (draft, pending, reject, accept)
- Ulasan resep: rating 1-5 + komentar, 1 review per user per resep (`/api/reviews`)
- Favorit
- Kategori
- Pencarian dan filter
- Pagination
- Upload avatar
- Dukungan multi-bahasa (Indonesia & Inggris)
- Tema terang dan gelap
- Tampilan responsif
- Route dan endpoint API yang diproteksi
- Database MySQL
- Migrasi dan seeder database
- Arsitektur frontend dan backend modern

## Teknologi

### Frontend

- React
- Vite
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express
- Sequelize
- JWT
- MySQL

Penjelasan lengkap teknologi ada di dokumentasi.

## Struktur Proyek

```text
MCO/
│
├── frontend/           # Aplikasi frontend
│
├── backend/            # API dan server backend
│   ├── controllers/    # Termasuk review.controller.js
│   ├── routes/         # Termasuk review.routes.js (/api/reviews)
│   ├── models/         # Termasuk review.model.js
│   └── database/migrations/  # Termasuk 007_create_reviews_table.js
│
├── docs/               # Dokumentasi lengkap (Bahasa Indonesia)
│
├── demo_images/        # Screenshot demo proyek
│
├── LICENSE.txt         # Informasi lisensi (teks legal Inggris + ringkasan Indonesia)
├── CHANGELOG.md        # Catatan perubahan (Bahasa Indonesia)
└── README.md           # Gambaran proyek (file ini)
```

## Syarat

Sebelum install, pastikan sudah terpasang:

- Node.js
- npm
- MySQL
- Git

Versi Node.js yang disarankan ada di dokumentasi (`docs/Introduction/Requirements.md`).

## Instalasi

Proyek ini terdiri dari dua aplikasi:

1. **Frontend**
2. **Backend**

Masing-masing punya dependensi dan konfigurasi sendiri.

Untuk panduan install lengkap, konfigurasi environment, setup database, migrasi, dan seeder, baca:

[docs/Getting Started/Installation.md](./docs/Getting%20Started/Installation.md)

dan

[docs/Getting Started/Configuration.md](./docs/Getting%20Started/Configuration.md)

## Database

Morphy Cook Official memakai **MySQL**.

Backend sudah termasuk fitur pengelolaan database:

- Koneksi database
- Migrasi (termasuk `007_create_reviews_table.js` untuk tabel `reviews`)
- Seeder
- Setup database

Panduan detail lihat:

[docs/Getting Started/Configuration.md](./docs/Getting%20Started/Configuration.md)

## Dokumentasi

Dokumentasi lengkap ada di direktori `docs/` (sudah Bahasa Indonesia dan mudah dipahami).

Isinya mencakup:

- Instalasi
- Konfigurasi environment
- Konfigurasi database
- Migrasi dan seeder
- Fitur (termasuk ulasan resep)
- Teknologi yang dipakai
- Kustomisasi tema, bahasa, komponen
- Konfigurasi frontend & backend
- Deployment
- Struktur proyek
- Troubleshooting
- Dan info lain terkait proyek

Mulai dari index dokumentasi atau file yang sesuai di dalam `docs/`.

## Deployment

Bisa di-deploy memakai platform hosting modern.

Panduan deployment tersedia untuk:

- Deploy frontend
- Deploy backend
- Konfigurasi database MySQL
- Environment variables
- Konfigurasi production

Lihat:

Deploy Frontend ke Vercel
[docs/Deployment/Vercel.md](./docs/Deployment/Vercel.md)

Deploy Backend ke Railway
[docs/Deployment/Railway.md](./docs/Deployment/Railway.md)

## Kustomisasi

Source code disediakan agar bisa disesuaikan dengan kebutuhan proyekmu.

Kamu bisa ubah:

- Tampilan
- Tema
- Halaman
- Komponen (termasuk rating/review)
- Resep
- Struktur database
- Endpoint API
- Autentikasi
- Role user
- Fitur
- Dan logika aplikasi lainnya

Bebas diadaptasi ke aplikasimu sendiri selama mengikuti ketentuan lisensi.

## Lisensi

Proyek ini didistribusikan dengan lisensi **MIT**. Lihat `LICENSE.txt` untuk teks lengkap.

Copyright (c) 2026 Morphy Labs.

Kamu bebas memakai, menyalin, mengubah, menggabungkan, mempublikasikan, mendistribusikan, dan menjual salinan software ini, selama mencantumkan copyright di atas di semua salinan atau bagian penting.

Library dan dependensi pihak ketiga mungkin punya lisensi sendiri. Kamu bertanggung jawab mematuhi ketentuan lisensinya masing-masing.

## Bantuan

Kalau ada kendala saat setup atau pemakaian, baca dokumentasi dulu (`docs/`, khususnya `docs/Troubleshooting/troubleshooting.md`).

Untuk bantuan tambahan, laporan bug, atau pertanyaan produk, gunakan kanal support dari marketplace tempat produk dibeli.

## Roadmap

Morphy Cook Official akan terus diperbaiki.

Update berikutnya bisa berisi fitur baru, peningkatan, optimasi, penguatan keamanan, dan opsi kustomisasi tambahan. Lihat `CHANGELOG.md` untuk status terkini (fitur review: API sudah jadi, frontend menyusul).

## Kredit

**Morphy Cook Official**

Copyright (c) 2026 Morphy Labs. Dikembangkan oleh **Morphy Labs**.

---

Terima kasih sudah melihat repository github **Morphy Cook Official**.

[![Donasi Saweria](https://shields.io)](https://saweria.co/MorphyLabs)

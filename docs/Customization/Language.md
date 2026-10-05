<style>
    *{
    transition: all ease-in-out .2s;
  }
  .drawer{
    display:none;
    position: fixed; top: 70px; right: 0px; width: 250px; background: rgba(255, 255, 255, 1); padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;
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
    <li class="menu-items"><a href="#title" class="title">Language Customization</a></li>
    <li class="menu-items"><a href="#title1" class="title">Language Structure</a></li>
    <li class="menu-items"><a href="#title2" class="title">Adding a New Language</a></li>
    <li class="menu-items"><a href="#title3" class="title">Translation Files</a></li>
    <li class="menu-items"><a href="#title4" class="title">Translation Keys</a></li>
    <li class="menu-items"><a href="#title5" class="title">Keeping Translation Files Consistent</a></li>
    <li class="menu-items"><a href="#title6" class="title">Adding New Translation Text</a></li>
    <li class="menu-items"><a href="#title7" class="title">Organizing Translation Keys</a></li>
    <li class="menu-items"><a href="#title8" class="title">Using Translations in Components</a></li>
    <li class="menu-items"><a href="#title9" class="title">Changing the Default Language</a></li>
    <li class="menu-items"><a href="#title10" class="title">Changing the Fallback Language</a></li>
    <li class="menu-items"><a href="#title11" class="title">Adding a Language Selector</a></li>
    <li class="menu-items"><a href="#title12" class="title">Recommended Language Workflow</a></li>
    <li class="menu-items"><a href="#title13" class="title">Language Customization Example</a></li>
    <li class="menu-items"><a href="#title14" class="title">Important Notes</a></li>
    <li class="menu-items"><a href="#title15" class="title">Summary</a></li>
    <li class="menu-items"><a href="#roadmap" class="title">Roadmap Documentation</a></li>
  </ul>
</div>

<h1 id="title">Kustomisasi Bahasa</h1>

Dokumen ini menjelaskan cara menambah, mengubah, dan mengatur bahasa yang dipakai di aplikasi frontend. Ditulis dengan bahasa sederhana supaya mudah diikuti.

Proyek ini memakai **i18next** dan **react-i18next** untuk multi-bahasa. Sistem bahasanya dibagi 2 bagian utama:

- `src/i18n.js` — Untuk menyalakan i18next dan mendaftarkan bahasa yang tersedia.
- `src/locales/` — Berisi file terjemahan tiap bahasa.

Dengan struktur ini, kamu bisa tambah atau ubah bahasa tanpa harus mengedit teks langsung di dalam komponen.

<h2 id="title1">Struktur Bahasa</h2>

Susunan file bahasanya seperti ini:

```text
frontend/
└── src/
    ├── i18n.js
    │
    └── locales/
        ├── en.json
        └── id.json
```

Saat ini proyek berisi:

- `en.json` — Terjemahan Bahasa Inggris.
- `id.json` — Terjemahan Bahasa Indonesia.

Kamu bisa menambah file bahasa lain sesuai kebutuhan.

## `src/i18n.js`

File `i18n.js` adalah **pengaturan awal** sistem bahasa aplikasi.

Tugasnya:

- Mengambil (import) file terjemahan.
- Mendaftarkan bahasa yang tersedia.
- Menentukan bahasa default (bawaan).
- Menentukan bahasa cadangan (fallback).
- Menyalakan `react-i18next`.
- Mengatur cara nilai terjemahan dibaca.

Contohnya:

```javascript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import id from "@/locales/id.json";
import en from "@/locales/en.json";

const defaultLanguage = localStorage.getItem("language") || "id";

i18n.use(initReactI18next).init({
  resources: {
    id: {
      translation: id,
    },
    en: {
      translation: en,
    },
  },
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

Bagian paling penting adalah `resources`:

```javascript
resources: {
  id: {
    translation: id,
  },
  en: {
    translation: en,
  },
}
```

Tiap bahasa didaftarkan pakai kode bahasa.

Contoh:

```text
id → Bahasa Indonesia
en → Bahasa Inggris
```

<h2 id="title2">Menambah Bahasa Baru</h2>

Untuk menambah bahasa baru, ada 2 langkah utama:

1. Buat file terjemahan baru di `src/locales/`.
2. Daftarkan bahasa itu di `src/i18n.js`.

### Langkah 1 — Buat File Terjemahan

Contoh mau menambah Bahasa Jepang:

```text
src/
└── locales/
    ├── en.json
    ├── id.json
    └── ja.json
```

Kode bahasanya ikuti kode yang umum dipakai aplikasi.

### Langkah 2 — Daftarkan Bahasanya

Import file terjemahan baru:

```javascript
import ja from "@/locales/ja.json";
```

Lalu daftarkan di `resources`:

```javascript
resources: {
  id: {
    translation: id,
  },
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
}
```

Sekarang bahasa baru sudah terdaftar di i18next.

<h2 id="title3">File Terjemahan</h2>

Folder `src/locales/` berisi isi terjemahan yang sebenarnya.

Contoh:

```text
src/locales/
├── en.json
└── id.json
```

Tiap file JSON mewakili satu bahasa.

Isinya adalah kunci terjemahan dan teksnya.

Contoh:

```json
{
  "common": {
    "title": "Morphy Cook Official"
  }
}
```

Strukturnya bisa berisi banyak grup:

```json
{
  "common": {
    "title": "Morphy Cook Official",
    "welcome": "Welcome"
  },
  "navbar": {
    "home": "Home",
    "recipes": "Recipes",
    "profile": "Profile"
  }
}
```

**Nama kuncinya bebas.** Kamu bisa pakai nama yang masuk akal untuk proyekmu.

Nilainya (value) adalah teks yang tampil ke user.

Contoh:

```json
{
  "common": {
    "title": "Morphy Cook Official"
  }
}
```

Artinya:

```text
common → grup terjemahan
title  → kunci terjemahan
Morphy Cook Official → teks yang tampil
```

<h2 id="title4">Kunci Terjemahan (Translation Keys)</h2>

Kunci terjemahan adalah acuan yang dipakai frontend untuk mengambil teks yang benar.

Contoh:

```json
{
  "common": {
    "title": "Morphy Cook Official"
  }
}
```

Aplikasi memanggil nilainya dengan:

```text
common.title
```

Namanya tidak harus `title`.

Kamu bisa bikin nama sendiri:

```json
{
  "common": {
    "websiteName": "Morphy Cook Official"
  }
}
```

Maka kunci terjemahannya menjadi:

```text
common.websiteName
```

Sebaiknya pakai nama yang jelas supaya file terjemahan gampang dirawat.

<h2 id="title5">Jaga File Terjemahan Tetap Sama</h2>

Kalau aplikasi mendukung banyak bahasa, kunci terjemahannya harus sama di semua file.

Contoh `en.json`:

```json
{
  "common": {
    "title": "Morphy Cook Official",
    "welcome": "Welcome"
  }
}
```

Dan `id.json`:

```json
{
  "common": {
    "title": "Morphy Cook Official",
    "welcome": "Selamat Datang"
  }
}
```

Kedua file sama-sama punya:

```text
common.title
common.welcome
```

Yang beda hanya isi terjemahannya.

Ini penting karena aplikasi memakai kunci yang sama, apa pun bahasa yang sedang dipilih.

<h2 id="title6">Menambah Teks Terjemahan Baru</h2>

Misalnya kamu mau menambah teks baru:

```text
Discover delicious recipes
```

Tambahkan kunci ke tiap file bahasa.

### Bahasa Inggris

```json
{
  "common": {
    "discoverRecipes": "Discover delicious recipes"
  }
}
```

### Bahasa Indonesia

```json
{
  "common": {
    "discoverRecipes": "Temukan resep lezat"
  }
}
```

Aplikasi lalu bisa memakai:

```text
common.discoverRecipes
```

Teks yang tampil akan mengikuti bahasa yang sedang dipilih.

<h2 id="title7">Mengelompokkan Kunci Terjemahan</h2>

Untuk aplikasi yang besar, sebaiknya kelompokkan kunci berdasarkan fitur.

Contoh:

```json
{
  "common": {
    "title": "Morphy Cook Official"
  },
  "navbar": {
    "home": "Home",
    "recipes": "Recipes"
  },
  "profile": {
    "title": "Profile",
    "edit": "Edit Profile"
  },
  "recipe": {
    "title": "Recipes",
    "create": "Create Recipe",
    "update": "Update Recipe"
  },
  "authentication": {
    "login": "Login",
    "register": "Register",
    "logout": "Logout"
  }
}
```

Cara ini bikin terjemahan gampang dicari dan dirawat saat aplikasi makin besar.

<h2 id="title8">Memakai Terjemahan di Komponen</h2>

Kunci terjemahan dipakai komponen React lewat `react-i18next`.

Komponen biasanya memakai hook `useTranslation`:

```javascript
import { useTranslation } from "react-i18next";

const ExampleComponent = () => {
  const { t } = useTranslation();

  return <h1>{t("common.title")}</h1>;
};
```

Aplikasi akan menampilkan teks sesuai bahasa yang sedang dipilih.

Contoh:

```json
{
  "common": {
    "title": "Morphy Cook Official"
  }
}
```

akan tampil sebagai:

```text
Morphy Cook Official
```

Kalau bahasanya diganti, kunci yang sama bisa menampilkan nilai yang berbeda.

<h2 id="title9">Mengganti Bahasa Default</h2>

Proyek menentukan bahasa awal lewat `localStorage` di browser.

Pengaturan saat ini:

```javascript
const defaultLanguage = localStorage.getItem("language") || "id";
```

Artinya:

1. Aplikasi cek apakah ada nilai `language` di `localStorage`.
2. Kalau sudah pernah dipilih, bahasa itu yang dipakai.
3. Kalau belum ada, dipakai `id` sebagai bahasa bawaan.

Untuk mengganti bahasa bawaan, ubah nilai cadangannya.

Contoh:

```javascript
const defaultLanguage = localStorage.getItem("language") || "en";
```

Ini membuat Bahasa Inggris jadi bawaan kalau belum ada pilihan bahasa sebelumnya.

<h2 id="title10">Mengganti Bahasa Cadangan (Fallback)</h2>

Di pengaturan awal juga ada:

```javascript
fallbackLng: defaultLanguage;
```

Bahasa cadangan dipakai kalau terjemahan untuk bahasa yang dipilih tidak ketemu.

Kamu bisa atur bahasa cadangan tertentu kalau perlu.

Contoh:

```javascript
fallbackLng: "en";
```

Artinya Bahasa Inggris dipakai sebagai cadangan.

<h2 id="title11">Menambah Pilihan Bahasa (Language Selector)</h2>

Proyek bisa menyediakan pilihan bahasa supaya user bisa pindah bahasa.

Daftar pilihan bahasa harus sama dengan kode bahasa yang didaftarkan di `i18n.js`.

Contoh:

```text
id → Indonesian
en → English
ja → Japanese
```

Saat menambah bahasa baru, pastikan bahasa itu:

- Sudah ada di `src/locales/`.
- Sudah di-import ke `i18n.js`.
- Sudah didaftarkan di `resources`.
- Sudah ditambahkan ke tampilan pilihan bahasa (kalau aplikasi menyediakannya).
- Sudah punya kunci terjemahan yang sesuai.

<h2 id="title12">Alur Kerja Bahasa yang Disarankan</h2>

Saat menambah atau mengubah bahasa, ikuti alur ini:

```text
1. Buat atau update file JSON bahasanya
              │
              ▼
2. Jaga kunci terjemahan tetap sama
              │
              ▼
3. Daftarkan bahasa baru di i18n.js
              │
              ▼
4. Tambahkan bahasa ke pilihan bahasa
              │
              ▼
5. Test aplikasinya
              │
              ▼
6. Cek semua halaman penting
```

<h2 id="title13">Contoh Kustomisasi Bahasa</h2>

Misalnya mau menambah Bahasa Prancis.

Buat:

```text
src/locales/fr.json
```

Isi terjemahannya:

```json
{
  "common": {
    "title": "Morphy Cook Official",
    "welcome": "Bienvenue"
  }
}
```

Import ke `i18n.js`:

```javascript
import fr from "@/locales/fr.json";
```

Daftarkan:

```javascript
resources: {
  id: {
    translation: id,
  },
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
}
```

Kalau proyek punya pilihan bahasa, tambahkan Bahasa Prancis ke daftar pilihannya juga.

<h2 id="title14">Hal Penting</h2>

### Kunci Bukan Teks yang Tampil

Kunci hanya acuan yang dipakai aplikasi.

Contoh:

```json
{
  "common": {
    "welcomeMessage": "Welcome to Morphy Cook Official"
  }
}
```

Kunci:

```text
common.welcomeMessage
```

tidak ditampilkan ke user.

Nilainya:

```text
Welcome to Morphy Cook Official
```

itulah teks yang tampil di aplikasi.

### Jangan Tulis Teks Langsung di Komponen

Kalau teks perlu multi-bahasa, jangan tulis langsung di komponen.

Jangan seperti ini:

```jsx
<h1>Welcome</h1>
```

Tapi pakai kunci terjemahan:

```jsx
<h1>{t("common.welcome")}</h1>
```

Lalu definisikan terjemahannya di tiap file bahasa.

### Jaga Kunci Tetap Sama

Saat menambah kunci baru, tambahkan kunci yang sama ke semua file bahasa.

Contoh:

```text
en.json → common.welcome
id.json → common.welcome
```

Ini mencegah terjemahan hilang saat user ganti bahasa.

### Test Bahasa Baru

Setelah menambah bahasa, test:

- Navigasi
- Halaman login / daftar
- Halaman resep
- Halaman profil
- Form
- Pesan validasi
- Tampilan kosong
- Modal
- Notifikasi
- Tombol dan aksi

Pastikan tidak ada kunci yang hilang atau salah tulis.

<h2 id="title15">Ringkasan</h2>

Sistem bahasa sengaja dipisah menjadi file pengaturan dan file terjemahan:

```text
src/
├── i18n.js
│   └── Menyalakan & mendaftarkan bahasa
│
└── locales/
    ├── en.json
    │   └── Terjemahan Inggris
    │
    ├── id.json
    │   └── Terjemahan Indonesia
    │
    └── <language>.json
        └── Terjemahan bahasa tambahan
```

Pakai **`i18n.js`** saat menambah atau mendaftarkan bahasa baru.

Pakai **`src/locales/*.json`** saat menambah atau mengubah teks terjemahannya.

Pemisahan ini bikin aplikasi gampang diterjemahkan, dirawat, dan ditambah bahasanya di masa depan.

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

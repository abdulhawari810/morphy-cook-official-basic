<style>
    *{
    transition: all ease-in-out .2s;
  }
  .drawer{
    display:none;
    position: fixed; top: 70px; right: 0px; width: 280px; background: rgba(255, 255, 255, 1); padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;
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
    <li class="menu-items"><a href="#title" class="title">Theme Customization</a></li>
    <li class="menu-items">
       <a href="#title1" class="title">Theme Configuration Overview</a>
       <ol class="list">
          <li class="menu-items"><a href="#title2" class="items">Stage 1 — Define Theme Colors</a></li>
          <li class="menu-items"><a href="#title3" class="items">Creating Additional Themes</a></li>
          <li class="menu-items"><a href="#title4" class="items">Stage 2 — Theme Logic</a></li>
       </ol>
    </li>
    <li class="menu-items">
      <a href="#title5" class="title">How the Theme Hook Works</a>
      <ol class="list">
          <li class="menu-items"><a href="#title6" class="items">System Theme</a></li>
          <li class="menu-items"><a href="#title7" class="items">Initializing the Theme</a></li>
          <li class="menu-items"><a href="#title8" class="items">Authentication Pages</a></li>
          <li class="menu-items"><a href="#title9" class="items">Adding a New Theme</a></li>
       </ol>
    </li>
    <li class="menu-items"><a href="#title10" class="title">Recommended Theme Structure</a></li>
    <li class="menu-items"><a href="#title11" class="title">Customizing Existing Themes</a></li>
    <li class="menu-items"><a href="#title12" class="title">Important Notes</a></li>
    <li class="menu-items"><a href="#title13" class="title">Summary</a></li>
    <li class="menu-items"><a href="#roadmap" class="title">Roadmap Documentation</a></li>
  </ul>
</div>

<h1 id="title">Kustomisasi Tema</h1>

Dokumen ini menjelaskan cara mengubah tema website dan menambah tema baru di aplikasi frontend. Ditulis dengan bahasa sederhana supaya mudah diikuti.

Proyek ini sekarang mendukung 3 mode tema:

- **Light** — Tema terang.
- **Dark** — Tema gelap.
- **System** — Otomatis mengikuti pengaturan browser / HP / laptop user.

Kustomisasi tema ada 2 tahap utama:

1. **Tentukan warna tema** di `global.css` dan `custom.css`.
2. **Daftarkan dan pasang tema** lewat `src/utils/theme.utils.js`.

<h2 id="title1">Gambaran Pengaturan Tema</h2>

Sistem tema bekerja lewat class CSS dan variabel CSS:

```text
Pengaturan Tema
│
├── global.css / custom.css
│   └── Tentukan warna tema
│
├── theme.utils.js
│   └── Pasang class tema yang dipilih
│
└── Layout / Halaman Auth
    └── Menyalakan useTheme()
```

---

<h3 id="title2">Tahap 1 — Tentukan Warna Tema</h3>

---

Langkah pertama adalah menentukan warna yang dipakai tema.

Pengaturan utama ada di:

```text
src/css/global.css
src/css/custom.css
```

### `global.css`

Import Tailwind harus ditaruh paling atas file:

```css
@import "tailwindcss";
```

Lalu definisikan varian dark:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Contoh pengaturan dasar:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-neutral-800: #283044;
  --color-neutral-900: #0f172a;
  --color-neutral-950: #131b2e;
}
```

### Apa Fungsi `@theme`?

Blok `@theme` adalah tempat menyimpan variabel warna Tailwind.

Contoh:

```css
@theme {
  --color-neutral-800: #283044;
  --color-neutral-900: #0f172a;
  --color-neutral-950: #131b2e;
}
```

Tiap variabel bentuknya:

```text
--color-[nama]: [nilai warna];
```

Nilai warna bisa berupa:

- HEX
- RGB
- RGBA
- Nilai warna lain yang didukung CSS

Contoh:

```css
@theme {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
}
```

Kamu bisa bikin warna sebanyak yang dibutuhkan proyek.

### Cara Memakai Warna Sendiri

Setelah warna didaftarkan di `@theme`, warna itu bisa dipakai lewat class Tailwind.

Contoh:

```css
@theme {
  --color-primary: #2563eb;
}
```

Pakai di komponen:

```jsx
<div className="bg-primary">...</div>
```

Untuk gaya khusus dark mode, pakai varian `dark:`:

```jsx
<div className="dark:bg-neutral-900">...</div>
```

Artinya background akan memakai `neutral-900` saat class `.dark` aktif.

Kamu juga bisa menggabungkan warna sendiri dengan varian dark:

```css
@theme {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
}
```

```jsx
<div className="bg-primary dark:bg-primary-dark">...</div>
```

Dengan begitu warna yang tampil beda tergantung tema yang aktif.

---

<h2 id="title3">Membuat Tema Tambahan</h2>

Proyek ini bisa ditambah tema lain.

Contohnya, di theme utility sudah ada contoh tema `yellow`:

```javascript
if (theme === "yellow") {
  root.classList.add("yellow");
}
```

Kalau mau bikin tema lain, misalnya `blue`, kamu perlu mengatur sisi CSS dan sisi JavaScript.

### Langkah 1 — Definisikan Temanya

Tambahkan definisi CSS yang dibutuhkan ke `global.css` atau `custom.css`.

Contoh:

```css
.blue {
  --color-primary: #2563eb;
  --color-background: #eff6ff;
}
```

Struktur CSS persisnya tergantung bagaimana komponen memakai variabelnya.

### Langkah 2 — Daftarkan Temanya

Buka:

```text
src/utils/theme.utils.js
```

Tambahkan tema ke daftar class yang dihapus:

```javascript
root.classList.remove("dark", "light", "yellow", "blue");
```

Lalu tambahkan tema baru:

```javascript
if (theme === "blue") {
  root.classList.add("blue");
}
```

Pilihan tema lalu bisa menyimpan:

```text
blue
```

di `localStorage`.

> Saat menambah tema baru, pastikan nama temanya sama di class CSS, logika JavaScript, dan tampilan pilihan tema.

---

<h3 id="title4">Tahap 2 — Logika Tema</h3>

---

Tahap kedua diatur oleh:

```text
src/utils/theme.utils.js
```

Hook `useTheme()` mengatur tema yang sedang dipilih.

Tugas utamanya:

- Membaca tema yang tersimpan di `localStorage`.
- Menyimpan tema pilihan di state React.
- Memasang class yang sesuai ke `<html>`.
- Mendukung `dark`, `light`, dan `system`.
- Menyimpan pilihan tema user.

Bentuk dasarnya:

```javascript
import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("dark", "light", "yellow");

    if (theme === "dark") {
      root.classList.add("dark");
    }

    if (theme === "light") {
      root.classList.add("light");
    }

    if (theme === "yellow") {
      root.classList.add("yellow");
    }

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      root.classList.toggle("dark", isDark);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
```

<h2 id="title5">Cara Kerja Theme Hook</h2>

Saat aplikasi dibuka, hook mengecek:

```javascript
localStorage.getItem("theme");
```

Kalau sebelumnya sudah pernah pilih tema, tema itu yang dipakai.

Kalau belum ada, aplikasi memakai:

```text
light
```

sebagai bawaan.

Tema yang dipilih lalu dipasang ke elemen HTML utama:

```javascript
document.documentElement;
```

Contoh, saat tema yang dipilih `dark`:

```html
<html class="dark"></html>
```

Saat `light` dipilih:

```html
<html class="light"></html>
```

Class `.dark` inilah yang membuat gaya `dark:` di Tailwind bisa jalan.

---

<h2 id="title6">Tema System</h2>

---

Opsi `system` memakai pengaturan browser / sistem operasi:

```javascript
window.matchMedia("(prefers-color-scheme: dark)").matches;
```

Kalau sistem user memakai dark mode, aplikasi mengaktifkan:

```html
<html class="dark"></html>
```

Kalau sistem memakai light mode, class dark tidak dipasang.

Dengan begitu website otomatis mengikuti pengaturan sistem user.

---

<h3 id="title7">Menyalakan Tema</h3>

---

Hook `useTheme()` harus dipanggil saat aplikasi dibuka.

Kebanyakan halaman tampil lewat layout, jadi hook sebaiknya dinyalakan di dalam layout yang sesuai.

Folder layout ada di:

```text
src/layout/
```

Contoh:

```javascript
import { useTheme } from "@/utils/theme.utils";

export default function DashboardLayout() {
  const { theme, setTheme } = useTheme();

  // ...
}
```

Ini memastikan pengaturan tema jalan saat layout tampil.

---

<h3 id="title8">Halaman Login / Daftar</h3>

---

Halaman `Login` dan `Register` perlu perhatian khusus.

Halaman ini ada di:

```text
src/views/auth/
```

Kalau halaman ini tidak memakai layout utama aplikasi, mereka harus menyalakan `useTheme()` sendiri.

Contoh:

```javascript
import { useTheme } from "@/utils/theme.utils";

export default function Login() {
  const { theme, setTheme } = useTheme();

  // ...
}
```

Sama untuk halaman register:

```javascript
import { useTheme } from "@/utils/theme.utils";

export default function Register() {
  const { theme, setTheme } = useTheme();

  // ...
}
```

Tanpa ini, tema bisa tidak kepasang dengan benar saat user langsung membuka halaman tersebut.

---

<h3 id="title9">Menambah Tema Baru</h3>

---

Untuk menambah tema baru, urutannya seperti ini:

```text
1. Tentukan warna tema
       │
       ▼
2. Buat class CSS temanya
       │
       ▼
3. Daftarkan tema di theme.utils.js
       │
       ▼
4. Tambahkan tema ke pilihan tema
       │
       ▼
5. Nyalakan useTheme() di layout / view yang perlu
       │
       ▼
6. Test tema barunya
```

Contoh, menambah tema `yellow` butuh definisi CSS yang sesuai dan:

```javascript
if (theme === "yellow") {
  root.classList.add("yellow");
}
```

Pilihan tema juga harus menyediakan `yellow` sebagai opsi.

---

<h2 id="title10">Struktur Tema yang Disarankan</h2>

Saat membuat banyak tema, jaga nama temanya tetap konsisten.

Contoh:

```text
light
dark
yellow
blue
green
```

Nama yang sama harus dipakai di:

```text
class CSS
     ↓
theme.utils.js
     ↓
localStorage
     ↓
Pilihan tema
```

Contoh:

```text
blue
```

harus selalu merujuk ke tema yang sama di seluruh aplikasi.

---

<h2 id="title11">Mengubah Tema yang Sudah Ada</h2>

Kamu bisa mengubah warna tema yang ada dengan mengganti variabel CSS-nya.

Contoh:

```css
@theme {
  --color-neutral-800: #283044;
  --color-neutral-900: #0f172a;
  --color-neutral-950: #131b2e;
}
```

Ganti nilai warnanya untuk mengubah tampilan:

```css
@theme {
  --color-neutral-800: #334155;
  --color-neutral-900: #1e293b;
  --color-neutral-950: #0f172a;
}
```

Karena variabel ini dipakai ulang oleh banyak UI, mengubahnya bisa berdampak ke banyak komponen sekaligus.

Ini berguna untuk cepat menyesuaikan proyek ke brand atau gaya visual yang berbeda.

---

<h2 id="title12">Hal Penting</h2>

### Jangan Hapus `@import "tailwindcss";`

Pastikan import Tailwind tetap ada di paling atas `global.css`:

```css
@import "tailwindcss";
```

Pengaturan tema butuh Tailwind yang termuat dengan benar.

### Jaga Nama Tema Tetap Sama

Kalau bikin tema bernama:

```text
blue
```

pastikan nama yang sama dipakai di:

- CSS
- `theme.utils.js`
- Pilihan tema
- `localStorage`

### Test Semua Tema

Setelah mengubah atau menambah tema, test:

- Homepage
- Navigasi
- Halaman resep
- Halaman login / daftar
- Halaman profil
- Form
- Modal
- Kartu
- Tampilan kosong
- Tampilan loading
- Tata letak responsif

### Halaman Login / Daftar

Ingat `Login` dan `Register` tidak tergantung layout utama aplikasi.

Jadi, panggil:

```javascript
const { theme, setTheme } = useTheme();
```

di dalam view tersebut supaya tema juga nyala di halaman login / daftar.

<h2 id="title13">Ringkasan</h2>

Sistem tema dibagi menjadi 2 tanggung jawab utama:

```text
global.css / custom.css
        │
        │ Tentukan warna dan gaya tema
        ▼
theme.utils.js
        │
        │ Pasang tema yang dipilih
        ▼
Layout / Halaman Login-Daftar
        │
        ▼
Tampilan Aplikasi
```

Pakai **`global.css`** dan **`custom.css`** untuk menentukan dan mengubah warna serta gaya tema.

Pakai **`src/utils/theme.utils.js`** untuk mendaftarkan dan memasang class tema.

Pakai **`src/layout/`** dan view login / daftar di **`src/views/auth/`** untuk menyalakan tema saat aplikasi dibuka.

Struktur ini bikin gampang mengubah tema yang ada atau menambah tema baru tanpa mengubah seluruh struktur UI aplikasi.

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

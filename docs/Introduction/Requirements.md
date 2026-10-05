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
        <a href="#requirement" class="title">Requirements</a>
      </li>
      <li class="menu-items">
        <a href="#required" class="title">Required Software</a>
      </li>
      <li class="menu-items">
        <a href="#optional" class="title">Optional Development Tools</a>
      </li>
      <li class="menu-items">
        <a href="#version" class="title">Version Compatibility</a>
      </li>
      <li class="menu-items"><a href="#roadmap" class="title">Roadmap Documentation</a></li>
  </ul>
</div>

<h1 id="requirement">Syarat (Requirements)</h1>

Biar proyek jalan lancar, kamu butuh software dan versi di bawah ini. Ikuti saja, tidak rumit.

<h2 id="required">Software Wajib</h2>

### Node.js

- **Versi:** `v24.11.1` ke atas
- **Fungsi:** Mesin buat jalanin backend dan semua library-nya.

> Tanpa Node.js, backend tidak bisa jalan.

### npm

- **Versi:** `11.6.2` ke atas
- **Fungsi:** Alat buat install dan atur library proyek.

> npm biasanya sudah ikut saat install Node.js.

### MySQL

- **Versi:** `8.4` ke atas
- **Fungsi:** Database buat simpan data. Contoh: user, resep, kategori, login, dan review.

> Tabel `reviews` (isi: `userId`, `recipeId`, `rating`, `comment`) juga disimpan di sini.

<h2 id="optional">Alat Tambahan (Opsional)</h2>

Tidak wajib. Tapi bikin kerja lebih nyaman.

### Nodemon

- **Versi:** `3.1.14` ke atas
- **Fungsi:** Restart server otomatis tiap ada perubahan kode. Tidak perlu restart manual.

### Laragon

- **Versi:** `6.0.0` ke atas
- **Fungsi:** Paket lokal buat jalanin web dan atur service seperti database.

Link download [Laragon Versi 6.0.0](https://github.com/leokhoa/laragon/releases?page=2#release-6.0.0)

> **Catatan:** Kalau pakai Laragon, tidak perlu install MySQL, Apache, atau phpMyAdmin satu per satu. Semua sudah diatur lewat Laragon.

<h2 id="version">Cocok Versi</h2>

Pakai versi yang disarankan atau yang mirip. Kalau versinya jauh beda, bisa error.

Contoh masalah kalau versi beda jauh:
- Gagal install library.
- Config tidak cocok.
- Aplikasi crash saat jalan.

Syarat ini bisa berubah kalau proyek update atau tambah fitur baru.

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

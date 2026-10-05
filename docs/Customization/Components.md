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
    <li class="menu-items"><a href="#customization" class="title">Component Customization</a></li>
    <li class="menu-items"><a href="#structure" class="title">Component Structure</a></li>
    <li class="menu-items"><a href="#features" class="title">Feature-Specific Components</a></li>
    <li class="menu-items"><a href="#reusable" class="title">Reusable Components</a></li>
    <li class="menu-items"><a href="#rating" class="title">Panduan Review & Rating</a></li>
    <li class="menu-items"><a href="#workflow" class="title">Component Customization Workflow</a></li>
    <li class="menu-items"><a href="#styles" class="title">Customizing Component Styles</a></li>
    <li class="menu-items"><a href="#add" class="title">Adding a New Component</a></li>
    <li class="menu-items"><a href="#reusing" class="title">Reusing Components</a></li>
    <li class="menu-items"><a href="#modifying" class="title">Modifying Existing Components Safely</a></li>
    <li class="menu-items"><a href="#Creating" class="title">Creating Feature-Specific Componentst</a></li>
    <li class="menu-items"><a href="#recommended" class="title">Recommended Customization Approach</a></li>
    <li class="menu-items"><a href="#important" class="title">Important Notes</a></li>
    <li class="menu-items"><a href="#roadmap" class="title">Roadmap Documentation</a></li>
  </ul>
</div>

<h2 id="customization">Kustomisasi Komponen</h2>

Dokumen ini menjelaskan cara mengubah komponen frontend yang bisa dipakai ulang di proyek ini. Bahasanya dibuat sederhana agar mudah diikuti.

Semua komponen frontend ada di folder `src/components/`. Komponen dipisah berdasarkan fungsinya supaya gampang dicari, diubah, dan dipakai ulang.

<h2 id="structure">Struktur Komponen</h2>

Struktur utama komponen seperti ini:

```text
frontend/
└── src/
    └── components/
        ├── loading/
        ├── profile/
        │   ├── LanguageSection.jsx
        │   ├── ProfileSection.jsx
        │   ├── SecuritySection.jsx
        │   └── ThemeSection.jsx
        │
        ├── ui/
        ├── animate.spin.component.jsx
        ├── card.component.jsx
        ├── carousel.component.jsx
        ├── filter.component.jsx
        ├── footer.component.jsx
        ├── form.component.jsx
        ├── menu.component.jsx
        ├── modal.component.jsx
        ├── navbar.component.jsx
        ├── no_data_found.component.jsx
        ├── pagination.components.jsx
        ├── profil_menu.component.jsx
        └── rating.component.jsx
```

Secara umum ada 2 jenis komponen:

- **Komponen khusus fitur** — Dibuat untuk satu bagian tertentu saja (contoh: profil).
- **Komponen reusable** — Bisa dipakai di banyak halaman.

<h2 id="features">Komponen Khusus Fitur</h2>

Komponen khusus fitur dikelompokkan per folder.

### `profile/`

Folder `profile` berisi komponen untuk halaman profil user.

```text
profile/
├── LanguageSection.jsx
├── ProfileSection.jsx
├── SecuritySection.jsx
└── ThemeSection.jsx
```

### `LanguageSection.jsx`

Mengatur bagian bahasa di profil user.

Ubah file ini kalau mau mengubah:

- Tampilan pilihan bahasa
- Daftar bahasa yang tersedia
- Pengaturan bahasa
- Cara pilihan bahasa ditampilkan

### `ProfileSection.jsx`

Mengatur info utama profil.

Ubah file ini kalau mau mengubah:

- Info profil
- Foto profil (avatar)
- Detail user
- Form edit profil
- Tombol aksi terkait profil

### `SecuritySection.jsx`

Mengatur keamanan akun.

Ubah file ini kalau mau mengubah:

- Pengaturan password
- Opsi keamanan akun
- Tampilan pengaturan keamanan
- Aksi terkait keamanan

### `ThemeSection.jsx`

Mengatur tema tampilan.

Ubah file ini kalau mau mengubah:

- Pilihan tema
- Mode terang / gelap
- Tampilan pilihan tema
- Daftar tema yang tersedia

<h3 id="reusable">Komponen Reusable</h3>

File yang langsung ada di `src/components/` adalah komponen reusable. Artinya bisa dipakai di banyak halaman dan fitur.

### `navbar.component.jsx`

Berisi navbar (menu atas) aplikasi.

Ubah kalau mau mengatur:

- Link navigasi
- Logo atau branding
- Tata letak navigasi
- Navigasi user
- Tampilan responsif (HP / desktop)

### `footer.component.jsx`

Berisi footer (bagian bawah) aplikasi.

Ubah kalau mau mengatur:

- Link footer
- Info copyright
- Link media sosial
- Tata letak footer
- Info branding

### `menu.component.jsx`

Komponen menu yang bisa dipakai ulang.

Bisa diubah untuk:

- Daftar item menu
- Aksi tiap menu
- Opsi navigasi
- Dropdown atau menu tambahan

### `profil_menu.component.jsx`

Berisi menu yang berhubungan dengan profil.

Ubah kalau mau mengatur:

- Item menu profil
- Aksi akun
- Navigasi user
- Opsi logout atau profil lainnya

### `card.component.jsx`

Komponen kartu untuk menampilkan konten dengan rapi.

Bisa diubah untuk:

- Tata letak kartu
- Jarak antar elemen
- Cara konten ditampilkan
- Tombol aksi di kartu
- Gaya visual

### `carousel.component.jsx`

Komponen carousel untuk menampilkan banyak item secara geser / horizontal.

Yang bisa diubah:

- Jumlah item yang tampil
- Tombol navigasi
- Jarak antar item
- Perilaku geser
- Tata letak responsif

### `filter.component.jsx`

Berisi tampilan filter yang bisa dipakai ulang.

Ubah kalau mau mengatur:

- Opsi filter
- Kontrol filter
- Tata letak filter
- Kriteria filter yang tersedia
- Interaksi filter

### `form.component.jsx`

Menyediakan fungsi dan tampilan form yang bisa dipakai ulang.

Yang bisa diubah:

- Tata letak form
- Field form
- Tampilan input
- Tampilan validasi
- Tombol aksi form

### `modal.component.jsx`

Komponen modal / dialog yang bisa dipakai ulang.

Bisa diubah untuk:

- Tata letak modal
- Ukuran modal
- Header dan footer
- Tombol konfirmasi
- Perilaku tombol tutup

### `pagination.components.jsx`

Menyediakan fungsi pindah halaman (pagination) untuk data yang banyak.

Yang bisa diubah:

- Jumlah tombol halaman yang tampil
- Tombol sebelum / sesudah
- Tata letak pagination
- Tampilan halaman aktif
- Perilaku pagination

### `rating.component.jsx`

> Bagian ini adalah panduan lengkap review. Lihat seksi [Panduan Review & Rating](#rating).

File aslinya (`frontend/src/components/rating.component.jsx`) saat ini masih sederhana: hanya menampilkan 5 ikon bintang statis dan angka `5.0`. Belum bisa diklik, belum mengambil data dari backend.

Jangan pakai langsung untuk fitur review. Kembangkan dulu menjadi komponen review lengkap seperti panduan di bawah.

### `no_data_found.component.jsx`

Ditampilkan kalau data kosong / tidak ada hasil.

Yang bisa diubah:

- Pesan saat data kosong
- Gambar ilustrasi
- Tata letak
- Tombol ajakan (call-to-action)
- Tampilan keseluruhan

### `animate.spin.component.jsx`

Animasi loading / spinner yang bisa dipakai ulang.

Ubah kalau mau mengatur:

- Animasi loading
- Ukuran spinner
- Perilaku animasi
- Tampilan loading

## `loading/`

Folder `loading` berisi komponen loading.

Dipakai saat aplikasi sedang menunggu data, memproses sesuatu, atau memuat halaman.

Ubah folder ini kalau mau mengganti pengalaman loading, contohnya:

- Indikator loading
- Animasi loading
- Tampilan skeleton
- Status loading

## `ui/`

Folder `ui` berisi komponen dari **shadcn/ui**.

Komponen ini dipakai sebagai bahan dasar di seluruh aplikasi. Bedanya dengan komponen biasa: file komponen shadcn langsung dibuat di dalam proyek, jadi bisa diubah langsung sesuai kebutuhan.

Isinya bisa seperti ini (tergantung apa yang sudah di-install):

```text
ui/
├── button.jsx
├── dialog.jsx
├── dropdown-menu.jsx
├── input.jsx
├── select.jsx
└── ...
```

### Menambah Komponen shadcn/ui Baru

Kalau butuh komponen shadcn yang belum ada di folder `ui/`, tambahkan lewat shadcn CLI.

Dari folder frontend, jalankan:

```bash
npx shadcn@latest add <component>
```

Contoh menambah Button:

```bash
npx shadcn@latest add button
```

Menambah beberapa sekaligus:

```bash
npx shadcn@latest add button dialog input
```

CLI akan membuat file komponen dan meng-install dependensi yang dibutuhkan.

Hasilnya contohnya:

```text
src/
└── components/
    └── ui/
        ├── button.jsx
        ├── dialog.jsx
        └── input.jsx
```

### Cara Menambah Komponen shadcn/ui

Alurnya:

```text
1. Tentukan komponen shadcn yang dibutuhkan
        │
        ▼
2. Buka folder frontend
        │
        ▼
3. Jalankan shadcn CLI
        │
        ▼
4. File komponen dibuat di src/components/ui/
        │
        ▼
5. Import dan pakai komponennya
```

Contoh:

```bash
cd frontend
npx shadcn@latest add dialog
```

Setelah ter-install, import komponennya sesuai path hasil generate.

> **Catatan:** komponen shadcn/ui masuk ke source code proyek, bukan cuma paket luar. Jadi kamu bisa ubah langsung isinya sesuai kebutuhan aplikasi. Selalu cek dokumentasi resmi shadcn/ui untuk perintah install terbaru.

<h2 id="rating">Panduan Review & Rating Lengkap</h2>

Bagian ini menjelaskan cara mengembangkan `rating.component.jsx` menjadi fitur review lengkap: menampilkan **rata-rata rating + daftar review + form rating 1–5 + komentar**, yang terhubung ke API backend.

#### 1. Aturan main dari backend

Backend review sudah jadi di `backend/controllers/review.controller.js` dan route-nya didaftarkan di `backend/app.js` sebagai `/api/reviews`. Aturannya:

- `rating` harus angka bulat **1 sampai 5**. Selain itu ditolak (error 400).
- `comment` maksimal **1000 karakter**, boleh kosong / null.
- Hanya resep dengan status `accept` yang bisa direview.
- Satu user hanya bisa memberi **1 review per resep**. Kalau kirim lagi dapat error 409.
- Untuk menulis, mengubah, menghapus harus **login** (pakai token).
- Menghapus: hanya pemilik review atau admin.

Daftar endpoint (base: `/api/reviews`):

```text
GET   /api/reviews/recipe/:recipeId?page=1&limit=10
→ Daftar review satu resep (publik, ada pagination).
→ Balasan: { totalData, totalPage, currentPage, data: [...] }
→ Tiap item ada info reviewer: { id, username, profile }.

GET   /api/reviews/recipe/:recipeId/summary
→ Ringkasan satu resep (publik).
→ Balasan: { recipeId, totalReviews, averageRating }
→ Contoh: { recipeId: 12, totalReviews: 25, averageRating: 4.6 }
→ Kalau belum ada review: { totalReviews: 0, averageRating: 0 }.

GET   /api/reviews/me
→ Daftar review milik user yang login (butuh token).

POST  /api/reviews/recipe/:recipeId   (butuh token)
→ Body: { rating: 1-5, comment: "teks (opsional)" }
→ Sukses: 201 + data review yang dibuat.

PATCH /api/reviews/:id   (butuh token)
→ Body: { rating, comment } (boleh salah satu saja)
→ Hanya bisa ubah milik sendiri.

DELETE /api/reviews/:id   (butuh token)
→ Hanya pemilik atau admin.
```

#### 2. Buat service frontend

Jangan panggil axios langsung di dalam komponen. Buat file service dulu supaya rapi, mengikuti pola `src/services/recipes.services.js`.

Buat file `frontend/src/services/reviews.services.js`:

```javascript
import axiosInstance from "@/API/axiosinstance.api";

// Daftar review per resep (publik, pakai pagination)
export const getReviewsByRecipe = async (recipeId, { page = 1, limit = 10 } = {}) => {
  const res = await axiosInstance.get(`/reviews/recipe/${recipeId}`, {
    params: { page, limit },
  });
  return res?.data; // { totalData, totalPage, currentPage, data }
};

// Ringkasan: rata-rata + jumlah review (publik)
export const getReviewSummary = async (recipeId) => {
  const res = await axiosInstance.get(`/reviews/recipe/${recipeId}/summary`);
  return res?.data; // { recipeId, totalReviews, averageRating }
};

// Review milik sendiri (butuh login)
export const getMyReviews = async () => {
  const res = await axiosInstance.get("/reviews/me");
  return res?.data;
};

// Kirim review baru (butuh login)
// rating: 1-5, comment: string opsional (maks 1000 karakter)
export const createReview = async (recipeId, { rating, comment }) => {
  const res = await axiosInstance.post(`/reviews/recipe/${recipeId}`, {
    rating,
    comment,
  });
  return res?.data;
};

// Ubah review sendiri
export const updateReview = async (id, { rating, comment }) => {
  const res = await axiosInstance.patch(`/reviews/${id}`, {
    rating,
    comment,
  });
  return res?.data;
};

// Hapus review (pemilik atau admin)
export const deleteReview = async (id) => {
  const res = await axiosInstance.delete(`/reviews/${id}`);
  return res?.data;
};
```

> Catatan path: `axiosInstance` biasanya sudah punya `baseURL` yang berakhiran `/api`, jadi di service cukup tulis `/reviews/...` (tanpa `/api`). Kalau `baseURL`-mu belum termasuk `/api`, tambahkan `/api` di depan. Cek file `src/API/axiosinstance.api.js` dulu.

#### 3. Komponen tampilan bintang (read-only)

Ini pengganti isi lama `rating.component.jsx` untuk sekadar menampilkan nilai. Props-nya sederhana: `value` (angka 0–5).

```jsx
// frontend/src/components/rating.component.jsx
import { renderIcon } from "@/utils/icons.utils";

export default function Rating({ value = 0 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="w-full gap-2 flex items-center">
      <div className="flex items-center gap-1">
        {stars.map((s) => (
          <span key={s} className={s <= Math.round(value) ? "text-yellow-500" : "text-gray-300"}>
            {renderIcon("Star", { className: "w-4 h-4" })}
          </span>
        ))}
      </div>
      <span>{Number(value).toFixed(1)}</span>
    </div>
  );
}
```

Pakainya:

```jsx
import Rating from "@/components/rating.component";

<Rating value={4.6} />
```

#### 4. Komponen input bintang (bisa diklik, untuk form)

Untuk form, butuh bintang yang bisa diklik 1–5:

```jsx
import { useState } from "react";
import { renderIcon } from "@/utils/icons.utils";

export function RatingInput({ value = 0, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange?.(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          aria-label={`Beri rating ${s}`}
        >
          <span className={(hover || value) >= s ? "text-yellow-500" : "text-gray-300"}>
            {renderIcon("Star", { className: "w-6 h-6" })}
          </span>
        </button>
      ))}
    </div>
  );
}
```

#### 5. Contoh komponen lengkap: ringkasan + daftar + form

Buat file baru, misalnya `frontend/src/components/review-section.component.jsx`. Komponen ini melakukan 3 hal sekaligus:

```jsx
import { useEffect, useState } from "react";
import Rating from "@/components/rating.component";
import { RatingInput } from "@/components/rating-input.component";
import {
  getReviewsByRecipe,
  getReviewSummary,
  createReview,
} from "@/services/reviews.services";

export default function ReviewSection({ recipeId }) {
  const [summary, setSummary] = useState({ averageRating: 0, totalReviews: 0 });
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = async (pageNum = 1) => {
    const [sumRes, listRes] = await Promise.all([
      getReviewSummary(recipeId),
      getReviewsByRecipe(recipeId, { page: pageNum, limit: 10 }),
    ]);
    // Sesuaikan dengan bentuk respons API-mu (res.data.data atau res.data)
    const sum = sumRes?.data ?? sumRes;
    const list = listRes?.data ?? listRes;
    setSummary({ averageRating: sum.averageRating ?? 0, totalReviews: sum.totalReviews ?? 0 });
    setReviews(list.data ?? []);
    setTotalPage(list.totalPage ?? 1);
    setPage(list.currentPage ?? pageNum);
  };

  useEffect(() => {
    loadData(1);
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) return alert("Rating harus 1 sampai 5");
    if (comment.length > 1000) return alert("Komentar maksimal 1000 karakter");
    setLoading(true);
    try {
      await createReview(recipeId, { rating, comment: comment.trim() || null });
      setComment("");
      await loadData(1); // refresh daftar + rata-rata
    } catch (err) {
      // 409 = user sudah pernah review → arahkan ke edit
      alert(err?.response?.data?.message || "Gagal mengirim review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Ringkasan */}
      <div>
        <h3 className="font-semibold">Rating Resep</h3>
        <Rating value={summary.averageRating} />
        <p>{summary.averageRating} dari 5 ({summary.totalReviews} ulasan)</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <RatingInput value={rating} onChange={setRating} />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tulis komentar (opsional, maks 1000 karakter)"
          maxLength={1000}
          className="w-full border rounded p-2"
        />
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Mengirim..." : "Kirim Review"}
        </button>
      </form>

      {/* Daftar review */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="border rounded p-3">
            <p className="font-medium">{r.reviewer?.username ?? "User"}</p>
            <Rating value={r.rating} />
            {r.comment && <p>{r.comment}</p>}
          </div>
        ))}
        {reviews.length === 0 && <p>Belum ada ulasan. Jadilah yang pertama!</p>}
      </div>

      {/* Pagination sederhana */}
      <div className="flex gap-2">
        <button disabled={page <= 1} onClick={() => loadData(page - 1)}>Sebelum</button>
        <span>Halaman {page} / {totalPage}</span>
        <button disabled={page >= totalPage} onClick={() => loadData(page + 1)}>Sesudah</button>
      </div>
    </div>
  );
}
```

Pakai di halaman detail resep:

```jsx
import ReviewSection from "@/components/review-section.component";

function DetailResep({ recipe }) {
  return (
    <div>
      <h1>{recipe.title}</h1>
      {/* ... info resep ... */}
      <ReviewSection recipeId={recipe.id} />
    </div>
  );
}
```

#### 6. Hal yang perlu diingat untuk review

- Form hanya tampilkan untuk user yang sudah login. Kalau belum login, tampilkan tombol "Login untuk memberi ulasan".
- Satu user satu review: kalau API balas 409 ("You have already reviewed"), tampilkan tombol edit (panggil `updateReview`) bukan form baru.
- Validasi di frontend juga: rating wajib 1–5, komentar maks 1000 karakter — sama seperti backend.
- Setelah kirim / ubah / hapus, panggil ulang `getReviewSummary` + `getReviewsByRecipe` supaya rata-rata dan daftar langsung update.
- Untuk teks yang tampil (contoh: "Kirim Review", "Belum ada ulasan"), sebaiknya pakai translation key i18n supaya mendukung Bahasa Indonesia & Inggris. Lihat `Language.md`.

<h2 id="workflow">Alur Kustomisasi Komponen</h2>

Kalau mau mengubah komponen yang sudah ada, ikuti alur ini:

```text
1. Tentukan komponennya
        │
        ▼
2. Buka file .jsx-nya
        │
        ▼
3. Lihat props dan fungsinya
        │
        ▼
4. Ubah komponennya
        │
        ▼
5. Cek di mana saja komponen itu dipakai
        │
        ▼
6. Jalankan dan test frontend
```

Sebelum mengubah komponen reusable, cek dulu di mana dia dipakai.

Contohnya `navbar.component.jsx`, `modal.component.jsx`, atau `card.component.jsx` mungkin dipakai di banyak halaman. Mengubahnya bisa berdampak ke banyak tempat.

<h2 id="styles">Mengubah Gaya Komponen</h2>

Tampilan komponen bisa diatur dari komponen itu sendiri, file CSS, atau sistem styling yang sudah ada.

Sebelum bikin style baru, cek dulu struktur styling di:

```text
frontend/
└── src/
    └── css/
```

Kalau bisa, pakai ulang class, variabel, dan kebiasaan styling yang sudah ada supaya tampilan tetap konsisten.

<h2 id="add">Menambah Komponen Baru</h2>

Kalau komponen yang ada tidak cocok, lebih baik buat komponen baru daripada memaksakan mengubah komponen yang tidak berhubungan.

Contoh:

```text
components/
├── card.component.jsx
├── modal.component.jsx
├── rating.component.jsx
└── custom/
    └── product-card.component.jsx
```

Nama komponen baru harus jelas dan sesuai fungsinya.

<h2 id="reusing">Memakai Ulang Komponen</h2>

Salah satu kelebihan struktur ini: komponen reusable bisa dipakai di banyak halaman.

Contoh:

```jsx
import Card from "../components/card.component";
```

Path import dan nama komponen persisnya tergantung isi komponennya.

Sebelum bikin elemen UI baru, cek dulu `src/components/` — siapa tahu yang kamu butuhkan sudah ada.

<h2 id="modifying">Cara Aman Mengubah Komponen Lama</h2>

Saat mengubah komponen reusable:

1. Cek di mana komponen itu di-import.
2. Cek props apa saja yang dikirim ke dia.
3. Cek apakah dipakai di banyak halaman.
4. Jangan hapus props lama tanpa cek pemakaiannya.
5. Test semua halaman yang terdampak setelah mengubah.
6. Usahakan komponen tetap reusable (umum), jangan dibikin terlalu khusus.

Contoh: mengubah `filter.component.jsx` bisa berdampak ke semua halaman yang pakai filter.

<h2 id="creating">Membuat Komponen Khusus Fitur</h2>

Kalau komponen hanya dipakai satu fitur, simpan di folder fitur tersebut.

Contoh:

```text
components/
└── profile/
    ├── LanguageSection.jsx
    ├── ProfileSection.jsx
    ├── SecuritySection.jsx
    ├── ThemeSection.jsx
    └── NotificationSection.jsx
```

Dengan begitu folder utama tidak penuh dan tetap rapi.

<h2 id="recommended">Cara Kustomisasi yang Disarankan</h2>

Ikuti patokan ini saat kustomisasi:

- **Komponen reusable yang sudah ada** → Ubah kalau perubahannya harus berlaku global.
- **Komponen khusus fitur** → Ubah di dalam folder fiturnya.
- **Komponen shadcn/ui** → Cek `src/components/ui/` dulu sebelum bikin komponen UI baru.
- **Elemen UI reusable baru** → Taruh di lokasi komponen reusable.
- **Elemen UI khusus fitur baru** → Taruh di folder fitur terkait.
- **Perubahan tampilan saja** → Utamakan ubah CSS / konfigurasi style.
- **Perubahan API / data** → Cek service dan hooks terkait, jangan taruh logika API langsung di komponen.

<h2 id="important">Hal Penting</h2>

Jangan taruh logika API atau bisnis yang rumit langsung di komponen UI reusable.

Proyek ini memisahkan tugas antara komponen, service, hook, dan konfigurasi API.

Arsitekturnya sederhana seperti ini:

```text
Component
    │
    ▼
Hook
    │
    ▼
Service
    │
    ▼
API / Axios
    │
    ▼
Backend
```

Pemisahan ini bikin aplikasi gampang diubah dan dirawat.

Saat menambah atau mengubah komponen, ikuti kebiasaan penamaan dan struktur folder yang sudah ada.

Struktur komponen bisa bertambah atau berubah di rilis berikutnya seiring fitur baru.

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

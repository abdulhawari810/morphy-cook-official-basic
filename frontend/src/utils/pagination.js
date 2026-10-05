/**
 * Logika jendela nomor halaman.
 *
 * Dipisah dari komponen supaya bisa diuji tanpa React.
 *
 * Aturan:
 * - Total nomor yang terlihat tidak pernah melebihi `maxVisible`
 * - Halaman pertama dan terakhir selalu tampil (bila total > maxVisible)
 * - Sisa slot dipakai jendela yang bergeser mengikuti halaman aktif
 * - Jarak yang terpotong ditandai elipsis
 *
 * @param {number} currentPage  halaman aktif (1-based)
 * @param {number} totalPage  jumlah halaman
 * @param {number} maxVisible  batas nomor yang tampil (default 5)
 * @returns {(number | "ellipsis")[]}
 */
export const buildPageItems = (currentPage, totalPage, maxVisible = 5) => {
  const total = Math.trunc(Number(totalPage));

  if (!Number.isFinite(total) || total < 1) return [];

  const page = clampPage(currentPage, total);
  const visible = Math.max(3, Math.trunc(maxVisible) || 5);

  //_ seluruh nomor muat: tidak perlu elipsis
  if (total <= visible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  //_ halaman pertama & terakhir memakan 2 slot
  const slots = visible - 2;

  //_ jendela di sekitar halaman aktif, dibatasi agar tidak menabrak
  //_ halaman pertama/terakhir supaya tidak ada nomor duplikat
  const first = page - Math.floor((slots - 1) / 2);

  const windowStart = Math.min(
    Math.max(first, 2),
    Math.max(total - 1 - (slots - 1), 2),
  );

  const windowEnd = Math.min(windowStart + slots - 1, total - 1);

  const items = [1];

  if (windowStart > 2) items.push("ellipsis");

  for (let i = windowStart; i <= windowEnd; i++) {
    items.push(i);
  }

  if (windowEnd < total - 1) items.push("ellipsis");

  items.push(total);

  return items;
};

/** Nomor halaman yang benar-benar dirender (elipsis tidak dihitung). */
export const countVisible = (items) =>
  items.filter((item) => typeof item === "number").length;

export const clampPage = (page, totalPage) => {
  const total = Math.trunc(Number(totalPage));

  if (!Number.isFinite(page) || !Number.isFinite(total)) return 1;

  return Math.min(Math.max(Math.trunc(page), 1), Math.max(total, 1));
};
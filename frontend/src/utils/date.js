/**
 * Format tanggal dalam format yang dipakai `<input type="date">`
 * (YYYY-MM-DD), yaitu nilai yang dipegang form.
 *
 * Sengaja pakai tanggal lokal, bukan `toISOString()`, supaya tidak
 * bergeser satu hari kalau user berada di zona waktu negatif
 * (mis. UTC-7: `new Date(2020, 0, 1)` → "2019-12-31").
 */
export const toDateInputValue = (date) => {
  if (!date) return "";

  const d = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(d.getTime())) return "";

  const pad = (n) => String(n).padStart(2, "0");

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

/** Ubah nilai form `YYYY-MM-DD` menjadi `Date` di tengah malam lokal. */
export const fromDateInputValue = (value) => {
  if (!value) return undefined;

  const [year, month, day] = String(value).split("-").map(Number);

  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day);
};

/** Tanggal hari ini, dinormalisasi ke tengah malam. */
export const today = () => {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};
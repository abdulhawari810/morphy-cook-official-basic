// ─────────────────────────────────────────────────────────────
// Pesan error zod → teks siap tampil.
//
// `zodResolver` menaruh hasil validasi di `error.issues`. Setiap issue
// membawa `code` (kode zod) dan `message` (string yang kita tulis di
// schema). Keduanya dipetakan ke satu kunci i18n supaya pesan validasi
// tetap bilingual tanpa menyalin string ke dalam tiap schema.
//
// Contoh: `z.string().trim().min(1, "required")` menghasilkan
//   { code: "too_small", message: "required" }
// `code`-nya adalah "too_small", tapi kita mau menampilkan
// "Wajib diisi" — bukan "Minimal 1 karakter". Karena itu `message`
// eksplisit di schema lebih diprioritaskan daripada `code`.
// ─────────────────────────────────────────────────────────────

/** Dipakai kalau locale belum punya kunci untuk pesan tsb. */
const FALLBACK = {
  required: "Wajib diisi",
  invalid_type: "Tipe data tidak sesuai",
  too_small: "Nilai terlalu pendek",
  too_big: "Nilai terlalu besar",
  invalid_format: "Format tidak valid",
  not_multiple_of: "Nilai tidak sesuai",
  invalid_value: "Nilai tidak valid",
};

/** Pemetaan dari kode zod. */
const CODE_TO_KEY = {
  invalid_type: "validation.invalid_type",
  too_small: "validation.too_small",
  too_big: "validation.too_big",
  invalid_format: "validation.invalid_format",
  not_multiple_of: "validation.not_multiple_of",
  invalid_value: "validation.invalid_value",
  invalid_union: "validation.invalid_type",
  custom: "validation.invalid_value",
  required: "validation.required",
};

/** Pemetaan dari `message` yang ditulis eksplisit di `schemas.js`. */
const MESSAGE_TO_KEY = {
  required: "validation.required",
  invalid_format: "validation.invalid_format",
  mismatch: "validation.mismatch",
  same_as_old: "validation.same_as_old",
  future_date: "validation.future_date",
};

/** Batas angka dari issue (`minimum` / `maximum`), mis. `3` pada min(3). */
const readBound = (issue) => {
  const bound = issue.minimum ?? issue.maximum ?? issue.exclusiveMinimum;

  return typeof bound === "number" ? bound : null;
};

/** Nama field tujuan, mis. `confPassword` pada path `["confPassword"]`. */
const readField = (issue) => {
  const last = issue?.path?.[issue.path.length - 1];

  return typeof last === "string" ? last : "";
};

/**
 * Terjemahkan issue zod pertama menjadi string siap tampil.
 *
 * @param {Array} issues  `errors[name].issues` dari react-hook-form
 * @param {(key: string, opts?: object) => string} t  fungsi i18next
 * @param {{ label?: string }} opts  label manual untuk pesan mismatch
 * @returns {string | null}
 */
export const translateIssues = (issues, t, opts = {}) => {
  const issue = issues?.[0];

  if (!issue) return null;

  const key =
    MESSAGE_TO_KEY[issue.message] ??
    CODE_TO_KEY[issue.code] ??
    "validation.invalid_value";

  const bound = readBound(issue);

  //_ `too_big` memakai batas atas, sisanya batas bawah
  const isUpperBound = issue.code === "too_big" || bound === issue.maximum;

  const message = t(key, {
    field: opts.label ?? readField(issue),
    min: bound ?? "",
    max: isUpperBound ? bound : "",
    size: bound ?? "",
  });

  //_ i18next mengembalikan string kunci apa adanya kalau belum terdaftar
  if (!message || message === key || message.startsWith("validation.")) {
    return FALLBACK[issue.code] ?? FALLBACK.invalid_value;
  }

  return message;
};

export { FALLBACK as VALIDATION_FALLBACK };
import { emailRegex, passwordRegex } from "../utils/regexp.utils.js";
import { error } from "../utils/response.utils.js";

const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

// POST /api/auth/register
export const validateRegister = (req, res, next) => {
  const { email, password, confPassword, username } = req.body || {};

  if (!isNonEmptyString(email) || !isNonEmptyString(password) || !isNonEmptyString(confPassword) || !isNonEmptyString(username)) {
    return error(res, 400, "Email, password, konfirmasi password, dan username wajib diisi.");
  }
  if (!emailRegex.test(email)) {
    return error(res, 400, "Format email tidak valid.");
  }
  if (password !== confPassword) {
    return error(res, 400, "Password dan konfirmasi tidak sama.");
  }
  if (!passwordRegex.test(password)) {
    return error(res, 400, "Password minimal 8 karakter, ada huruf besar, angka, dan simbol.");
  }
  if (username.trim().length < 3) {
    return error(res, 400, "Username minimal 3 karakter.");
  }
  next();
};

// POST /api/auth/login
export const validateLogin = (req, res, next) => {
  const { UsersOrEmail, password } = req.body || {};
  if (!isNonEmptyString(UsersOrEmail)) {
    return error(res, 400, "Email atau username wajib diisi.");
  }
  if (!isNonEmptyString(password)) {
    return error(res, 400, "Password wajib diisi.");
  }
  next();
};

// POST /api/reviews/recipe/:recipeId
export const validateReviewCreate = (req, res, next) => {
  const rating = Number(req.body?.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return error(res, 400, "Rating harus angka 1 sampai 5.");
  }
  const { comment } = req.body || {};
  if (comment !== undefined && comment !== null) {
    if (typeof comment !== "string") {
      return error(res, 400, "Komentar tidak valid.");
    }
    if (comment.trim().length > 1000) {
      return error(res, 400, "Komentar maksimal 1000 karakter.");
    }
  }
  next();
};

// PATCH /api/reviews/:id
export const validateReviewUpdate = (req, res, next) => {
  const { rating, comment } = req.body || {};
  if (rating === undefined && comment === undefined) {
    return error(res, 400, "Tidak ada field yang diupdate.");
  }
  if (rating !== undefined) {
    const r = Number(rating);
    if (!Number.isInteger(r) || r < 1 || r > 5) {
      return error(res, 400, "Rating harus angka 1 sampai 5.");
    }
  }
  if (comment !== undefined && comment !== null) {
    if (typeof comment !== "string") {
      return error(res, 400, "Komentar tidak valid.");
    }
    if (comment.trim().length > 1000) {
      return error(res, 400, "Komentar maksimal 1000 karakter.");
    }
  }
  next();
};

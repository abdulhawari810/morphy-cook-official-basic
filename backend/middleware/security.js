import rateLimit from "express-rate-limit";

// Umum: cegah spam ke semua /api
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Terlalu banyak request, coba lagi nanti." },
});

// Ketat untuk auth (login/register/refresh): cegah brute-force
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Terlalu banyak percobaan auth, coba lagi nanti." },
});

// Paling ketat untuk OTP/2FA (6 digit mudah di-brute-force)
export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Terlalu banyak percobaan kode OTP, coba lagi nanti." },
});

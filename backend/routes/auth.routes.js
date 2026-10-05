import express from "express";
import {
  login,
  register,
  me,
  logout,
  updatePassword,
  refresh,
  verifyLogin2FA,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { authLimiter, otpLimiter } from "../middleware/security.js";
import { validateRegister, validateLogin } from "../middleware/validate.js";

const AuthRoute = express.Router();

// POST: Register user baru
AuthRoute.post("/register", authLimiter, validateRegister, register);

// POST: Login user
AuthRoute.post("/login", authLimiter, validateLogin, login);
AuthRoute.post("/verify/2fas", otpLimiter, verifyLogin2FA);

// POST: Get new AccessToken By Users login RefreshToken
AuthRoute.post("/refresh", refresh);

// PATCH: Update Password user
AuthRoute.post("/password/update", verifyToken, updatePassword);

// GET: Get user
AuthRoute.get("/me", verifyToken, me);

// DELETE: Logout user
AuthRoute.delete("/logout", verifyToken, logout);

export default AuthRoute;

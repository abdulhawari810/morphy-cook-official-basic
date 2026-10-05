import express from "express";
import {
  disableVerify2FA,
  setup2FA,
  verify2FA,
} from "../controllers/qrcode.controller.js";
import { verifyToken } from "../middleware/auth.js";

const QrCodeRoute = express.Router();

// GET: Get QrCode By User
QrCodeRoute.post("/setup", verifyToken, setup2FA);

// PATCH: update verify 2FAS By User
QrCodeRoute.patch("/verify", verifyToken, verify2FA);

// PATCH: update disable 2FAS By User
QrCodeRoute.patch("/disable", verifyToken, disableVerify2FA);

export default QrCodeRoute;

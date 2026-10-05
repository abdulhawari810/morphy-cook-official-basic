import express from "express";
import { uploadAvatarController } from "./../controllers/upload.controller.js";
import { uploadAvatar } from "./../middleware/upload.js";
import { verifyToken } from "./../middleware/auth.js";

const UploadRouter = express.Router();

UploadRouter.post(
  "/avatar",
  verifyToken,
  uploadAvatar.single("avatars"),
  uploadAvatarController,
);

export default UploadRouter;

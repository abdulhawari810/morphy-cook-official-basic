import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const ensureDIR = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = (folderName) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(
        process.cwd(),
        "storage/uploads",
        folderName,
      );
      ensureDIR(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const filename = `${Date.now()}-${crypto.randomUUID()}${ext}`;
      cb(null, filename);
    },
  });
};

const avatarFilter = (allowedMimeTypes, allowedExt) => {
  return (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const validMime = allowedMimeTypes.includes(file.mimetype);
    const validExt = allowedExt.includes(ext);

    if (!validExt || !validMime) {
      return cb(new Error("Format file tidak didukung"), false);
    }

    cb(null, true);
  };
};

export const uploadAvatar = multer({
  storage: storage("avatars"),
  fileFilter: avatarFilter(
    ["image/jpeg", "image/png", "image/webp"],
    [".jpg", ".jpeg", ".png", ".webp"],
  ),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

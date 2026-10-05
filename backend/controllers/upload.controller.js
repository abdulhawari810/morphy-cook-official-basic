import { success, error } from "../utils/response.utils.js";
import { UsersModels } from "../models/initialize.model.js";
import path from "path";
import fs from "fs/promises";

export const uploadAvatarController = async (req, res) => {
  try {
    const userID = req.user.id;

    if (!req.file) {
      return error(res, 400, "The avatar cannot be empty!");
    }

    const users = await UsersModels.findByPk(userID);

    if (!users) {
      return error(res, 404, "Users not found");
    }

    const oldAvatar = users.profile;

    const fileURL = `uploads/avatars/${req.file.filename}`;

    await users.update({
      profile: fileURL,
    });

    if (
      oldAvatar &&
      oldAvatar !== "default.png" &&
      oldAvatar.startsWith("uploads/avatars/")
    ) {
      const oldFilePath = path.join(process.cwd(), "storage/", oldAvatar);

      try {
        await fs.unlink(oldFilePath);
      } catch (err) {
        console.log("Failed to delete old avatar:", err.message);
      }
    }

    return success(res, 200, "Avatar upload successful.", {
      avatar: fileURL,
    });
  } catch (err) {
    return error(res, 500, err.message || "The server is experiencing issues.");
  }
};

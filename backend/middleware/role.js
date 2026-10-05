import jwt from "jsonwebtoken";
import UsersModels from "../models/users.model.js";
import { success, error } from "../utils/response.utils.js";

export const verifyUsersRestricted = async (req, res, next) => {
  const userId = req.user.id;
  const users = await UsersModels.findByPk(userId);
  if (users?.role !== "admin" && users?.role !== "chief") {
    return error(
      res,
      403,
      "Access denied. Admins and Chiefs only.",
      "You are not an admin or chief.",
    );
  }
  next();
};

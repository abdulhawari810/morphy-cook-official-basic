import express from "express";

import {
  createAllUsers,
  createUsers,
  deleteUsers,
  getUsers,
  getUsersById,
  updateUsers,
  updateStatusUsers,
  updateProfileUsers,
} from "../controllers/users.controllers.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.js";

const UsersRoute = express.Router();

UsersRoute.get("/", verifyToken, verifyAdmin, getUsers);
UsersRoute.get("/find/:id", verifyToken, verifyAdmin, getUsersById);
UsersRoute.patch("/update/:id", verifyToken, verifyAdmin, updateUsers);
UsersRoute.post("/create", verifyToken, verifyAdmin, createUsers);
UsersRoute.post("/create/all", verifyToken, verifyAdmin, createAllUsers);
UsersRoute.post(
  "/update/status/:id",
  verifyToken,
  verifyAdmin,
  updateStatusUsers,
);
UsersRoute.post("/profile/update", verifyToken, updateProfileUsers);
UsersRoute.patch("/delete", verifyToken, deleteUsers);

export default UsersRoute;

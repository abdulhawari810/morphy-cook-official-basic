import express from "express";
import {
  createCategories,
  deleteCategories,
  getAllCategories,
  createAllCategories,
} from "../controllers/categories.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const CategoriesRoute = express.Router();

// GET: Get all recipes
CategoriesRoute.get("/", getAllCategories);
CategoriesRoute.post("/create", verifyToken, verifyAdmin, createCategories);
CategoriesRoute.post(
  "/create/all",
  verifyToken,
  verifyAdmin,
  createAllCategories,
);
CategoriesRoute.delete(
  "/delete/:CategoryId",
  verifyToken,
  verifyAdmin,
  deleteCategories,
);

export default CategoriesRoute;

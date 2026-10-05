import express from "express";
import {
  getAllRecipes,
  createRecipes,
  updateRecipesById,
  deleteRecipesById,
  getRecipesById,
  getRecipesByAuthor,
  getRecipesByCategory,
  createMultipleRecipes,
  updateStatusRecipesById,
  getAllRecipesForAdmin,
  countAllRecipesStatus,
  countRecipesByAuthorStatus,
} from "../controllers/recipe.controller.js";
import { verifyToken, verifyChef, verifyAdmin } from "../middleware/auth.js";
import { verifyUsersRestricted } from "../middleware/role.js";

const RecipeRoute = express.Router();

// GET: Get all recipes
RecipeRoute.get("/", getAllRecipes);
RecipeRoute.get("/single/:id", getRecipesById);
RecipeRoute.get("/author", verifyToken, verifyChef, getRecipesByAuthor);
RecipeRoute.get("/category/:categoryId", getRecipesByCategory);
RecipeRoute.get(
  "/admin/recipes",
  verifyToken,
  verifyAdmin,
  getAllRecipesForAdmin,
);
RecipeRoute.get(
  "/count/recipes",
  verifyToken,
  verifyChef,
  countRecipesByAuthorStatus,
);
RecipeRoute.get(
  "/count/all/recipes",
  verifyToken,
  verifyAdmin,
  countAllRecipesStatus,
);
RecipeRoute.post("/create", verifyToken, verifyChef, createRecipes);
RecipeRoute.post(
  "/create/multiple",
  verifyToken,
  verifyUsersRestricted,
  createMultipleRecipes,
);
RecipeRoute.patch("/update/:id", verifyToken, verifyChef, updateRecipesById);
RecipeRoute.post(
  "/update/status/:id",
  verifyToken,
  verifyAdmin,
  updateStatusRecipesById,
);
RecipeRoute.delete("/delete/:id", verifyToken, verifyChef, deleteRecipesById);

export default RecipeRoute;

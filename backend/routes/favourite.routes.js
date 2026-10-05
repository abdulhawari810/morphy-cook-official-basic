import express from "express";
import {
  createFavourite,
  deleteFavourite,
  getAllFavourite,
} from "../controllers/favourite.controller.js";
import { verifyToken } from "../middleware/auth.js";

const FavouriteRoute = express.Router();

// GET: Get all recipes
FavouriteRoute.get("/", verifyToken, getAllFavourite);
FavouriteRoute.post("/create/:recipeId", verifyToken, createFavourite);
FavouriteRoute.delete("/delete/:recipeId", verifyToken, deleteFavourite);

export default FavouriteRoute;

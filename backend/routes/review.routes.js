import express from "express";
import {
  getReviewsByRecipe,
  getReviewSummaryByRecipe,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/auth.js";
import {
  validateReviewCreate,
  validateReviewUpdate,
} from "../middleware/validate.js";

const ReviewRoute = express.Router();

// Publik
ReviewRoute.get("/recipe/:recipeId", getReviewsByRecipe);
ReviewRoute.get("/recipe/:recipeId/summary", getReviewSummaryByRecipe);

// Auth
ReviewRoute.get("/me", verifyToken, getMyReviews);
ReviewRoute.post("/recipe/:recipeId", verifyToken, validateReviewCreate, createReview);
ReviewRoute.patch("/:id", verifyToken, validateReviewUpdate, updateReview);
ReviewRoute.delete("/:id", verifyToken, deleteReview);

export default ReviewRoute;

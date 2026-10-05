import {
  ReviewModels,
  RecipeModels,
  UsersModels,
} from "../models/initialize.model.js";
import { success, error } from "../utils/response.utils.js";

const parseRating = (value) => {
  const rating = Number(value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return null;
  }
  return rating;
};

// GET publik: list review per resep (hanya resep accept)
export const getReviewsByRecipe = async (req, res) => {
  try {
    const recipeId = parseInt(req.params.recipeId, 10);
    if (!Number.isInteger(recipeId)) {
      return error(res, 400, "Invalid recipe id");
    }
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    if (!Number.isInteger(page) || page < 1) page = 1;
    if (!Number.isInteger(limit) || limit < 1 || limit > 50) limit = 10;

    const recipe = await RecipeModels.findOne({
      where: { id: recipeId, status: "accept" },
      attributes: ["id"],
    });
    if (!recipe) {
      return error(res, 404, "Recipe not found");
    }

    const { count, rows } = await ReviewModels.findAndCountAll({
      where: { recipeId },
      limit,
      offset: (page - 1) * limit,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: UsersModels,
          as: "reviewer",
          attributes: ["id", "username", "profile"],
        },
      ],
    });

    return success(res, 200, "Get reviews successfully", {
      totalData: count,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

// GET publik: ringkasan rating per resep
export const getReviewSummaryByRecipe = async (req, res) => {
  try {
    const recipeId = parseInt(req.params.recipeId, 10);
    if (!Number.isInteger(recipeId)) {
      return error(res, 400, "Invalid recipe id");
    }

    const recipe = await RecipeModels.findOne({
      where: { id: recipeId, status: "accept" },
      attributes: ["id"],
    });
    if (!recipe) {
      return error(res, 404, "Recipe not found");
    }

    const count = await ReviewModels.count({ where: { recipeId } });
    const sum =
      (await ReviewModels.sum("rating", { where: { recipeId } })) || 0;

    return success(res, 200, "Get review summary successfully", {
      recipeId,
      totalReviews: count,
      averageRating: count === 0 ? 0 : Math.round((sum / count) * 10) / 10,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

// GET auth: review milik sendiri
export const getMyReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await ReviewModels.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: RecipeModels,
          as: "review_recipe",
          attributes: ["id", "title", "slug", "image"],
        },
      ],
    });

    return success(res, 200, "Get my reviews successfully", reviews);
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

// POST auth: buat review (1 per user per resep)
export const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipeId = parseInt(req.params.recipeId, 10);
    if (!Number.isInteger(recipeId)) {
      return error(res, 400, "Invalid recipe id");
    }

    const rating = parseRating(req.body.rating);
    if (rating === null) {
      return error(res, 400, "Rating must be an integer between 1 and 5");
    }

    const comment =
      typeof req.body.comment === "string"
        ? req.body.comment.trim()
        : null;
    if (comment !== null && comment.length > 1000) {
      return error(res, 400, "Comment must be at most 1000 characters");
    }

    const recipe = await RecipeModels.findOne({
      where: { id: recipeId, status: "accept" },
      attributes: ["id"],
    });
    if (!recipe) {
      return error(res, 404, "Recipe not found");
    }

    const existing = await ReviewModels.findOne({
      where: { userId, recipeId },
    });
    if (existing) {
      return error(res, 409, "You have already reviewed this recipe");
    }

    const review = await ReviewModels.create({
      userId,
      recipeId,
      rating,
      comment: comment === "" ? null : comment,
    });

    return success(res, 201, "Review created successfully", review);
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

// PATCH auth: update milik sendiri
export const updateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) {
      return error(res, 400, "Invalid review id");
    }

    const review = await ReviewModels.findOne({ where: { id, userId } });
    if (!review) {
      return error(res, 404, "Review not found");
    }

    const updates = {};
    if (req.body.rating !== undefined) {
      const rating = parseRating(req.body.rating);
      if (rating === null) {
        return error(res, 400, "Rating must be an integer between 1 and 5");
      }
      updates.rating = rating;
    }
    if (req.body.comment !== undefined) {
      if (req.body.comment === null) {
        updates.comment = null;
      } else if (typeof req.body.comment === "string") {
        const comment = req.body.comment.trim();
        if (comment.length > 1000) {
          return error(res, 400, "Comment must be at most 1000 characters");
        }
        updates.comment = comment === "" ? null : comment;
      } else {
        return error(res, 400, "Invalid comment");
      }
    }

    if (Object.keys(updates).length === 0) {
      return error(res, 400, "No fields to update");
    }

    await review.update(updates);

    return success(res, 200, "Review updated successfully", review);
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

// DELETE auth: hapus milik sendiri (admin boleh hapus milik siapa saja)
export const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) {
      return error(res, 400, "Invalid review id");
    }

    const review = await ReviewModels.findOne({ where: { id } });
    if (!review) {
      return error(res, 404, "Review not found");
    }

    const isOwner = review.userId === userId;
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return error(res, 403, "You are not allowed to delete this review");
    }

    await review.destroy();

    return success(res, 200, "Review deleted successfully");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

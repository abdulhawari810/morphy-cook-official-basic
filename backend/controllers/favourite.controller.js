import {
  FavouriteModels,
  RecipeModels,
  UsersModels,
} from "../models/initialize.model.js";
import { success, error } from "../utils/response.utils.js";

export const getAllFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const favourite = await FavouriteModels.findAll({
      where: {
        userId,
      },
      include: {
        model: RecipeModels,
        as: "favourite_recipe",
      },
    });

    if (!favourite) {
      return error(res, 404, "Your Favourite Recipe not found!");
    }

    return success(res, 200, "Get Favourite Recipe SuccessFully", favourite);
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

export const createFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;
    const users = await UsersModels.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    const existingFavourite = await FavouriteModels.findOne({
      where: {
        userId,
        recipeId,
      },
    });

    const existingRecipes = await RecipeModels.findOne({
      where: {
        id: recipeId,
      },
    });

    if (!existingRecipes) {
      return error(res, 404, "Recipes not found");
    }

    if (!users) {
      return error(res, 404, "Users Not Found");
    }

    if (existingFavourite) {
      return error(res, 400, "Recipe already exists");
    }

    await FavouriteModels.create({
      userId,
      recipeId,
    });

    return success(res, 201, "Recipe in favourite successfully");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

export const deleteFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;

    const existingfavourite = await FavouriteModels.findOne({
      where: {
        userId,
        recipeId,
      },
    });

    const existingRecipes = await RecipeModels.findOne({
      where: {
        id: recipeId,
      },
    });

    if (!existingfavourite) {
      return error(res, 404, "Favourite not found");
    }
    if (!existingRecipes) {
      return error(res, 404, "Recipe not found");
    }

    await FavouriteModels.destroy({
      where: {
        userId,
        recipeId,
      },
    });

    return success(res, 200, "Recipe has been delete successfully");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

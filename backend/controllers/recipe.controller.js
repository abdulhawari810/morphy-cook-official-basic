import {
  RecipeModels,
  UsersModels,
  CategoriesModels,
  FavouriteModels,
} from "../models/initialize.model.js";
import { success, error } from "../utils/response.utils.js";
import slugify from "slugify";
import { Op } from "sequelize";

export const getAllRecipes = async (req, res) => {
  try {
    const { search, category, difficulty, time } = req.query;
    let { page = 1, limit = 12 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const whereClause = {
      status: "accept",
    };

    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` };
    }

    if (category) {
      whereClause.categoryId = parseInt(category);
    }

    if (difficulty) {
      whereClause.difficulty = { [Op.like]: `%${difficulty}%` };
    }

    if (time) {
      whereClause.time = { [Op.like]: `%${time}%` };
    }

    const { count, rows } = await RecipeModels.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: UsersModels,
          as: "recipe",
          attributes: ["id", "username", "profile"],
          required: false,
        },
        {
          model: CategoriesModels,
          as: "category",
          attributes: ["name"],
          required: false,
        },
      ],
    });

    if (search && rows?.length !== 0) {
      return success(res, 200, `${rows?.length} Data Found`, {
        totalData: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        data: rows,
      });
    } else if (search) {
      return success(res, 200, `Search ${search} not found`, {
        totalData: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        data: rows,
      });
    }

    return success(res, 200, "Get all recipes successfully", {
      totalData: count,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const getAllRecipesForAdmin = async (req, res) => {
  try {
    const { search, category, difficulty, time, status } = req.query;
    let { page = 1, limit = 12 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const whereClause = {};

    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` };
    }

    if (category) {
      whereClause.categoryId = parseInt(category);
    }

    if (status) {
      whereClause.status = status;
    }

    if (difficulty) {
      whereClause.difficulty = { [Op.like]: `%${difficulty}%` };
    }

    if (time) {
      whereClause.time = { [Op.like]: `%${time}%` };
    }

    const { count, rows } = await RecipeModels.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: UsersModels,
          as: "recipe",
          attributes: ["id", "username", "profile"],
        },
        {
          model: CategoriesModels,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    if (search && rows?.length !== 0) {
      return success(res, 200, `${rows?.length} Data Found`, {
        totalData: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        data: rows,
      });
    } else if (search) {
      return success(res, 200, `Search ${search} not found`, {
        totalData: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        data: rows,
      });
    }

    return success(res, 200, "Get all recipes successfully", {
      totalData: count,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const getRecipesByAuthor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { search, category, time, difficulty, status } = req.query;
    let { page = 1, limit = 50 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const whereClause = { userId };

    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` };
    }

    if (category) {
      whereClause.categoryId = parseInt(category);
    }

    if (difficulty) {
      whereClause.difficulty = { [Op.like]: `%${difficulty}%` };
    }

    if (time) {
      whereClause.time = { [Op.like]: `%${time}%` };
    }
    if (status) {
      whereClause.status = status;
    }

    const { count, rows } = await RecipeModels.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: UsersModels,
          as: "recipes_authors",
          attributes: ["id", "username", "profile"],
        },
        {
          model: CategoriesModels,
          as: "category",
          raw: true,
          attributes: ["name"],
        },
      ],
      limit,
      offset: (page - 1) * limit,
      order: [["createdAt", "DESC"]],
    });

    if (search && rows?.length !== 0) {
      return success(res, 200, `${rows?.length} Data Found`, {
        totalData: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        data: rows,
      });
    } else if (search) {
      return success(res, 200, `Search ${search} not found`, {
        totalData: count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        data: rows,
      });
    }

    return success(res, 200, "Get recipes by author successfully", {
      totalData: count,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const getRecipesById = async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await RecipeModels.findOne({
      where: {
        id,
        status: "accept",
      },
      include: [
        {
          model: CategoriesModels,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    if (!recipe) {
      return error(res, 404, "Recipe not found");
    }

    return success(res, 200, "Get recipe by ID successfully", recipe);
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const getRecipesByCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId || req.params.category, 10);
    if (!Number.isInteger(categoryId)) {
      return error(res, 400, "Invalid category id");
    }
    let { page = 1, limit = 50 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const { count, rows } = await RecipeModels.findAndCountAll({
      where: {
        categoryId,
        status: "accept",
      },
      limit,
      offset: (page - 1) * limit,
      order: [["createdAt", "DESC"]],
    });
    return success(res, 200, "Get recipes by category successfully", {
      totalData: count,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const countRecipesByAuthorStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const pendingCount = await RecipeModels.count({
      where: {
        userId,
        status: "pending",
      },
    });
    const draftCount = await RecipeModels.count({
      where: {
        userId,
        status: "draft",
      },
    });
    const acceptCount = await RecipeModels.count({
      where: {
        userId,
        status: "accept",
      },
    });
    const rejectCount = await RecipeModels.count({
      where: {
        userId,
        status: "reject",
      },
    });
    return success(res, 200, "Count recipes by author status successfully", {
      pending: pendingCount,
      draft: draftCount,
      accept: acceptCount,
      reject: rejectCount,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const countAllRecipesStatus = async (req, res) => {
  try {
    const pendingCount = await RecipeModels.count({
      where: {
        status: "pending",
      },
    });
    const draftCount = await RecipeModels.count({
      where: {
        status: "draft",
      },
    });
    const acceptCount = await RecipeModels.count({
      where: {
        status: "accept",
      },
    });
    const rejectCount = await RecipeModels.count({
      where: {
        status: "reject",
      },
    });
    return success(res, 200, "Count all recipes status successfully", {
      pending: pendingCount,
      draft: draftCount,
      accept: acceptCount,
      reject: rejectCount,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const createRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    const existinguser = await UsersModels.findOne({
      where: {
        id: userId,
      },
    });
    const existingRecipe = await RecipeModels.findOne({
      where: {
        title: req.body.title,
        userId,
      },
    });

    let uncategorized = await CategoriesModels.findOne({
      where: { name: "Uncategorized" },
      attributes: ["id"],
      raw: true,
    });

    if (!uncategorized) {
      uncategorized = await CategoriesModels.create({
        name: "Uncategorized",
        slug: "Uncategorized",
      });
    }

    if (!existinguser) {
      return error(res, 404, "User not found");
    }
    if (existingRecipe) {
      return error(res, 400, "A recipe with this title already exists");
    }
    const {
      title,
      description,
      image,
      difficulty,
      time,
      categoryId,
      ingredients,
      instructions,
    } = req.body;

    const slug = slugify(title, { lower: true });

    const newRecipe = await RecipeModels.create({
      title,
      slug,
      description,
      difficulty,
      time: parseInt(time) || 0,
      author: existinguser?.username,
      image,
      userId,
      categoryId: Number(categoryId) || uncategorized.id,
      ingredients: JSON.stringify(ingredients),
      instructions: JSON.stringify(instructions),
    });

    console.log(slug);

    return success(res, 201, "Create recipe successfully");
  } catch (errors) {
    error(res, 500, errors);
  }
};
export const createMultipleRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    const existinguser = await UsersModels.findOne({
      where: {
        id: userId,
      },
    });

    if (!existinguser) {
      return error(res, 404, "User not found");
    }

    let uncategorized = await CategoriesModels.findOne({
      where: { name: "Uncategorized" },
      attributes: ["id"],
      raw: true,
    });

    if (!uncategorized) {
      uncategorized = await CategoriesModels.create({
        slug: "uncategorized",
        name: "Uncategorized",
      });
    }

    const recipes = req.body;

    if (!Array.isArray(recipes) || recipes.length === 0) {
      return error(res, 400, "Recipes must be a non-empty array");
    }

    const createdRecipes = [];
    const errors_list = [];

    for (let i = 0; i < recipes.length; i++) {
      try {
        const existingRecipe = await RecipeModels.findOne({
          where: {
            title: recipes[i].title,
            userId,
          },
        });

        if (existingRecipe) {
          errors_list.push({
            index: i,
            title: recipes[i].title,
            message: "Recipe already exists",
          });
          continue;
        }

        const {
          title,
          description,
          image,
          categoryId,
          difficulty,
          time,
          ingredients,
          instructions,
          status,
        } = recipes[i];
        const slug = slugify(title, { lower: true });

        const newRecipe = await RecipeModels.create({
          title,
          slug,
          description,
          difficulty,
          time,
          author: existinguser.username,
          image,
          userId,
          status,
          categoryId: Number(categoryId) || Number(uncategorized.id),
          ingredients: JSON.stringify(ingredients),
          instructions: JSON.stringify(instructions),
        });

        createdRecipes.push(newRecipe);
      } catch (err) {
        errors_list.push({
          index: i,
          title: recipes[i].title,
          message: err.message,
        });
      }
    }

    return success(res, 201, "Recipes created successfully", {
      created: createdRecipes.length,
      failed: errors_list.length,
      data: createdRecipes,
      errors: errors_list,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const updateRecipesById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user.id;
    const existingRecipe = await RecipeModels.findOne({
      where: {
        id: recipeId,
        userId,
      },
    });
    const existinguser = await UsersModels.findOne({
      where: {
        id: userId,
      },
    });
    if (!existinguser) {
      return error(res, 404, "User not found");
    }
    if (!existingRecipe) {
      return error(res, 404, "Recipe not found");
    }
    const {
      title,
      description,
      image,
      categoryId,
      difficulty,
      time,
      ingredients,
      instructions,
    } = req.body;
    const slug = slugify(title, { lower: true });
    await existingRecipe.update({
      title,
      slug,
      description,
      difficulty,
      time,
      image,
      author: existinguser?.username,
      categoryId: Number(categoryId) || existingRecipe.categoryId,
      ingredients: JSON.stringify(ingredients),
      instructions: JSON.stringify(instructions),
    });
    return success(res, 200, "Recipe updated successfully");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const updateStatusRecipesById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { status } = req.body;

    const existingRecipe = await RecipeModels.findOne({
      where: {
        id: recipeId,
      },
    });
    if (!existingRecipe) {
      return error(res, 404, "Recipe not found");
    }
    await existingRecipe.update(
      {
        status,
      },
      {
        where: {
          id: recipeId,
        },
      },
    );
    return success(res, 200, "Recipe status updated successfully");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const deleteRecipesById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user.id;
    const existingRecipe = await RecipeModels.findOne({
      where: {
        id: recipeId,
        userId,
      },
    });
    if (!existingRecipe) {
      return error(res, 404, "Recipe not found");
    }
    await existingRecipe.destroy();
    return success(res, 200, "Recipe deleted successfully");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

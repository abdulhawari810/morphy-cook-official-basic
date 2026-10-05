import { RecipeModels, CategoriesModels } from "../models/initialize.model.js";
import { success, error } from "../utils/response.utils.js";
import slugify from "slugify";

export const getAllCategories = async (req, res) => {
  try {
    const category = await CategoriesModels.findAll();

    if (category.length === 0) return success(res, 200, "No Categories Yet");

    return success(res, 200, "Get category successfully", category);
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const createCategories = async (req, res) => {
  try {
    const { name, desc } = req.body;

    let uncategorized = await CategoriesModels.findOne({
      where: { name: "Uncategorized" },
    });

    if (!uncategorized) {
      uncategorized = await CategoriesModels.create({
        name: "Uncategorized",
        slug: "uncategorized",
      });
    }

    const existingCategory = await CategoriesModels.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return error(res, 400, `Category ${name} has been exists`);
    }
    const slug = slugify(name, { lower: true });

    await CategoriesModels.create({ slug, name, desc });

    return success(res, 201, "create category successfully");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const createAllCategories = async (req, res) => {
  try {
    const data = req.body;

    const createdCategory = [];
    const error_list = [];

    let uncategorized = await CategoriesModels.findOne({
      where: { name: "Uncategorized" },
    });

    if (!uncategorized) {
      uncategorized = await CategoriesModels.create({
        name: "Uncategorized",
        slug: "uncategorized",
      });
    }

    if (!Array.isArray(data) || data?.length === 0) {
      return error(res, 400, "Data must be non-empty array");
    }

    for (let i = 0; i < data?.length; i++) {
      try {
        const existingCategory = await CategoriesModels.findOne({
          where: {
            name: data[i].name,
          },
        });

        if (existingCategory) {
          error_list.push({
            index: i,
            name: data[i].name,
            message: "Categories has been exists",
          });
          continue;
        }

        const name = data[i].name;
        const desc = data[i].desc;
        const slug = slugify(name, { lower: true });

        const newCategory = await CategoriesModels.create({ slug, name, desc });

        createdCategory.push(newCategory);
      } catch (err) {
        error_list.push({
          index: i,
          name: data[i].name,
          message: err.message,
        });
      }
    }

    return success(res, 201, "Recipes created successfully", {
      created: createdCategory.length,
      failed: error_list.length,
      data: createdCategory,
      errors: error_list,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const deleteCategories = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const existingCategory = await CategoriesModels.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!existingCategory) {
      return error(res, 404, "Category not found");
    }

    if (existingCategory.name === "Uncategorized") {
      return error(res, 400, "Default category cannot be deleted");
    }

    const existingRecipeCount = await RecipeModels.count({
      where: { categoryId },
    });

    if (existingRecipeCount) {
      return error(
        res,
        400,
        `${existingRecipeCount} Category has been added in Recipe`,
      );
    }

    await CategoriesModels.destroy({ where: { id: categoryId } });

    return success(res, 200, "delete category successfully");
  } catch (errors) {
    if (errors.name === "SequelizeForeignKeyConstraintError") {
      return error(res, 400, "Category is still used by recipes");
    }
    error(res, 500, errors.message);
  }
};

import axiosInstance from "@/API/axiosinstance.api";
import { recipesMock, recipesMockExtended } from "@/API/mockup/mockup";
import { IS_DEMO } from "@/config/env";


export const getAllRecipes = async ({
  query,
  category,
  difficulty,
  time,
  page,
}) => {
  if (IS_DEMO) {
    return recipesMock.getAllRecipes({
      search: query,
      category,
      difficulty,
      time,
      page,
    });
  }

  const res = await axiosInstance.get("/recipes/", {
    params: { search: query, category, difficulty, time, page },
  });
  return res?.data;
};

export const getAllRecipesForAdmin = async ({
  search,
  category,
  difficulty,
  time,
  status,
}) => {
  if (IS_DEMO) {
    return recipesMock.getRecipesForAdmin({
      search,
      category,
      difficulty,
      time,
      status,
    });
  }
  const res = await axiosInstance.get("/recipes/admin/recipes", {
    params: { search, category, difficulty, time, status },
  });
  return res?.data;
};

export const countRecipesByAuthor = async () => {
  if (IS_DEMO) {
    return recipesMock.countRecipeByAuthor();
  }
  return await axiosInstance.get("/recipes/count/recipes");
};

export const countAllRecipesStatus = async () => {
  if (IS_DEMO) {
    return recipesMock.countAllRecipesStatus();
  }
  const res = await axiosInstance.get("/recipes/count/all/recipes");
  return res?.data;
};

export const getRecipeById = async (id) => {
  if (IS_DEMO) {
    return recipesMock.getRecipeById(id);
  }
  const res = await axiosInstance.get(`/recipes/single/${id}`);
  return res?.data;
};

export const getRecipesByAuthor = async ({
  search,
  category,
  time,
  difficulty,
  status,
  page,
}) => {
  if (IS_DEMO) {
    return recipesMock.getRecipesByAuthor({
      search,
      category,
      time,
      difficulty,
      status,
      page,
    });
  }
  const res = await axiosInstance.get(`/recipes/author`, {
    params: { search, category, time, difficulty, status },
  });
  return res?.data;
};

export const getRecipesByCategory = async (category) => {
  if (IS_DEMO) {
    return recipesMockExtended.getRecipesByCategory(category);
  }
  const res = await axiosInstance.get(`/recipes/category/${category}`);
  return res?.data;
};

export const createRecipe = async (data) => {
  if (IS_DEMO) {
    return recipesMock.createRecipe(data);
  }
  return await axiosInstance.post("/recipes/create", data);
};

export const updateRecipeById = async (id, data) => {
  if (IS_DEMO) {
    return recipesMock.updateRecipe(id, data);
  }
  return await axiosInstance.patch(`/recipes/update/${id}`, data);
};
export const updateStatusRecipes = async (id, data) => {
  if (IS_DEMO) {
    return recipesMock.updateStatusRecipes(id, data);
  }
  return axiosInstance.post(`/recipes/update/status/${id}`, data);
};
export const deleteRecipeById = async (id) => {
  if (IS_DEMO) {
    return recipesMock.deleteRecipe(id);
  }
  return await axiosInstance.delete(`/recipes/delete/${id}`);
};

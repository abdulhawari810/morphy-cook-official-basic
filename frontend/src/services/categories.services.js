import axiosInstance from "@/API/axiosinstance.api";
import { categoryMock, categoryMockExtended } from "@/API/mockup/mockup";
import { IS_DEMO } from "@/config/env";


export const getAllCategories = async () => {
  if (IS_DEMO) {
    return categoryMock.getAllCategories();
  }
  return await axiosInstance.get("/categories");
};

export const createCategories = async (data) => {
  if (IS_DEMO) {
    return categoryMockExtended.createCategories(data);
  }
  return await axiosInstance.post(`/categories/create`, data);
};

export const createAllCategories = async (data) => {
  if (IS_DEMO) {
    return categoryMockExtended.createAllCategories(data);
  }
  return await axiosInstance.post(`/categories/create/all`, data);
};

export const deleteCategoriesById = async (recipeId) => {
  if (IS_DEMO) {
    return categoryMockExtended.deleteCategoriesById(recipeId);
  }
  return await axiosInstance.delete(`/categories/delete/${recipeId}`);
};

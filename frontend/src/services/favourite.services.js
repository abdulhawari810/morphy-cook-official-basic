import axiosInstance from "@/API/axiosinstance.api";
import { favouriteMock } from "@/API/mockup/mockup";
import { IS_DEMO } from "@/config/env";


export const getAllFavourite = async () => {
  if (IS_DEMO) {
    return favouriteMock.getAllFavourite();
  }
  return await axiosInstance.get("/favourite/");
};

export const countAllFavourite = async () => {
  if (IS_DEMO) {
    return favouriteMock.countFavourite();
  }
  return await axiosInstance.get("/favourite/");
};

export const createFavourite = async (recipeId) => {
  if (IS_DEMO) {
    return favouriteMock.createFavorite(recipeId);
  }
  return await axiosInstance.post(`/favourite/create/${recipeId}`);
};

export const deleteFavouriteById = async (recipeId) => {
  if (IS_DEMO) {
    return favouriteMock.deleteFavourite(recipeId);
  }
  return await axiosInstance.delete(`/favourite/delete/${recipeId}`);
};

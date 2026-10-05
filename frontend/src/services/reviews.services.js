import axiosInstance from "@/API/axiosinstance.api";
import { reviewMock } from "@/API/mockup/mockup";
import { IS_DEMO } from "@/config/env";

export const getReviewsByRecipe = async (recipeId, { page = 1, limit = 10 } = {}) => {
  if (IS_DEMO) {
    return reviewMock.getReviewsByRecipe(recipeId, { page, limit });
  }
  const res = await axiosInstance.get(`/reviews/recipe/${recipeId}`, {
    params: { page, limit },
  });
  return res?.data;
};

export const getReviewSummaryByRecipe = async (recipeId) => {
  if (IS_DEMO) {
    return reviewMock.getReviewSummaryByRecipe(recipeId);
  }
  const res = await axiosInstance.get(`/reviews/recipe/${recipeId}/summary`);
  return res?.data;
};

export const getMyReviews = async () => {
  if (IS_DEMO) {
    return reviewMock.getMyReviews();
  }
  const res = await axiosInstance.get("/reviews/me");
  return res?.data;
};

export const createReview = async (recipeId, payload) => {
  if (IS_DEMO) {
    return reviewMock.createReview(recipeId, payload);
  }
  const res = await axiosInstance.post(`/reviews/recipe/${recipeId}`, payload);
  return res?.data;
};

export const updateReviewById = async (id, payload) => {
  if (IS_DEMO) {
    return reviewMock.updateReview(id, payload);
  }
  const res = await axiosInstance.patch(`/reviews/${id}`, payload);
  return res?.data;
};

export const deleteReviewById = async (id) => {
  if (IS_DEMO) {
    return reviewMock.deleteReview(id);
  }
  const res = await axiosInstance.delete(`/reviews/${id}`);
  return res?.data;
};

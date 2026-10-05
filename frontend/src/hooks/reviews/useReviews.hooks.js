import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import {
  getReviewsByRecipe,
  getReviewSummaryByRecipe,
  createReview,
  updateReviewById,
  deleteReviewById,
} from "@/services/reviews.services";
import { reviewKeys } from "@/utils/queryKeys";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";
import { getErrorMessage } from "@/utils/errorMessage";

const unwrapList = (res) => (IS_DEMO ? res?.data : res?.data?.data);
const unwrapItem = (res) => (IS_DEMO ? res?.data : res?.data?.data);

export const useReviewsByRecipe = (recipeId, { page = 1, limit = 10 } = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: reviewKeys.byRecipe(recipeId, { page, limit }),
    queryFn: () => getReviewsByRecipe(recipeId, { page, limit }),
    enabled: !!recipeId,
  });

  const payload = unwrapList(data);

  return {
    reviews: payload?.data ?? [],
    totalData: payload?.totalData ?? 0,
    totalPage: payload?.totalPage ?? 1,
    currentPage: payload?.currentPage ?? page,
    loadingReviews: isLoading,
    error,
  };
};

export const useReviewSummary = (recipeId) => {
  const { data, isLoading } = useQuery({
    queryKey: reviewKeys.summary(recipeId),
    queryFn: () => getReviewSummaryByRecipe(recipeId),
    enabled: !!recipeId,
  });

  return {
    summary: unwrapItem(data) ?? { totalReviews: 0, averageRating: 0 },
    loadingSummary: isLoading,
  };
};

export const useCreateReview = (recipeId) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (payload) => createReview(recipeId, payload),
    onSuccess: () => {
      toast.success(t("handleMessage.review.create.success"));
      queryClient.invalidateQueries({ queryKey: reviewKeys.all() });
    },
    onError: (err) => notifyError(err, t, "handleMessage.review.create.error"),
  });

  return { createReview: mutateAsync, loadingCreateReview: isPending, error };
};

export const useUpdateReview = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, payload }) => updateReviewById(id, payload),
    onSuccess: () => {
      toast.success(t("handleMessage.review.update.success"));
      queryClient.invalidateQueries({ queryKey: reviewKeys.all() });
    },
    onError: (err) => notifyError(err, t, "handleMessage.review.update.error"),
  });

  return { updateReview: mutateAsync, loadingUpdateReview: isPending };
};

export const useDeleteReview = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState(null);

  const { mutateAsync, error } = useMutation({
    mutationFn: (id) => deleteReviewById(id),
    onSuccess: () => {
      toast.success(t("handleMessage.review.delete.success"));
      queryClient.invalidateQueries({ queryKey: reviewKeys.all() });
    },
    onError: (err) => {
      toast.error(getErrorMessage(err, t("handleMessage.review.delete.error")));
    },
  });

  const handleDelete = async (id) => {
    try {
      setLoadingId(id);
      await mutateAsync(id);
    } finally {
      setLoadingId(null);
    }
  };

  return { deleteReview: handleDelete, loadingDeleteId: loadingId, error };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavouriteById } from "@/services/favourite.services";
import { toast } from "react-hot-toast";
import { favouriteKeys } from "@/utils/queryKeys";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { notifyError } from "@/utils/notify";

export const useDeleteFavourite = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loadingDeleteFavouriteId, setLoadingDeleteFavouriteId] =
    useState(null);

  const {
    mutateAsync: deleteFavouriteMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id) => deleteFavouriteById(id),

    onSuccess: () => {
      toast.success(t("handleMessage.favourite.delete.success"));

      queryClient.invalidateQueries({ queryKey: favouriteKeys.all() });
    },

    onError: (err) =>
      notifyError(err, t, "handleMessage.favourite.delete.error"),
  });

  const handleDeleteFavourite = async (id) => {
    try {
      setLoadingDeleteFavouriteId(id);

      await deleteFavouriteMutate(id);
    } finally {
      setLoadingDeleteFavouriteId(null);
    }
  };

  return {
    handleDeleteFavourite,
    loadingDeleteFavourite: isPending,
    loadingDeleteFavouriteId,
    error,
  };
};

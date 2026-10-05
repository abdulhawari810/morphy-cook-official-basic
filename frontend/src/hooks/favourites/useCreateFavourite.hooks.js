import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavourite } from "@/services/favourite.services";
import { toast } from "react-hot-toast";
import { favouriteKeys } from "@/utils/queryKeys";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useCreateFavourite = () => {
  const { t } = useTranslation();


  const queryClient = useQueryClient();
  const [loadingFavouriteId, setLoadingFavouriteId] = useState(null);

  const {
    mutateAsync: createFavouriteMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => createFavourite(payload),

    onSuccess: () => {
      toast.success(t("handleMessage.favourite.create.success"));
      queryClient.invalidateQueries({ queryKey: favouriteKeys.all() });
    },

    onError: (error) => notifyError(error, t, "handleMessage.favourite.create.error"),
  });

  const handleCreateFavourite = async (id) => {
    try {
      setLoadingFavouriteId(id);

      await createFavouriteMutate(id);
    } finally {
      setLoadingFavouriteId(null);
    }
  };

  return {
    createFavourite: handleCreateFavourite,
    loadingCreateFavourite: isPending,
    loadingFavouriteId,
    error,
  };
};

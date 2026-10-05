import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateStatusRecipes } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useUpdateStatusRecipes = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();


  const {
    mutateAsync: updateStatusRecipe,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, status }) => updateStatusRecipes(id, status),
    onSuccess: () => {
      toast.success(t("handleMessage.recipe.update_status.success"));
      queryClient.invalidateQueries(recipeKeys.all());
    },

    onError: (error) => notifyError(error, t, "handleMessage.recipe.update_status.error"),
  });

  return {
    updateStatusRecipe,
    loadingUpdateStatus: isPending,
    error,
  };
};

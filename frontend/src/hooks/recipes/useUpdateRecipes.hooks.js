import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipeById } from "@/services/recipes.services";
import { toast } from "react-hot-toast";
import { recipeKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useUpdateRecipes = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();


  const {
    mutateAsync: updateRecipes,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, payload }) => updateRecipeById(id, payload),
    onSuccess: () => {
      toast.success(t("handleMessage.recipe.update.success"));
      queryClient.invalidateQueries(recipeKeys.all());
    },

    onError: (error) => notifyError(error, t, "handleMessage.recipe.update.error"),
  });

  return {
    updateRecipes,
    loadingUpdateRecipes: isPending,
    error,
  };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipeById } from "@/services/recipes.services";
import { toast } from "react-hot-toast";
import { recipeKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useDeleteRecipes = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();


  const mutation = useMutation({
    mutationFn: (id) => deleteRecipeById(id),

    onSuccess: () => {
      toast.success(t("handleMessage.recipe.delete.success"));
      queryClient.invalidateQueries(recipeKeys.all());
    },

    onError: (err) => notifyError(err, t, "handleMessage.recipe.delete.error"),
  });

  return {
    deleteRecipes: mutation.mutate,
    loadingDeleteRecipes: mutation.isPending,
  };
};

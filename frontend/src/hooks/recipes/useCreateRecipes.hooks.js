import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "@/services/recipes.services";
import { toast } from "react-hot-toast";
import { recipeKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useCreateRecipes = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();


  const {
    mutateAsync: createRecipeMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ payload }) => createRecipe(payload),

    onSuccess: () => {
      toast.success(t("handleMessage.recipe.create.success"));
      queryClient.invalidateQueries(recipeKeys.all());
    },

    onError: (error) => notifyError(error, t, "handleMessage.recipe.create.error"),
  });

  return {
    createRecipes: createRecipeMutate,
    loadingCreateRecipes: isPending,
    error,
  };
};

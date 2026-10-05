import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";
import { IS_DEMO } from "@/config/env";

export const useSingleRecipes = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => getRecipeById(id),
    enabled: !!id,
  });

  return {
    // Demo: { data: {...} } | Produksi: { data: { data: {...} } }
    recipe: IS_DEMO ? data?.data : data?.data?.data,
    loadingSingleRecipes: isLoading,
    error,
  };
};

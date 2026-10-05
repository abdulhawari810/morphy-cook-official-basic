import { useQuery } from "@tanstack/react-query";
import { countAllRecipesStatus } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";

export const useCountAllRecipes = () => {
  const {
    data: countData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: recipeKeys.count(),
    queryFn: countAllRecipesStatus,
  });

  return {
    countAll: countData?.data || { draft: 0, accept: 0, reject: 0 },
    loadingCountAllRecipes: isLoading,
    error,
    refetch,
  };
};
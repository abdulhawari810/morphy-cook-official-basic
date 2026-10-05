import { useQuery } from "@tanstack/react-query";
import { countRecipesByAuthor } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";

export const useCountRecipesByAuthor = () => {
  const {
    data: countData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: recipeKeys.count(),
    queryFn: countRecipesByAuthor,
  });

  return {
    count: countData?.data || {
      pending: 0,
      draft: 0,
      accept: 0,
      reject: 0,
    },
    loadingCountRecipes: isLoading,
    error,
    refetch,
  };
};
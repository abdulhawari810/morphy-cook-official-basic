import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";

export const useAllRecipes = ({
  query,
  category,
  difficulty,
  time,
  page,
} = {}) => {
  const params = { query, category, difficulty, time, page };

  const {
    data: recipesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: recipeKeys.list(params),
    queryFn: () => getAllRecipes(params),
  });

  return {
    recipes: recipesData?.data || [],
    loadingRecipes: isLoading,
    error,
    refetch,
  };
};
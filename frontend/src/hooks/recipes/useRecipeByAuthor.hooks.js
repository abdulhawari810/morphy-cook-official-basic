import { useQuery } from "@tanstack/react-query";
import { getRecipesByAuthor } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";
import { IS_DEMO } from "@/config/env";
import { useAuth } from "@/hooks/auth/useAuth.hooks";

export const useRecipesByAuthor = ({
  search,
  category,
  time,
  difficulty,
  status,
  page,
} = {}) => {
  const { me } = useAuth();
  const params = { search, category, time, difficulty, status, page };

  const {
    data: recipesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: recipeKeys.byAuthor(me?.id, params),
    queryFn: () => getRecipesByAuthor(params),
    enabled: !!me,
  });

  return {
    // Demo: { data: [...] } | Produksi: { data: { data: [...] } }
    recipesByAuthor: IS_DEMO
      ? recipesData?.data || []
      : recipesData?.data?.data || [],
    loadingRecipesAuthor: isLoading,
    error,
    refetch,
  };
};
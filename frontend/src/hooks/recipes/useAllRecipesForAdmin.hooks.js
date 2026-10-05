import { useQuery } from "@tanstack/react-query";
import { getAllRecipesForAdmin } from "@/services/recipes.services";
import { recipeKeys } from "@/utils/queryKeys";
import { IS_DEMO } from "@/config/env";

export const useAllRecipesForAdmin = ({
  search,
  category,
  status,
  difficulty,
  time,
  page,
} = {}) => {
  const params = { search, category, status, difficulty, time, page };

  const {
    data: recipesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: recipeKeys.admin(params),
    queryFn: () => getAllRecipesForAdmin(params),
  });

  return {
    // Demo: { data: [...] } | Produksi: { data: { data: [...] } }
    recipesAdmin: IS_DEMO
      ? recipesData?.data || []
      : recipesData?.data?.data || [],
    loadingRecipesAdmin: isLoading,
    error,
    refetch,
  };
};
import { useQuery } from "@tanstack/react-query";
import { getAllFavourite } from "@/services/favourite.services";
import { favouriteKeys } from "@/utils/queryKeys";
import { useAuth } from "@/hooks/auth/useAuth.hooks";

export const useAllFavourite = () => {
  const { me } = useAuth();
  // 🔹 GET ALL RECIPES
  const {
    data: favouriteData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: favouriteKeys.all(),
    queryFn: () => getAllFavourite(),
    enabled: !!me,
  });

  return {
    favourites: favouriteData?.data || [],
    loadingFavourite: isLoading,
    error,
    refetch,
  };
};

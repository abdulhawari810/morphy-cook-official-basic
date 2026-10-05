import { useQuery } from "@tanstack/react-query";
import { countAllFavourite } from "@/services/favourite.services";
import { favouriteKeys } from "@/utils/queryKeys";
import { useAuth } from "@/hooks/auth/useAuth.hooks";

export const useCountAllFavourite = () => {
  const { me } = useAuth();
  // 🔹 GET ALL RECIPES
  const {
    data: favouriteCountData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: favouriteKeys.count(),
    queryFn: () => countAllFavourite(),
    enabled: !!me,
  });

  return {
    count: favouriteCountData?.data || [],
    loadingCountFavourite: isLoading,
    error,
    refetch,
  };
};

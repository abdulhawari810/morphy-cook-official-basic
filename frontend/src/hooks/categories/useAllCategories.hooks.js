import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/categories.services";
import { categoriesKeys } from "@/utils/queryKeys";
import { IS_DEMO } from "@/config/env";

export const useAllCategories = () => {
  const {
    data: categoriesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: categoriesKeys.all(),
    queryFn: getAllCategories,
    //_ data lama (dari IndexedDB) tetap tampil saat refetch,
    //_ skeleton hanya muncul saat pertama kali belum ada data sama sekali
    placeholderData: (prev) => prev,
  });

  return {
    // Demo: { data: [...] } | Produksi: { data: { data: [...] } }
    categories: IS_DEMO
      ? categoriesData?.data || []
      : categoriesData?.data?.data || [],
    loadingCategories: isLoading,
    error,
    refetch,
  };
};
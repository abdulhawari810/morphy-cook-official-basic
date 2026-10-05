import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/profile.services";
import { profileKeys } from "@/utils/queryKeys";
import { IS_DEMO } from "@/config/env";

export const useProfile = () => {
  const {
    data: profileData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: profileKeys.all(),
    queryFn: getProfile,
  });

  return {
    // Demo: { data: {...} } | Produksi: { data: { data: {...} } }
    profile: IS_DEMO
      ? profileData?.data || null
      : profileData?.data?.data || null,
    loadingProfile: isLoading,
    error,
    refetch,
  };
};
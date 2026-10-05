import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/users.services";
import { usersKeys } from "@/utils/queryKeys";
import { IS_DEMO } from "@/config/env";

export const useAllUsers = ({ search, sort, filter } = {}) => {
  const params = { search, sort, filter };

  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: usersKeys.list(params),
    queryFn: () => getAllUsers(params),
  });

  return {
    // Demo: { data: [...] } | Produksi: { data: { data: [...] } }
    users: IS_DEMO ? usersData?.data || [] : usersData?.data?.data || [],
    loadingUsers: isLoading,
    error,
  };
};
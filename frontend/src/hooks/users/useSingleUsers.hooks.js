import { IS_DEMO } from "@/config/env";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/users.services";
import { usersKeys } from "@/utils/queryKeys";

export const useSingleUsers = (id) => {

  const { data, isLoading, error } = useQuery({
    queryKey: usersKeys.single(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

  // Handle both demo and production response structures
  // Demo: { data: userData }
  // Production: { data: { data: userData } }
  const user = IS_DEMO
    ? data?.data
    : data?.data?.data;

  return {
    user,
    loadingSingleUsers: isLoading,
    error,
  };
};

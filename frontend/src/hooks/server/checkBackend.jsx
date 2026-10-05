import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/API/axiosinstance.api";
import NetworkError from "@/components/handleError/NetworkError";
import { backendKeys } from "@/utils/queryKeys";

const BackendStatus = ({ children }) => {
  const { isPending, isError, refetch } = useQuery({
    queryKey: backendKeys.health(),
    queryFn: async () => {
      const response = await axiosInstance.get("/health");

      return response.data;
    },

    retry: 2,

    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return children;
  }

  if (isError) {
    return <NetworkError onRetry={refetch} />;
  }

  return children;
};

export default BackendStatus;

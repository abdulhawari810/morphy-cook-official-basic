import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateStatusUsers } from "@/services/users.services";
import { usersKeys, AuthKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "@/utils/errorMessage";

export const useUpdateStatusUsers = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutateAsync: updateStatus,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, payload }) => updateStatusUsers(id, payload),

    onSuccess: () => {
      toast.success(t("handleMessage.users.update_status.success"));
      queryClient.invalidateQueries({ queryKey: usersKeys.all() });
      queryClient.invalidateQueries({ queryKey: AuthKeys.all() });
    },

    onError: (err) => {
      toast.error(
        getErrorMessage(err, t("handleMessage.users.update_status.error")),
      );
    },
  });

  return {
    updateStatus,
    loadingUpdateStatus: isPending,
    error,
  };
};
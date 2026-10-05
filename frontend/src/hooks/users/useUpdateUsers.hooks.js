import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserById } from "@/services/users.services";
import toast from "react-hot-toast";
import { usersKeys, AuthKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "@/utils/errorMessage";

export const useUpdateUsers = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutateAsync: updateUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, payload }) => updateUserById(id, payload),

    onSuccess: () => {
      toast.success(t("handleMessage.users.update.success"));
      queryClient.invalidateQueries({ queryKey: usersKeys.all() });
      queryClient.invalidateQueries({ queryKey: AuthKeys.all() });
    },

    onError: (err) => {
      toast.error(
        getErrorMessage(err, t("handleMessage.users.update.error")),
      );
    },
  });

  return {
    updateUsers,
    loadingUpdateUsers: isPending,
    error,
  };
};
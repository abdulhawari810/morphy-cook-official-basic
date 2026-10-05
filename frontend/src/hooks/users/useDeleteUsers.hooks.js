import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/users.services";
import toast from "react-hot-toast";
import { usersKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "@/utils/errorMessage";

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutateAsync: deleteUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => deleteUser(),

    onSuccess: () => {
      toast.success(t("handleMessage.users.delete.success"));
      queryClient.invalidateQueries({ queryKey: usersKeys.all() });
    },

    onError: (err) => {
      toast.error(
        getErrorMessage(err, t("handleMessage.users.delete.error")),
      );
    },
  });

  return {
    deleteUsers,
    loadingDeleteUsers: isPending,
    error,
  };
};
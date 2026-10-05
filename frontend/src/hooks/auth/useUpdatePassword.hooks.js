import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword } from "@/services/auth.services";
import { toast } from "react-hot-toast";
import { AuthKeys, usersKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useAuthUpdatePassword = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();


  const {
    mutateAsync: updateAuthPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => updatePassword(payload),
    onSuccess: () => {
      toast.success(t("handleMessage.auth.password.success"));
      queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      });
      queryClient.invalidateQueries({
        queryKey: AuthKeys.all(),
      });
    },

    onError: (error) => notifyError(error, t, "handleMessage.auth.password.error"),
  });

  return {
    updateAuthPassword,
    loadingAuthUpdatePassword: isPending,
    error,
  };
};

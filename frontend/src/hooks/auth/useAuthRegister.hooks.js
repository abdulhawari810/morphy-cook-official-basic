import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "@/services/auth.services";
import { toast } from "react-hot-toast";
import { AuthKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();


  const {
    mutateAsync: registerUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ payload }) => registerUser(payload),

    onSuccess: () => {
      toast.success(t("handleMessage.auth.register.success"));
      queryClient.invalidateQueries(AuthKeys.all());
    },

    onError: (error) => notifyError(error, t, "handleMessage.auth.register.error"),
  });

  return {
    registerUsers,
    loadingRegister: isPending,
    error,
  };
};

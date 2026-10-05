import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/services/auth.services";
import { toast } from "react-hot-toast";
import { AuthKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();


  const {
    mutateAsync: loginUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ payload }) => {
      const res = await loginUser(payload);

      return res.data;
    },

    onSuccess: (data) => {
      if (data?.requires2FA) {
        return;
      }

      toast.success(t("handleMessage.auth.login.success"));

      localStorage.setItem("isLogin", "true");

      queryClient.invalidateQueries({
        queryKey: AuthKeys.all(),
      });
    },

    onError: (error) => notifyError(error, t, "handleMessage.auth.login.error"),
  });

  return {
    loginUsers,
    loadingLogin: isPending,
    error,
  };
};

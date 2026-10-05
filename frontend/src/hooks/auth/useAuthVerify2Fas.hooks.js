import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verify2FasLogin } from "@/services/auth.services";
import { toast } from "react-hot-toast";
import { AuthKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useVerify2FasLogin = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();


  const {
    mutateAsync: verify2Fas,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ token, challengeToken }) =>
      verify2FasLogin({ token, challengeToken }),

    onSuccess: () => {
      toast.success(t("handleMessage.auth.login.success"));
      localStorage.setItem("isLogin", "true");
      queryClient.invalidateQueries(AuthKeys.all());
    },

    onError: (error) => notifyError(error, t, "handleMessage.auth.login.error"),
  });

  return {
    verify2Fas,
    loadingverify2FasLogin: isPending,
    error,
  };
};

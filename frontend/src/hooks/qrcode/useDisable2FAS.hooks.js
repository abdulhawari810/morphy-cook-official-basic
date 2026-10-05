import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disable2FAS } from "@/services/qrcode.services";
import { toast } from "react-hot-toast";
import { qrcodeKeys, AuthKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { notifyError } from "@/utils/notify";

export const useDisable2FAS = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutateAsync: disable2FASData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => disable2FAS(payload),

    onSuccess: () => {
      toast.success(t("handleMessage.2FA.disable.success"));

      //_ toggle + tanggal aktif di SecuritySection dibaca dari `me`,
      //_ jadi cache user harus ikut disegarkan
      queryClient.invalidateQueries(qrcodeKeys.all());
      queryClient.invalidateQueries(AuthKeys.current());
    },

    onError: (err) => notifyError(err, t, "handleMessage.2FA.disable.error"),
  });

  return {
    disable2FASData,
    loadingDisable2FAS: isPending,
    error,
  };
};
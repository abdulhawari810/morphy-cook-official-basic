import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verify2FAS } from "@/services/qrcode.services";
import { toast } from "react-hot-toast";
import { qrcodeKeys, AuthKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { notifyError } from "@/utils/notify";

export const useVerify2FAS = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutateAsync: Verify2FASData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => verify2FAS(payload),

    onSuccess: () => {
      toast.success(t("handleMessage.2FA.verify.success"));

      //_ `me` menyimpan two_factor_enabled; tanpa invalidate, toggle di
      //_ SecuritySection tetap menampilkan keadaan lama setelah verifikasi
      queryClient.invalidateQueries(qrcodeKeys.all());
      queryClient.invalidateQueries(AuthKeys.current());
    },

    onError: (err) => notifyError(err, t, "handleMessage.2FA.verify.error"),
  });

  return {
    Verify2FASData,
    loadingVerify2FAS: isPending,
    error,
  };
};
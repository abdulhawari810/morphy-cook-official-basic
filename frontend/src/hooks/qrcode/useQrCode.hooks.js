import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setup2FAS } from "@/services/qrcode.services";
import { qrcodeKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

/**
 * Bentuk respons `POST /2fas/setup` berbeda antara demo dan produksi,
 * dan nama field-nya juga tidak sama:
 *
 *   Demo     : { data: { secret, qrCode } }        qrCode = URI otpauth://
 *   Produksi : { data: { data: { secret, qrcode } } } qrcode = gambar data URL
 *
 * Semuanya dinormalkan menjadi `{ secret, qrImage, otpauthUrl }` supaya
 * komponen tidak perlu tahu asal-usul datanya.
 */
const normalizeSetup = (res) => {
  const payload = IS_DEMO ? res?.data : res?.data?.data;

  const secret = payload?.secret ?? null;

  //_ backend mengirim gambar (data URL); mock hanya mengirim URI otpauth
  const qrImage =
    typeof payload?.qrcode === "string" ? payload.qrcode : null;

  const otpauthUrl =
    typeof payload?.qrCode === "string" && payload.qrCode.startsWith("otpauth://")
      ? payload.qrCode
      : null;

  return { secret, qrImage, otpauthUrl };
};

export const useSetup2FAS = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutateAsync: setup2fas,
    isPending,
    error,
  } = useMutation({
    //_ normalisasi WAJIB di mutationFn: mutateAsync() mengembalikan hasil
    //_ mutationFn, bukan hasil onSuccess. Kalau dinormalkan di onSuccess,
    //_ pemanggil tetap menerima respons mentah.
    mutationFn: async ({ payload }) => normalizeSetup(await setup2FAS(payload)),

    onSuccess: () => {
      queryClient.invalidateQueries(qrcodeKeys.all());
    },

    onError: (err) => notifyError(err, t, "handleMessage.2FA.qrcode.error"),
  });

  return {
    setup2fas,
    loadingSetup2fas: isPending,
    error,
  };
};
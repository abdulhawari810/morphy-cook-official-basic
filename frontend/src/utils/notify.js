import toast from "react-hot-toast";
import { IS_DEMO } from "@/config/env";
import { getErrorMessage } from "@/utils/errorMessage";

/**
 * Toast error untuk mutation hook.
 *
 * Menyingkirkan pola `if (IS_DEMO) ... else ...` yang diulang di
 * setiap hook, sekaligus memastikan setiap hook memakai fallback
 * message yang spesifik (bukan default `auth.password.error`).
 *
 * @param {unknown} error  error dari useMutation
 * @param {(key: string) => string} t  fungsi translate
 * @param {string} fallbackKey  key i18n untuk pesan generic
 */
export const notifyError = (error, t, fallbackKey) => {
  toast.error(
    IS_DEMO ? (error?.message ?? t(fallbackKey)) : getErrorMessage(error, t(fallbackKey)),
  );
};

/** Toast sukses untuk mutation hook. */
export const notifySuccess = (t, successKey) => {
  toast.success(t(successKey));
};
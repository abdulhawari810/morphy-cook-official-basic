import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/profile.services";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useUpdateProfile = () => {
  const { t } = useTranslation();


  const {
    mutateAsync: updateProfileUsers,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => updateProfile(payload),
    onSuccess: () => {
      toast.success(t("handleMessage.profile.update.success"));
    },

    onError: (error) => notifyError(error, t, "handleMessage.profile.update.error"),
  });

  return {
    updateProfileUsers,
    loadingUpdateProfile: isPending,
    error,
  };
};

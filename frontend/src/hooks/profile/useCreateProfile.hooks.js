import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "@/services/profile.services";
import { toast } from "react-hot-toast";
import { profileKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { notifyError } from "@/utils/notify";

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const {
    mutateAsync: createProfileMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => createProfile(payload),

    onSuccess: () => {
      toast.success(t("handleMessage.profile.create.success"));
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },

    onError: (error) => notifyError(error, t, "handleMessage.profile.create.error"),
  });

  return {
    createProfiles: createProfileMutate,
    loadingCreateProfile: isPending,
    error,
  };
};

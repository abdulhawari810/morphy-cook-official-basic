import { useMutation, useQueryClient } from "@tanstack/react-query";
import { avatarUpload } from "@/services/upload.services";
import { usersKeys, AuthKeys, profileKeys } from "@/utils/queryKeys";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "@/utils/errorMessage";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutateAsync: createUploadAvatarMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload) => avatarUpload(payload),

    onSuccess: () => {
      // avatar muncul di navbar, tabel admin, dan halaman profil
      queryClient.invalidateQueries({ queryKey: AuthKeys.all() });
      queryClient.invalidateQueries({ queryKey: usersKeys.all() });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },

    onError: (err) => {
      console.error(
        getErrorMessage(err, t("handleMessage.avatar.upload.error")),
      );
    },
  });

  return {
    createUploadAvatar: createUploadAvatarMutate,
    loadingCreateUploadAvatar: isPending,
    error,
  };
};
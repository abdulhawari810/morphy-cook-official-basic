import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { me, logoutUser } from "@/services/auth.services";
import { AuthKeys, usersKeys, profileKeys } from "@/utils/queryKeys";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "@/utils/errorMessage";
import { IS_DEMO } from "@/config/env";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { t } = useTranslation();

  const isLogin = localStorage.getItem("isLogin") === "true";

  // 🔹 GET CURRENT USER
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: AuthKeys.current(),
    queryFn: me,
    enabled: isLogin,
    retry: false,
  });

  // 🔹 LOGOUT
  const { mutateAsync: logout, isPending: loadingLogout } = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.clear();

      toast.success(t("handleMessage.auth.logout.success"));
      localStorage.removeItem("isLogin");
      nav("/");
    },

    onError: (err) => {
      toast.error(
        IS_DEMO
          ? err.message
          : getErrorMessage(err, t("handleMessage.auth.logout.error")),
      );
    },
  });

  return {
    // Demo: { data: {...} } | Produksi: { data: { data: {...} } }
    me: (IS_DEMO ? userData?.data : userData?.data?.data) || null,
    loadingMe: isLoading || loadingLogout,
    error,
    refetch,
    logout,
  };
};

//_key yang perlu di-clear saat session berakhir
export const AUTH_SCOPED_KEYS = [
  AuthKeys.all(),
  usersKeys.all(),
  profileKeys.all(),
];
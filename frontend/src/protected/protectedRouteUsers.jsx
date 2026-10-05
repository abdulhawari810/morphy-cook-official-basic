import { Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { FullPageLoader } from "@/protected/protectedRoute";
import { USER_STATUS } from "@/config/constants";

/** Guard route untuk user yang sudah login (tanpa pembatasan role). */
export default function ProtectedRouteUsers() {
  const { me, loadingMe } = useAuth();
  const { t } = useTranslation();

  if (loadingMe) return <FullPageLoader label={t("common.loading")} />;

  if (!me || me.is_active === USER_STATUS.BANNED) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
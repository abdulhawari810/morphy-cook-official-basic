import { Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { USER_STATUS } from "@/config/constants";

/** Layar full-page saat session masih diverifikasi. */
export const FullPageLoader = ({ label = "Loading..." }) => (
  <div className="w-full h-screen flex items-center justify-center bg-orange-500">
    <button
      type="button"
      className="flex flex-col gap-5 items-center p-5 text-white text-lg xl:text-2xl"
      disabled
    >
      <span className="animate-spin inline-block h-8 w-8 xl:w-10 xl:h-10 border-4 border-white border-t-transparent rounded-full" />
      <span>{label}</span>
    </button>
  </div>
);

/**
 * Guard route berbasis role.
 *
 * Catatan: ini hanya UX guard. Otorisasi sesungguhnya tetap di
 * backend (middleware role) — client bisa dimanipulasi user.
 */
export default function ProtectedRoute({ allowedRoles = [] }) {
  const { me, loadingMe } = useAuth();
  const { t } = useTranslation();

  if (loadingMe) return <FullPageLoader label={t("common.loading")} />;

  //_ banned tidak boleh masuk ke area dashboard meski role-nya cocok
  if (!me || me.is_active === USER_STATUS.BANNED) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(me.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
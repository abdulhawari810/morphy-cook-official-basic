import { USER_STATUS } from "@/config/constants";
import { Outlet } from "react-router-dom";
import BannedAccount from "@/components/banned.component";
import { useAuth } from "@/hooks/auth/useAuth.hooks";

export default function SettingsLayout() {
  const { me } = useAuth();

  if (me?.is_active === USER_STATUS.BANNED) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 md:p-4 py-32 lg:py-25">
          <BannedAccount />
        </main>
      </div>
    );
  }

  return <Outlet />;
}

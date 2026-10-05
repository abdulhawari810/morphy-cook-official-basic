import { USER_STATUS } from "@/config/constants";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar.component";
import Footer from "@/components/footer.component";
import Menu from "@/components/menu.component";
import BannedAccount from "@/components/banned.component";
import { useAuth } from "@/hooks/auth/useAuth.hooks";

export default function DashboardLayout() {
  const { me } = useAuth();

  if (me?.is_active === USER_STATUS.BANNED) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-4 pt-25">
          <BannedAccount />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 w-full min-w-0 px-4 pt-20 pb-10 md:p-4 md:pt-25 lg:pt-22.5 md:flex md:gap-4">
        <div className="md:shrink-0 w-[20%]">
          <Menu />
        </div>

        <div className="w-full h-120! lg:w-[50%] min-w-0 md:flex-1 lg:h-112.5  overflow-y-auto">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

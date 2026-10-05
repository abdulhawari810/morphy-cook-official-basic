import { USER_STATUS } from "@/config/constants";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar.component";
import Footer from "@/components/footer.component";
import BannedAccount from "@/components/banned.component";
import { useAuth } from "@/hooks/auth/useAuth.hooks";

export default function AppLayout() {
  const { me } = useAuth();

  if (me?.is_active === USER_STATUS.BANNED) return <BannedAccount />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 md:p-4 pt-20 md:pt-24 lg:pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

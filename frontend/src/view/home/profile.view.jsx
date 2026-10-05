import { useAuth } from "@/hooks/auth/useAuth.hooks";
import ProfileSection from "@/components/profile/ProfileSection";
import SecuritySection from "@/components/profile/SecuritySection";
import LanguageSection from "@/components/profile/LanguageSection";
import ThemeSection from "@/components/profile/ThemeSection";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { renderIcon } from "@/utils/icons.utils";
import { useTranslation } from "react-i18next";

export default function ProfileView() {
  const { logout } = useAuth();
  const { t} = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(() => {
    return location.state?.page || localStorage.getItem("pages") || "profile";
  });
  const [showMenu, setShowMenu] = useState(false);
  const menuWidth = "w-[90%] max-w-[420px] md:w-[260px]";

  const setPages = (page) => {
    setActiveMenu(page);
    localStorage.setItem("pages", page);
    setShowMenu(false);
  };

  //_ page tujuan dari router (state) dipersistensi lalu dibersihkan agar
  //_ refresh tidak memaksa user kembali ke tab yang sama
  const pageFromState = location.state?.page;

  useEffect(() => {
    if (!pageFromState) return;

    localStorage.setItem("pages", pageFromState);

    navigate(location.pathname, { replace: true, state: null });
  }, [pageFromState, location.pathname, navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowMenu(false);
      }
    };

    document.body.style.overflow = showMenu ? "hidden" : "auto";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMenu]);

  return (
    <>
      <div className="relative w-full overflow-hidden md:min-h-screen dark:bg-neutral-950">
        {/* Button menu mobile */}
        <div className="relative bg-white dark:bg-neutral-900 top-0 left-0 z-50 p-5 md:hidden">
          <button
            className="cursor-pointer w-6 h-6 overflow-hidden flex items-center justify-center relative"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span
              className={`w-full h-0.5 dark:bg-white bg-black rounded-full transition-all! absolute left-0  ${showMenu ? "translate-y- rotate-45 " : "-translate-y-2 rotate-0"}`}
            ></span>
            <span
              className={`w-full h-0.5 dark:bg-white bg-black rounded-full absolute transition-all! left-0 ${showMenu ? "translate-x-900" : "translate-x-0"}`}
            ></span>
            <span
              className={`w-full transition-all! h-0.5 dark:bg-white bg-black rounded-full absolute left-0 ${showMenu ? "translate-y-0 -rotate-220 " : "translate-y-2 rotate-0"}`}
            ></span>
          </button>
        </div>

        {/* Overlay mobile */}
        {showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
          />
        )}

        <div className="flex md:min-h-screen h-[90vh]">
          {/* Sidebar */}
          <aside
            className={`${menuWidth} fixed md:relative md:w-80! top-0 left-0 z-40 h-screen p-6 pt-18 md:pt-6 shrink-0 transition-transform duration-300 ease-in-out ${showMenu ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
          >
            <div className="w-full h-full p-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg flex flex-col space-y-4">
              <NavLink
                to={"/"}
                className="text-orange-500 peer flex items-center justify-start rounded-lg gap-2 hover:bg-orange-500 bg-orange-500/10 hover:text-white! p-2 text-md font-bold"
              >
                {renderIcon("House", {
                  className: "w-5 h-5 ",
                })}
                <span>{t("homepage.title")}</span>
              </NavLink>
              <div className="h-[.5px] my-5 bg-slate-300 dark:bg-neutral-500 rounded-full"></div>
              <button
                className={`rounded-lg flex items-center justify-between cursor-pointer ${activeMenu === "profile" ? "bg-orange-500 dark:bg-orange-500/10 dark:text-orange-500  text-white" : "hover:bg-orange-500/10 hover:text-orange-500 text-slate-700 dark:text-neutral-500"} p-2 grouping`}
                onClick={() => setPages("profile")}
              >
                <div className="flex items-center grouping justify-center text-md gap-2">
                  {renderIcon("User", {
                    className: "w-5 h-5 grouping-hover:translate-x-5",
                  })}
                  <span>{t("profile.title")}</span>
                </div>
                {renderIcon("ChevronRight", { className: "w-5 h-5" })}
              </button>
              <button
                className={`rounded-lg flex items-center justify-between cursor-pointer ${activeMenu === "settings" ? "bg-orange-500 dark:bg-orange-500/10 dark:text-orange-500  text-white" : "hover:bg-orange-500/10 hover:text-orange-500 text-slate-700 dark:text-neutral-500"} p-2 grouping`}
                onClick={() => setPages("settings")}
              >
                <div className="flex items-center justify-center text-md gap-2">
                  {renderIcon("ShieldCog", { className: "w-5 h-5" })}
                  <span>{t("security.title")}</span>
                </div>
                {renderIcon("ChevronRight", { className: "w-5 h-5" })}
              </button>
              <button
                className={`rounded-lg flex items-center justify-between cursor-pointer ${activeMenu === "language" ? "bg-orange-500 dark:bg-orange-500/10 dark:text-orange-500  text-white" : "hover:bg-orange-500/10 hover:text-orange-500 text-slate-700 dark:text-neutral-500"} p-2 grouping`}
                onClick={() => setPages("language")}
              >
                <div className="flex items-center justify-center text-md gap-2">
                  {renderIcon("Languages", { className: "w-5 h-5" })}
                  <span>{t("language.title")}</span>
                </div>
                {renderIcon("ChevronRight", { className: "w-5 h-5" })}
              </button>
              <button
                className={`rounded-lg flex items-center justify-between cursor-pointer ${activeMenu === "theme" ? "bg-orange-500 dark:bg-orange-500/10 dark:text-orange-500  text-white" : "hover:bg-orange-500/10 hover:text-orange-500 text-slate-700 dark:text-neutral-500"} p-2 grouping`}
                onClick={() => setPages("theme")}
              >
                <div className="flex items-center justify-center text-md gap-2">
                  {renderIcon("Moon", { className: "w-5 h-5" })}
                  <span>{t("theme.title")}</span>
                </div>
                {renderIcon("ChevronRight", { className: "w-5 h-5" })}
              </button>
              <button className=" rounded-lg flex items-center justify-between hover:bg-red-500/10 cursor-pointer text-red-500 p-2" onClick={logout}>
                <div className="flex items-center justify-center text-md gap-2">
                  {renderIcon("Trash2", { className: "w-5 h-5" })}
                  <span>{t("common.logout")}</span>
                </div>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main
            className={` w-full md:min-h-screen dark:bg-neutral-950 p-2.5 md:p-6 pt-2 md:pt-6 transition-transform duration-300 ease-in-out ${showMenu ? "translate-x-[90%]" : "translate-x-0"} md:translate-x-0`}
          >
            <div className="w-full  h-full overflow-y-auto">
              {activeMenu === "profile" && <ProfileSection />}
              {activeMenu === "settings" && <SecuritySection />}
              {activeMenu === "language" && <LanguageSection />}
              {activeMenu === "theme" && <ThemeSection />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

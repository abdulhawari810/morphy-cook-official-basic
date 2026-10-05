import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useAllFavourite } from "@/hooks/favourites/useAllFavourite.hooks";
import ProfileMenu from "@/components/profil_menu.component";
import { NavLink } from "react-router-dom";
import { getAssetImage } from "@/utils/image.utils";
import ButtonLoading from "./loading/button.loading";
import { useTranslation } from "react-i18next";
import { ROLES } from "@/config/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { me, logout, loadingMe } = useAuth();
  const { favourites } = useAllFavourite();
  const [showNav, setShowNav] = useState(true);
  const { t } = useTranslation();

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      //_ navbar hanya menyembunyikan diri saat user scroll ke bawah
      if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //_ menu mobile terbuka memaksa navbar tampil
  const isNavVisible = isOpen || showNav;
  return (
    <>
      <nav
        className={`bg-white dark:bg-neutral-900 shadow-lg fixed top-0 transition-transform duration-300 left-0 z-50 min-w-full h-16 lg:h-20 ${isNavVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="md:max-w-7xl mx-auto px-4 items-center sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex shrink-0">
              <div className="flex items-center justify-center">
                <img
                  src={getAssetImage("resource/logo.png")}
                  alt="Morphy Cook Official"
                  className="w-20 h-20 object-cover"
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition"
                      : "text-gray-900 dark:text-orange-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  }
                >
                  {t("common.navbar.home")}
                </NavLink>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition"
                      : "text-gray-900 dark:text-orange-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  }
                >
                  {t("common.navbar.recipe")}
                </NavLink>
                <NavLink
                  to="/category"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition"
                      : "text-gray-900 dark:text-orange-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  }
                >
                  {t("common.navbar.categories")}
                </NavLink>

                {me && (
                  <>
                    <NavLink
                      to="/favourite"
                      className={({ isActive }) =>
                        isActive
                          ? "text-orange-500 relative px-3 py-2 rounded-md text-sm font-medium transition"
                          : "text-gray-900 dark:text-orange-700 relative px-3 py-2 rounded-md text-sm font-medium transition"
                      }
                    >
                      {t("common.navbar.favourite")}
                      <div className="bg-red-500 text-white absolute -top-2.5 right-0 rounded-full p-1 flex items-center justify-center text-xs">
                        {favourites?.data?.length >= 100
                          ? 99
                          : favourites?.length || 0}
                      </div>
                    </NavLink>
                  </>
                )}

                <div className="cursor-pointer">
                  {me ? (
                    <ProfileMenu
                      profile={me?.profile}
                      name={me?.username}
                      role={me?.role}
                      logoutUser={logout}
                      isLoading={loadingMe}
                    />
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className="text-gray-700 dark:text-neutral-400 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="bg-orange-600 text-white hover:bg-orange-700 px-4 py-2 rounded-md text-sm font-medium transition"
                      >
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center relative w-6 h-6 gap-2.5"
            >
              <span
                className={`w-full h-0.5 dark:bg-white bg-black rounded-full transition-all! absolute left-0  ${isOpen ? "translate-y- rotate-45 " : "-translate-y-2 rotate-0"}`}
              ></span>
              <span
                className={`w-full h-0.5 dark:bg-white bg-black rounded-full absolute transition-all! left-0 ${isOpen ? "translate-x-900" : "translate-x-0"}`}
              ></span>
              <span
                className={`w-full transition-all! h-0.5 dark:bg-white bg-black rounded-full absolute left-0 ${isOpen ? "translate-y-0 -rotate-220 " : "translate-y-2 rotate-0"}`}
              ></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden navbar w-80 gap-2 right-0 h-screen bg-white dark:bg-neutral-900 fixed top-15 ${isOpen ? "show flex flex-col" : "hide hidden"} transition-transform duration-200 p-4 z-50`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                  : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
              }
              onClick={() => setIsOpen(false)}
            >
              {t("common.navbar.home")}
            </NavLink>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                  : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
              }
              onClick={() => setIsOpen(false)}
            >
              {t("common.navbar.recipe")}
            </NavLink>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                  : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
              }
              onClick={() => setIsOpen(false)}
            >
              {t("common.navbar.categories")}
            </NavLink>
            {me?.role === ROLES.CHIEF && (
              <NavLink
                to="/dashboard/chef"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                    : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
                }
                onClick={() => setIsOpen(false)}
              >
                {t("common.navbar.profile_menu.my_recipe")}
              </NavLink>
            )}
            {me?.role === ROLES.ADMIN && (
              <NavLink
                to="/dashboard/admin"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                    : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
                }
              >
                {t("common.navbar.profile_menu.dashboard")}
              </NavLink>
            )}
            {me ? (
              <>
                <NavLink
                  to="/favourite"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                      : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.navbar.favourite")} ({favourites?.length || 0})
                </NavLink>
                <NavLink
                  to="/my"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 bg-orange-500/10 px-3 py-2 rounded-md text-lg font-medium transition"
                      : "text-gray-900 dark:text-orange-200/50 px-3 py-2 rounded-md text-lg font-medium transition"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.navbar.profile_menu.settings")}
                </NavLink>
                <ButtonLoading
                  loading={loadingMe}
                  title={"Logout"}
                  onClick={logout}
                  classList={"mt-10"}
                />
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={
                    "text-gray-900 mt-10 dark:text-orange-500 px-3 py-2 rounded-md text-lg font-medium transition"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={
                    "text-white bg-orange-500 dark:bg-orange-500/10 dark:text-orange-500 px-3 py-2 rounded-md text-lg font-medium transition"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import { useState, useRef, useEffect } from "react";
import { renderIcon } from "@/utils/icons.utils";
import { NavLink } from "react-router-dom";
import AnimateSpin from "./animate.spin.component";

import { useTranslation } from "react-i18next";
import { IS_DEMO } from "@/config/env";
import { ROLES } from "@/config/constants";

export default function ProfileMenu({
  profile,
  name = "User",
  logoutUser,
  role,
  isLoading,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const production = import.meta.env.VITE_ENVIRONMENT;
  const upload =
    production === "production"
      ? import.meta.env.VITE_BASE_API_UPLOAD
      : "http://localhost:5000";

  return (
    <>
      <div className="relative cursor-pointer" ref={menuRef}>
        {/* Trigger */}
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center cursor-pointer gap-2 rounded-full ${open ? "shadow-lg" : "shadow-none"}`}
        >
          {!IS_DEMO && profile && profile !== "default.png" ? (
            <img
              src={`${upload}/${profile}`}
              alt={name}
              className="w-10 h-10  rounded-full object-cover"
            />
          ) : IS_DEMO && profile && profile !== "default.png" ? (
            <img
              src={`${profile}`}
              alt={name}
              className="w-10 h-10  rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:text-gray-200! group-hover:bg-orange-600 bg-gray-200 transition">
              {renderIcon("User", { className: "w-5 h-5" })}
            </div>
          )}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border p-2 z-50">
            <div className="px-3 py-2 border-b">
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-gray-500">
                {t("common.navbar.profile_menu.subtitle")}
              </p>
            </div>

            <ul className="mt-2 space-y-2 py-2.5 flex flex-col text-sm">
              <NavLink to={"/my"} state={{ page: "profile" }}>
                <li className="w-full cursor-pointer text-left px-3 py-2 rounded-lg hover:bg-gray-100  dark:hover:bg-neutral-800 transition">
                  {t("common.navbar.profile_menu.profile")}
                </li>
              </NavLink>
              {role === ROLES.CHIEF && (
                <NavLink to={"/dashboard/chef"}>
                  <li className="w-full cursor-pointer text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                    {t("common.navbar.profile_menu.my_recipe")}
                  </li>
                </NavLink>
              )}
              {role === ROLES.ADMIN && (
                <NavLink to={"/dashboard/admin"}>
                  <li className="w-full cursor-pointer text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                    {t("common.navbar.profile_menu.dashboard")}
                  </li>
                </NavLink>
              )}
              <NavLink to={"/my"} state={{ page: "settings" }}>
                <li className="w-full cursor-pointer text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                  {t("common.navbar.profile_menu.settings")}
                </li>
              </NavLink>
            </ul>

            <div className="border-t mt-2 py-3 pt-5">
              <button
                onClick={logoutUser}
                className="bg-red-500 dark:bg-red-500/10 dark:text-red-500 w-full font-semibold py-2 rounded-lg transition duration-200 flex items-center gap-3 justify-center cursor-pointer text-white"
              >
                {isLoading ? (
                  <>
                    <span className="rounded-full w-5 h-5 border-2 border-t-transparent border-white animate-spin"></span>
                    <span>Logout</span>
                  </>
                ) : (
                  <span>Logout</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

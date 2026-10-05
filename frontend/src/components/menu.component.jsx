import { NavLink } from "react-router-dom";
import { renderIcon } from "@/utils/icons.utils";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ROLES } from "@/config/constants";

export default function Menu() {
  const { me, logout } = useAuth();
  const { t } = useTranslation();

  const menuItems = useMemo(() => {
    const dashboardItem = {
      name: t("dashboard.menu.dashboard"),
      url: "",
      end: true,
      icons: "LayoutDashboard",
    };

    if (me?.role === ROLES.CHIEF) {
      return [
        dashboardItem,
        {
          name: t("dashboard.chief.recipe.title"),
          url: "recipe",
          end: false,
          icons: "UtensilsCrossed",
        },
      ];
    }

    return [
      dashboardItem,
      {
        name: t("dashboard.admin.users.title"),
        url: "users",
        end: false,
        icons: "Users",
      },
      {
        name: t("dashboard.admin.recipe.title"),
        url: "recipe",
        end: false,
        icons: "UtensilsCrossed",
      },
    ];
  }, [me?.role, t]);

  return (
    <section className="w-full fixed bottom-0 left-0 md:relative lg:relative z-40">
      <main className="bg-white dark:bg-neutral-900 w-full rounded-xl md:h-[75vh] lg:relative lg:relative p-4 lg:[100vh] flex lg:flex-col md:flex-col justify-evenly items-center md:justify-start md:items-start lg:justify-start lg:items-start gap-4">
        {menuItems.map((item, i) => {
          return (
            <NavLink
              key={item.url || i}
              to={item.url}
              end={item.end}
              className={({ isActive }) =>
                isActive
                  ? "lg:w-full md:lg:w-full w-fit h-fit flex p-4 md:p-3 rounded-lg bg-orange-500 dark:bg-orange-500/10 dark:text-orange-500 text-white items-center gap-3"
                  : "lg:w-full md:lg:w-full w-fit h-fit flex p-4 md:p-3 rounded-lg hover:bg-orange-500/10 text-slate-600 hover:text-orange-500 items-center gap-3"
              }
            >
              {renderIcon(item.icons, {
                className: "lg:w-5 md:w-5 w-6 lg:h-5 md:h-5 h-6",
              })}
              <span className="hidden md:flex">{item.name}</span>
            </NavLink>
          );
        })}

        <div className="hidden absolute lg:flex md:flex w-full px-4 left-0 bottom-4">
          <button
            className="w-full h-10 flex p-4 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer items-center gap-2"
            onClick={logout}
          >
            {renderIcon("LogOut", { className: "w-5 h-5" })}
            <span>{t("dashboard.menu.logout")}</span>
          </button>
        </div>
      </main>
    </section>
  );
}
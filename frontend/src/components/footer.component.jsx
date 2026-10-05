import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useAllFavourite } from "@/hooks/favourites/useAllFavourite.hooks";
import { getAssetImage } from "@/utils/image.utils";
import ButtonLoading from "./loading/button.loading";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { me, logout, loadingMe } = useAuth();
  const { favourites } = useAllFavourite();
  const { t } = useTranslation();

  const navigationLinks = [
    { label: t("common.footer.nav.home"), href: "/" },
    { label: t("common.footer.nav.recipes"), href: "/recipes" },
    { label: t("common.footer.nav.categories"), href: "/category" },
  ];

  const roleLinks = {
    admin: {
      label: t("common.footer.nav.dashboard"),
      href: "/dashboard/admin",
    },
    chief: {
      label: t("common.footer.nav.my_recipes"),
      href: "/dashboard/chef",
    },
  };

  const linkClass =
    "text-slate-400 hover:text-orange-400 transition-colors duration-200 text-sm";
  return (
    <footer className="bg-slate-950 text-slate-200 px-10 mt-5 border-t pb-20 md:pb-0 lg:pb-0 border-slate-800">
      <div className="max-w-7xl mx-auto py-14 grid grid-cols-1 md:flex lg:flex gap-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <div>
            <img
              src={getAssetImage("resource/branding1.png")}
              className="md:w-50 md:h-30 w-30 h-30 object-cover"
            />
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            {t("common.footer.about.heading")}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:flex lg:justify-between items-start gap-6 w-full">
          {/* Navigation */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {t("common.footer.nav.heading")}
            </h3>

            <ul className="space-y-3 w-full">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {me && (
                <li>
                  <Link to="/favourite" className={linkClass}>
                    {t("common.footer.nav.favourite")} (
                    {favourites?.length || 0})
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Account */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {t("common.footer.account.heading")}
            </h3>

            <div className="flex flex-col gap-4">
              {me && (
                <Link to="/my" className={linkClass}>
                  {t("common.footer.nav.my_profile")}
                </Link>
              )}
              {me?.role && roleLinks[me?.role] && (
                <Link
                  to={roleLinks[me?.role].href}
                  className={`${linkClass} mb-4`}
                >
                  {roleLinks[me?.role].label}
                </Link>
              )}
              {me ? (
                <ButtonLoading
                  loading={loadingMe}
                  hideTitle={true}
                  title={"Logout"}
                  classList={
                    "w-fit px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 transition-colors duration-200 text-sm font-medium text-white"
                  }
                  onClick={logout}
                />
              ) : (
                <div className="flex flex-col gap-3">
                  <a
                    href="/login"
                    className="w-fit px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 transition-colors duration-200 text-sm font-medium text-white"
                  >
                    Login
                  </a>

                  <a
                    href="/register"
                    className="w-fit px-5 py-2 rounded-xl border border-slate-700 hover:border-orange-500 hover:text-orange-400 transition-all duration-200 text-sm font-medium "
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Extra Info */}
          <div className="w-full col-span-2 lg:col-span-0 md:col-span-0">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {t("common.footer.explore.heading")}
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/recipes" className={linkClass}>
                  {t("common.footer.explore.trending")}
                </Link>
              </li>
              <li>
                <Link
                  to={{ pathname: "/recipes", search: "?category=Vegetarian" }}
                  className={linkClass}
                >
                  {t("common.footer.explore.healthy")}
                </Link>
              </li>
              <li>
                <Link
                  to={{ pathname: "/recipes", search: "?category=Dessert" }}
                  className={linkClass}
                >
                  {t("common.footer.explore.dessert")}
                </Link>
              </li>
              <li>
                <Link to="/category" className={linkClass}>
                  {t("common.footer.explore.categories")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} MCO ( Morphy Cook Official ). All
            rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              {t("legal.privacy.title")}
            </Link>

            <Link
              to="/terms"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              {t("legal.terms.title")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useAllCategories } from "@/hooks/categories/useAllCategories.hooks";
import { renderIcon } from "@/utils/icons.utils";
import { useTranslation } from "react-i18next";
import NoDataFound from "@/components/handleError/NotFound";
import { NavLink } from "react-router-dom";
import MiniCardLoading from "@/components/loading/mini_card.loading";

export default function CategoryView() {
  const { categories, loadingCategories } = useAllCategories();
  const { t } = useTranslation();
  return (
    <div className="px-5">
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 rounded-2xl px-6 py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t("common.categories.title")}
          </h1>
          <p className="text-gray-500 mt-2 dark:text-orange-200">
            {t("common.categories.subtitle")}
          </p>
        </div>

        {/* Grid */}

        {loadingCategories ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: categories?.length || 8 }).map((_, i) => {
              return <MiniCardLoading key={i} />;
            })}
          </div>
        ) : categories?.length > 0 ? (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((item) => (
              <NavLink
                to={{
                  pathname: "/recipes",
                  search: `?category=${item.name}`,
                }}
                key={item.id}
              >
                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 cursor-pointer group">
                  {/* Icon / Placeholder */}
                  <div className="w-12 h-12 mb-4 rounded-xl bg-orange-100 text-orange-500 dark:bg-neutral-950 flex items-center justify-center text-xl group-hover:scale-110 transition">
                    {renderIcon("UtensilsCrossed", { className: "w-5 h-5" })}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-orange-500 transition">
                    {item.name}
                  </h2>

                  {/*  desc */}
                  <p className="text-sm text-gray-500 mt-1 dark:group-hover:text-orange-200 dark:text-orange-200/70">
                    {item.desc}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <NoDataFound
            title={t("common.no_data_found.categories.empty.title")}
            subtitle={t("common.no_data_found.categories.empty.subtitle")}
            bodyClass={
              "flex flex-col items-center justify-center mt-20 text-center"
            }
            thumbnailClass={"w-40 mb-4 opacity-70 rounded-4xl"}
            titleClass={"text-xl font-semibold"}
            subtitleClass={"text-gray-500 mt-2"}
          />
        )}
      </div>
    </div>
  );
}

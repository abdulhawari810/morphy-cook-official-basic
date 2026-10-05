import Card from "@/components/card.component";
import NoDataFound from "@/components/handleError/NotFound";
import { useNavigate, useSearchParams } from "react-router-dom";
import { renderIcon } from "@/utils/icons.utils";
import { useState } from "react";
import Filter from "@/components/filter.component";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchLoading } from "@/hooks/useSearchLoading";
import { useUpdateStatusRecipes } from "@/hooks/recipes/useUpdateStatusRecipes.hooks";
import { useAllRecipesForAdmin } from "@/hooks/recipes/useAllRecipesForAdmin.hooks";
import { getAssetImage } from "@/utils/image.utils";
import CardLoading from "@/components/loading/card.loading";
import { useTranslation } from "react-i18next";

const colorClasses = {
  amber: {
    active:
      "bg-amber-500 dark:bg-amber-500/10 text-white dark:outline-amber-500! dark:text-amber-500!",
    inactive:
      "bg-amber-500/10 dark:bg-transparent text-amber-500 dark:text-amber-800",
    hover:
      "hover:bg-amber-500 dark:hover:bg-amber-500/10 dark:hover:text-amber-500 hover:text-white dark:hover:outline-amber-500",
    outline: "outline-amber-500 dark:outline-amber-800",
  },

  green: {
    active:
      "bg-green-500 dark:bg-green-500/10 text-white dark:outline-green-500! dark:text-green-500!",
    inactive:
      "bg-green-500/10 dark:bg-transparent text-green-500 dark:text-green-800",
    hover:
      "hover:bg-green-500 dark:hover:bg-green-500/10 dark:hover:text-green-500 hover:text-white dark:hover:outline-green-500",
    outline: "outline-green-500 dark:outline-green-800",
  },

  orange: {
    active:
      "bg-orange-500 dark:bg-orange-500/10 text-white dark:outline-orange-500! dark:text-orange-500!",
    inactive:
      "bg-orange-500/10 dark:bg-transparent text-orange-500 dark:text-orange-800",
    hover:
      "hover:bg-orange-500 dark:hover:bg-orange-500/10 dark:hover:text-orange-500 hover:text-white dark:hover:outline-orange-500",
    outline: "outline-orange-500 dark:outline-orange-800",
  },

  red: {
    active:
      "bg-red-500 dark:bg-red-500/10 text-white dark:outline-red-500! dark:text-red-500!",
    inactive:
      "bg-red-500/10 dark:bg-transparent text-red-500 dark:text-red-800",
    hover:
      "hover:bg-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-500 hover:text-white dark:hover:outline-red-500",
    outline: "outline-red-500 dark:outline-red-800",
  },
};

export default function RecipeAdminView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterdebounced, setFilterDebounced] = useState(null);
  const [filter, setFilter] = useState({});
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const debouncedSearchTerm = useDebounce(searchTerm);
  const loadingSearch = useSearchLoading(searchTerm, false);

  //_ tab status aktif disimpan di URL agar bisa di-share/refresh
  const selectedBtnStatus = searchParams.get("status") || "";

  const { updateStatusRecipe } = useUpdateStatusRecipes();

  const { recipesAdmin, loadingRecipesAdmin } = useAllRecipesForAdmin({
    search: debouncedSearchTerm,
    status: selectedBtnStatus,
    category:
      filterdebounced?.category === "all" ? "" : filterdebounced?.category,
    time: filterdebounced?.time === "all" ? "" : filterdebounced?.time,
    difficulty:
      filterdebounced?.difficulty === "all" ? "" : filterdebounced?.difficulty,
  });

  const statusButtons = [
    {
      label: t("dashboard.admin.recipe.filter_menu.draft"),
      value: "draft",
      icon: "ClipboardPen",
      color: "amber",
    },
    {
      label: t("dashboard.admin.recipe.filter_menu.accept"),
      value: "accept",
      icon: "Check",
      color: "green",
    },
    {
      label: t("dashboard.admin.recipe.filter_menu.pending"),
      value: "pending",
      icon: "Clock",
      color: "orange",
    },
    {
      label: t("dashboard.admin.recipe.filter_menu.reject"),
      value: "reject",
      icon: "X",
      color: "red",
    },
  ];
  return (
    <>
      <main className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl w-full md:p-5 gap-5">
        <section className="sticky top-0 z-20 w-full bg-white pt-5 pb-2 dark:bg-neutral-900">
          {/* Title */}
          <div className="mb-5 flex items-center justify-between px-5 md:px-0">
            <h1 className="font-bold text-2xl">
              {t("dashboard.admin.recipe.title")}
            </h1>

            {/* Filter - Mobile */}
            <div className="md:hidden">
              <Filter
                selectDefault={false}
                ShowInput={false}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                onFilterChangeFinal={(finalFilter) =>
                  setFilterDebounced(finalFilter)
                }
                filterValue={filter}
                onFilterChange={(newFilter) => setFilter(newFilter)}
                headerClass="w-20 h-15!"
              />
            </div>
          </div>

          {/* Search + Status */}
          <div className="flex flex-col px-5 gap-3 md:flex-row md:items-center md:justify-between md:px-0">
            {/* Search */}
            <div className="relative flex w-full items-center md:w-auto">
              <input
                type="text"
                placeholder={t("common.recipe.text_search")}
                className="h-12 w-full rounded-lg bg-white p-4 pl-10 pr-12 text-md shadow-md outline-none dark:bg-neutral-800 dark:placeholder:text-slate-400 sm:w-80 md:w-90"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <span className="absolute left-2.5">
                {renderIcon("Search", {
                  className: "h-5 w-5 text-slate-400",
                })}
              </span>

              {loadingSearch && (
                <span className="absolute right-5 h-5 w-5 animate-spin rounded-full border-3 border-orange-500 border-t-transparent" />
              )}
            </div>

            {/* Status Buttons */}
            <div className="flex w-full px-2 items-center gap-2 py-2 overflow-x-auto md:w-auto md:overflow-visible">
              {statusButtons.map((btn) => {
                const isActive = selectedBtnStatus === btn.value;
                const colors = colorClasses[btn.color];

                return (
                  <button
                    key={btn.value}
                    className={`flex shrink-0 cursor-pointer items-center gap-1 rounded-2xl p-2 outline md:gap-2 md:p-3 ${colors.hover} ${colors.outline} ${
                      isActive ? colors.active : colors.inactive
                    }`}
                    onClick={() => {
                      setSearchParams(
                        isActive ? {} : { status: btn.value },
                      );
                    }}
                  >
                    {renderIcon(btn.icon, {
                      className: "h-5 w-5",
                    })}

                    <span>{btn.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Filter - Desktop */}
            <div className="hidden md:block">
              <Filter
                selectDefault={false}
                ShowInput={false}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                onFilterChangeFinal={(finalFilter) =>
                  setFilterDebounced(finalFilter)
                }
                filterValue={filter}
                onFilterChange={(newFilter) => setFilter(newFilter)}
                headerClass="w-20 h-15!"
              />
            </div>
          </div>
        </section>

        {/* Card Grid */}
        <div
          className={`${loadingRecipesAdmin || recipesAdmin?.data?.length > 0 ? "columns-2" : "flex"} justify-between px-5 pb-10 md:p-0 md:columns-3 items-start w-full space-y-4 md:space-y-5`}
        >
          {loadingRecipesAdmin && !recipesAdmin?.data ? (
            Array.from({ length: 12 }).map((_, i) => {
              return <CardLoading key={i} />;
            })
          ) : recipesAdmin?.data?.length > 0 ? (
            recipesAdmin?.data.map((item) => {
              return (
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  image={
                    item.thumbnail === "placeholder.png"
                      ? getAssetImage("food/placeholder.png")
                      : item.thumbnail
                  }
                  profile={item.recipe?.profile}
                  author={item.recipe?.username}
                  badgePosition={true}
                  difficulty={item.difficulty}
                  time={item.time}
                  category={item?.category?.name}
                  itemId={item.id}
                  createdAt={item.createdAt}
                  onCardClick={() => nav(`/recipes/detail/${item.id}`)}
                  onAcceptClick={(e) => {
                    e.stopPropagation();
                    updateStatusRecipe({
                      id: item.id,
                      status: {
                        status: "accept",
                      },
                    });
                  }}
                  onDraftClick={(e) => {
                    e.stopPropagation();
                    updateStatusRecipe({
                      id: item.id,
                      status: {
                        status: "draft",
                      },
                    });
                  }}
                  onRejectClick={(e) => {
                    e.stopPropagation();
                    updateStatusRecipe({
                      id: item.id,
                      status: {
                        status: "reject",
                      },
                    });
                  }}
                  badge={
                    item.status === "pending"
                      ? t("dashboard.admin.recipe.filter_menu.pending")
                      : item.status === "accept"
                        ? t("dashboard.admin.recipe.filter_menu.accept")
                        : item.status === "reject"
                          ? t("dashboard.admin.recipe.filter_menu.reject")
                          : t("dashboard.admin.recipe.filter_menu.draft")
                  }
                />
              );
            })
          ) : debouncedSearchTerm ? (
            <NoDataFound
              type={"search"}
              title={t("common.no_data_found.recipe.search.title")}
              subtitle={`${t("common.no_data_found.recipe.search.subtitle.recipe")} ${debouncedSearchTerm} ${t("common.no_data_found.recipe.search.subtitle.not_found")}`}
            />
          ) : (
            <NoDataFound
              title={t("common.no_data_found.recipe.empty.title")}
              subtitle={t("common.no_data_found.recipe.empty.subtitle")}
            />
          )}
        </div>
      </main>
    </>
  );
}

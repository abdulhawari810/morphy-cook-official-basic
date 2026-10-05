import { useState } from "react";
import Card from "@/components/card.component";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAssetImage } from "@/utils/image.utils";
import NoDataFound from "@/components/handleError/NotFound";
import CardLoading from "@/components/loading/card.loading";

import { useCreateFavourite } from "@/hooks/favourites/useCreateFavourite.hooks";
import { useAllRecipes } from "@/hooks/recipes/useAllRecipes.hooks";
import { useAllFavourite } from "@/hooks/favourites/useAllFavourite.hooks";
import Filter from "@/components/filter.component";
import Pagination from "@/components/pagination.components";
import { useTranslation } from "react-i18next";
import { renderIcon } from "@/utils/icons.utils";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchLoading } from "@/hooks/useSearchLoading";

import { useAllCategories } from "@/hooks/categories/useAllCategories.hooks";

export default function RecipesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilters] = useState({});
  const { favourites } = useAllFavourite();
  const [filterdebounced, setFilterDebounced] = useState({});
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const debouncedSearchTerm = useDebounce(searchTerm);
  const loadingSearch = useSearchLoading(searchTerm, false);

  const { categories } = useAllCategories();

  //_ URL (?category=Nasi) diprioritaskan di atas filter internal
  const categoryLabel = (name) =>
    categories?.find((item) => item.name === name)?.id;

  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "";

  const { recipes, loadingRecipes } = useAllRecipes({
    query: debouncedSearchTerm,
    category: urlCategory
      ? categoryLabel(urlCategory)
      : filterdebounced.category === "all"
        ? ""
        : filterdebounced.category,
    difficulty:
      filterdebounced.difficulty === "all" ? "" : filterdebounced.difficulty,
    time: filterdebounced.time === "all" ? "" : filterdebounced.time,
    page,
  });

  const { createFavourite, loadingFavouriteId } = useCreateFavourite();
  const nav = useNavigate();

  const recipeList = recipes?.data;

  return (
    <div className="px-5">
      <div className="p-5 md:p-6 bg-white dark:bg-neutral-900 md:rounded-2xl w-full">
        {/* Header */}
        <div className="sm:flex items-center py-2.5 mb-10 justify-between">
          <h1 className="text-2xl font-bold">{t("common.recipe.title")}</h1>

          {/* Search + Filter */}
          <div className="flex h-12 w-full mt-5 sm:mt-0 sm:w-90 md:w-110 items-center justify-between gap-5 relative">
            <div className="flex items-center justify-center relative">
              <input
                type="text"
                placeholder={t("common.recipe.text_search")}
                className="w-50 sm:w-70 md:w-90 h-12 rounded-lg bg-white dark:bg-neutral-800 shadow-md outline-none p-4 text-md pl-10 pr-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-2.5">
                {renderIcon("Search", {
                  className: "w-5 h-5 text-slate-400",
                })}
              </span>
              {loadingSearch && (
                <span className="absolute right-5 animate-spin border-3 border-t-transparent w-5 h-5 rounded-full border-orange-500"></span>
              )}
            </div>
            <Filter
              onChange={(e) => setSearchTerm(e.target.value)}
              ShowInput={false}
              value={searchTerm}
              filterValue={filter}
              onFilterChange={(newFilter) => setFilters(newFilter)}
              loading={loadingSearch}
              headerClass={"h-12!"}
              onFilterChangeFinal={(finalFilter) =>
                setFilterDebounced(finalFilter)
              }
            />
          </div>
        </div>

        {/* Card Grid */}
        <div
          className={`${loadingRecipes || recipeList?.length > 0 ? "columns-2" : "flex"}
        justify-center md:p-0 md:columns-3 lg:columns-4 items-start w-full space-y-4 md:space-y-5`}
        >
          {loadingRecipes ? (
            Array.from({ length: 12 }).map((_, i) => {
              return <CardLoading key={i} />;
            })
          ) : recipeList?.length > 0 ? (
            recipeList?.map((item) => {
              return (
                <Card
                  key={item.id}
                  itemId={item.id}
                  title={item.title}
                  description={item.description}
                  image={
                    item.thumbnail === "placeholder.png"
                      ? getAssetImage("food/placeholder.png")
                      : item.thumbnail
                  }
                  profile={item.recipe?.profile}
                  author={item.recipe?.username}
                  difficulty={item.difficulty}
                  time={item.time}
                  category={item.category?.name}
                  createdAt={item.createdAt}
                  onCardClick={() => nav(`/recipes/detail/${item.id}`)}
                  onFavouriteSaved={favourites}
                  onFavouriteClick={(e) => {
                    e.stopPropagation();

                    createFavourite(item.id);
                  }}
                  onLoadingFavourite={loadingFavouriteId === item.id}
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

        {/* Pagination */}
        {recipes?.data?.length > 0 && recipes?.totalPage > 1 && (
          <Pagination
            currentPage={recipes.currentPage}
            totalPage={recipes.totalPage}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}

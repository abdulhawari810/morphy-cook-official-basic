import Filter from "@/components/filter.component";
import Card from "@/components/card.component";
import { getAssetImage } from "@/utils/image.utils";
import { useAllRecipes } from "@/hooks/recipes/useAllRecipes.hooks";
import { useCreateFavourite } from "@/hooks/favourites/useCreateFavourite.hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import CardLoading from "@/components/loading/card.loading";
import Pagination from "@/components/pagination.components";
import { useAllFavourite } from "@/hooks/favourites/useAllFavourite.hooks";
import NoDataFound from "@/components/handleError/NotFound";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchLoading } from "@/hooks/useSearchLoading";

import { useTranslation } from "react-i18next";

export default function HomeView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilters] = useState({});
  const { favourites } = useAllFavourite();
  const [filterdebounced, setFilterDebounced] = useState({});
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const debouncedSearchTerm = useDebounce(searchTerm);
  const loadingSearch = useSearchLoading(searchTerm, false);

  const { recipes, loadingRecipes } = useAllRecipes({
    query: debouncedSearchTerm,
    category:
      filterdebounced.category === "all" ? "" : filterdebounced.category,
    difficulty:
      filterdebounced.difficulty === "all" ? "" : filterdebounced.difficulty,
    time: filterdebounced.time === "all" ? "" : filterdebounced.time,
    page,
  });

  const { createFavourite, loadingFavouriteId } = useCreateFavourite();
  const nav = useNavigate();

  const recipeList = recipes?.data;

  return (
    <div className="home-view px-5">
      <Filter
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        filterValue={filter}
        onFilterChange={(newFilter) => setFilters(newFilter)}
        loading={loadingSearch}
        onFilterChangeFinal={(finalFilter) => setFilterDebounced(finalFilter)}
      />

      <div className="cards-container bg-white dark:bg-neutral-900 rounded-2xl mt-5 flex flex-col p-4 gap-4">
        {loadingRecipes ? (
          <Skeleton className="w-64 h-6" />
        ) : (
          <h1 className="text-black dark:text-white font-bold text-xl md:text-2xl">
            {t("common.title.heading")}
          </h1>
        )}

        {/* card */}

        <div
          className={`${loadingRecipes || recipeList?.length > 0 ? "columns-2" : "flex"}
         justify-center md:p-0 md:columns-3 lg:columns-4 items-start w-full space-y-4 md:space-y-5`}
        >
          {loadingRecipes && !recipeList ? (
            Array.from({ length: 12 }).map((_, i) => {
              return <CardLoading key={i} />;
            })
          ) : recipeList?.length > 0 ? (
            recipeList?.map((item) => {
              return (
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  itemId={item.id}
                  image={
                    item.thumbnail === "placeholder.png"
                      ? getAssetImage("food/placeholder.png")
                      : item.thumbnail
                  }
                  profile={item.recipe?.profile}
                  author={item.recipe?.username}
                  difficulty={item.difficulty}
                  time={item.time}
                  createdAt={item.createdAt}
                  onFavouriteSaved={favourites}
                  category={item.category?.name}
                  onCardClick={() => nav(`/recipes/detail/${item.id}`)}
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
        {recipes.totalPage > 1 && (
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

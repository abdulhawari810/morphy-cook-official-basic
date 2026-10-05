import { useAllFavourite } from "@/hooks/favourites/useAllFavourite.hooks";
import { useCountAllFavourite } from "@/hooks/favourites/useCountFavourite.hooks";
import { useDeleteFavourite } from "@/hooks/favourites/useDeleteFavourite.hooks";
import { useNavigate } from "react-router-dom";
import AnimateSpin from "@/components/animate.spin.component";
import NoDataFound from "@/components/handleError/NotFound";
import { useTranslation } from "react-i18next";
import { getAssetImage } from "@/utils/image.utils";
import CardLoading from "@/components/loading/card.loading";

export default function FavoritesView() {
  const { favourites, loadingFavourite } = useAllFavourite();
  const { count } = useCountAllFavourite();
  const { handleDeleteFavourite, loadingDeleteFavouriteId } =
    useDeleteFavourite();
  const nav = useNavigate();
  const { t } = useTranslation();

  const whislist = favourites;

  console.log(count);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-6">
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {t("common.favourite.title")} ({whislist?.length})
        </h1>
      </div>

      {/* CONTENT */}
      {loadingFavourite ? (
        <div className="bg-white dark:bg-neutral-900 hover:scale-102 transition-all! duration-300 rounded-2xl grid grid-cols-5 gap-5 shadow hover:shadow-lg overflow-hidden">
          {Array.from({ length: count ?? 12 }).map((_, i) => {
            return <CardLoading key={i} />;
          })}
        </div>
      ) : whislist.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(whislist) &&
            whislist.map((item) => {
              return (
                <div
                  key={item.favourite_recipe.id}
                  className="bg-white dark:bg-neutral-900 hover:scale-102 transition-all! duration-300 rounded-2xl shadow hover:shadow-lg overflow-hidden"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      item.favourite_recipe.thumbnail === "placeholder.png"
                        ? getAssetImage(`food/placeholder.png`)
                        : item.favourite_recipe.thumbnail
                    }
                    alt={item.favourite_recipe.title}
                    className="w-full h-40 object-cover"
                  />

                  {/* BODY */}
                  <div className="p-4">
                    <h2 className="font-semibold text-lg line-clamp-1">
                      {item.favourite_recipe.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.favourite_recipe.description}
                    </p>

                    {/* ACTION */}
                    <div className="mt-4 cursor-pointer flex justify-between items-center">
                      <button
                        className="text-sm cursor-pointer text-orange-500"
                        onClick={() => nav(`/recipes/detail/${item.recipeId}`)}
                      >
                        {t("common.favourite.button_detail.title")}
                      </button>

                      <button
                        onClick={() => handleDeleteFavourite(item.recipeId)}
                        className="cursor-pointer p-2"
                      >
                        {loadingDeleteFavouriteId === item.recipeId ? (
                          <AnimateSpin />
                        ) : (
                          <span className="text-red-500 text-sm">Hapus</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        /* EMPTY STATE */
        <NoDataFound
          title={t("common.no_data_found.favourite.empty.title")}
          subtitle={t("common.no_data_found.favourite.empty.subtitle")}
          bodyClass={
            "flex flex-col items-center justify-center mt-20 text-center"
          }
          thumbnailClass={"w-40 mb-4 opacity-70 rounded-4xl"}
          titleClass={"text-xl font-semibold"}
          subtitleClass={"text-gray-500 mt-2"}
        />
      )}
    </div>
  );
}

import { renderIcon } from "@/utils/icons.utils";
import { useAuth } from "@/hooks/auth/useAuth.hooks";
import { useReviewSummary } from "@/hooks/reviews/useReviews.hooks";
import AnimateSpin from "./animate.spin.component";
import ResponsiveImage from "./responsive.image.component";
import { useTranslation } from "react-i18next";

const Card = ({
  image,
  title,
  description,
  difficulty,
  time,
  badge,
  badgePosition,
  onCardClick,
  onFavouriteClick,
  onFavouriteSaved,
  onLoadingFavourite,
  onLoadingDelete,
  onEditClick,
  onDeleteClick,
  onAcceptClick,
  onDraftClick,
  onRejectClick,
  category,
  badgehidden,
  itemId,
  createdAt,
}) => {
  const { me } = useAuth();

  // Rating dinamis: Σ(bintang × jumlah) / total rating (1 desimal).
  // useReviewSummary di-cache per recipeId, jalan paralel untuk tiap kartu.
  const { summary, loadingSummary } = useReviewSummary(itemId);

  // Badge "Baru" kalau resep dibuat hari ini (tanggal lokal).
  const isNew = (() => {
    if (!createdAt) return false;
    const created = new Date(createdAt);
    if (Number.isNaN(created.getTime())) return false;
    const now = new Date();
    return (
      created.getFullYear() === now.getFullYear() &&
      created.getMonth() === now.getMonth() &&
      created.getDate() === now.getDate()
    );
  })();

  let saved = onFavouriteSaved?.find((f) => f.recipeId === itemId);

  const { t } = useTranslation();

  return (
    <div
      className="bg-white dark:bg-neutral-800 break-inside-avoid rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative group"
      onClick={onCardClick}
    >
      <div
        className={`absolute w-full flex items-center ${badge && onFavouriteClick ? "justify-between" : onFavouriteClick ? "justify-end" : ""} gap-2`}
      >
        {isNew && (
          <span className="absolute top-0 left-0 z-10 rounded-br-lg bg-green-500 px-2.5 py-1 text-xs font-bold text-white">
            {t("common.badge.new")}
          </span>
        )}
        {badge !== "Ditolak" && onEditClick && (
          <button
            className=" items-center z-10 p-2 bg-gray-900 hover:bg-orange-500 cursor-pointer rounded-br-lg justify-center text-white absolute top-0 left-0"
            onClick={onEditClick}
          >
            {renderIcon("SquarePen", { className: "w-6 h-6" })}
          </button>
        )}
        {badge === "Pending" ? (
          <div className="absolute w-fit gap-2 top-0 right-0 bg-gray-950/20 p-2 flex items-center justify-center">
            {onAcceptClick && (
              <button
                className=" flex items-center z-10 p-2 rounded-2xl bg-green-500 hover:bg-green-700 cursor-pointer rounded-bl-lg justify-center text-white"
                onClick={onAcceptClick}
              >
                {renderIcon("Check", { className: "w-6 h-6" })}
              </button>
            )}
            {onDraftClick && (
              <button
                className=" flex items-center z-10 p-2 rounded-2xl bg-amber-500 hover:bg-amber-700 cursor-pointer rounded-bl-lg justify-center text-white"
                onClick={onDraftClick}
              >
                {renderIcon("ClipboardPen", { className: "w-6 h-6" })}
              </button>
            )}
            {onRejectClick && (
              <button
                className=" flex items-center z-10 p-2 rounded-2xl bg-red-500 hover:bg-red-700 cursor-pointer rounded-bl-lg justify-center text-white"
                onClick={onRejectClick}
              >
                {renderIcon("X", { className: "w-6 h-6" })}
              </button>
            )}
          </div>
        ) : (
          badge === "Draft" && (
            <div className="absolute w-fit gap-2 top-0 right-0 bg-amber-500/20 p-2 flex items-center justify-center">
              {onAcceptClick && (
                <button
                  className=" flex items-center z-10 p-2 rounded-2xl rounded-bl-lg bg-green-500 hover:bg-green-700 cursor-pointer justify-center text-white"
                  onClick={onAcceptClick}
                >
                  {renderIcon("Check", { className: "w-6 h-6" })}
                </button>
              )}
              {onRejectClick && (
                <button
                  className=" flex items-center z-10 p-2 rounded-2xl rounded-bl-lg  bg-red-500 hover:bg-red-700 cursor-pointer justify-center text-white"
                  onClick={onRejectClick}
                >
                  {renderIcon("X", { className: "w-6 h-6" })}
                </button>
              )}
            </div>
          )
        )}
        {badge && (
          <div
            className={`flex items-center ${badgePosition ? "relative left-0" : ""} gap-2 w-fit h-fit z-10 p-2 ${badge === t("dashboard.admin.recipe.filter_menu.pending") ? "bg-orange-500" : badge === t("dashboard.admin.recipe.filter_menu.accept") ? "bg-green-500" : badge === t("dashboard.admin.recipe.filter_menu.draft") ? "bg-amber-500" : "bg-red-500"} cursor-pointer  justify-center text-white absolute top-0 right-12 ${badge === t("dashboard.admin.recipe.filter_menu.reject") ? "rounded-br-lg" : "rounded-b-lg"}`}
          >
            {badge === t("dashboard.admin.recipe.filter_menu.pending")
              ? renderIcon("Clock", { className: "w-5 h-5" })
              : badge === t("dashboard.admin.recipe.filter_menu.accept")
                ? renderIcon("Check", { className: "w-5 h-5" })
                : badge === t("dashboard.admin.recipe.filter_menu.draft")
                  ? renderIcon("ClipboardPen", { className: "w-5 h-5" })
                  : badge === t("dashboard.admin.recipe.filter_menu.reject")
                    ? renderIcon("X", { className: "w-5 h-5" })
                    : null}
            <span className={`${badgehidden ? "hidden" : "md:flex hidden"}`}>
              {badge}
            </span>
          </div>
        )}
        {onDeleteClick && (
          <button
            className="absolute flex items-center z-10 p-2 bg-red-500 hover:bg-red-700 cursor-pointer rounded-bl-lg justify-center text-white top-0 right-0"
            onClick={onDeleteClick}
          >
            {onLoadingDelete ? (
              <AnimateSpin />
            ) : (
              <div>{renderIcon("Trash", { className: "w-6 h-6" })}</div>
            )}
          </button>
        )}
        {me && onFavouriteClick && (
          <button
            className={`flex items-center group z-20 bg-gray-900 cursor-pointer rounded-bl-lg justify-center top-0 right-0 ${saved ? " text-orange-500" : " text-white  hover:text-orange-500"}`}
            onClick={onFavouriteClick}
          >
            {onLoadingFavourite ? (
              <div className="p-2">
                <AnimateSpin />
              </div>
            ) : (
              <div className="p-2">
                {renderIcon("Heart", {
                  className: `w-6 h-6 ${saved ? "fill-orange-500" : "group-hover:fill-orange-500"}`,
                })}
              </div>
            )}
          </button>
        )}
      </div>
      <ResponsiveImage variant="card" src={image} alt={title} />

      <div className="p-2">
        <h3 className="text-xs md:text-sm font-medium text-gray-500 dark:text-orange-200 mb-2">
          {category}
        </h3>
        <h3 className="text-sm md:text-md md:mb-2 lg:text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-orange-200 text-sm mb-2 md:mb-4 truncate">
          {description}
        </p>
        <div className="flex items-center flex-wrap gap-2">
          <span
            className={`outline p-1 rounded-lg text-xs md:text-sm lg:text-md ${time <= 10 ? "outline-1 outline-green-500 bg-green-500/3  text-green-500" : time <= 30 ? "outline-1 outline-orange-500 bg-orange-500/3  text-orange-500" : "outline-1 outline-red-500 bg-red-500/3  text-red-500"}`}
          >
            {time} Minutes
          </span>
          <span
            className={`outline p-1 rounded-lg text-xs md:text-sm lg:text-md ${difficulty.toLowerCase() === "easy" ? "outline-1 outline-green-500 bg-green-500/3  text-green-500" : difficulty.toLowerCase() === "medium" ? "outline-1 outline-orange-500 bg-orange-500/3  text-orange-500" : "outline-1 outline-red-500 bg-red-500/3  text-red-500"}`}
          >
            {difficulty}
          </span>
        </div>
        <div
          className="w-full mt-5 gap-1 pr-2 flex items-center justify-end"
          title={
            summary.totalReviews > 0
              ? `${summary.averageRating} dari ${summary.totalReviews} ulasan`
              : t("detail.review.empty")
          }
        >
          {renderIcon("Star", {
            className: `w-4 h-4 ${summary.totalReviews > 0 ? "text-orange-500 fill-orange-500" : "text-neutral-300 dark:text-neutral-600"}`,
          })}
          <span className="text-sm font-bold text-gray-900 dark:text-orange-500 lg:text-md">
            {loadingSummary
              ? "…"
              : summary.totalReviews > 0
                ? `${summary.averageRating} (${summary.totalReviews})`
                : "0"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;

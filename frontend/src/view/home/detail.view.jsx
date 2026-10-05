import { useParams } from "react-router-dom";
import { useSingleRecipes } from "@/hooks/recipes/useSingleRecipes.hooks";
import { renderIcon } from "@/utils/icons.utils";
import { getAssetImage } from "@/utils/image.utils";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewSection from "@/components/reviews/ReviewSection";
import ResponsiveImage from "@/components/responsive.image.component";
import { useTranslation } from "react-i18next";

//_ backend sometimes returns JSON string, sometimes real array
const toList = (value) => {
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function DetailView() {
  const { id } = useParams();
  const { recipe, loadingSingleRecipes } = useSingleRecipes(id);
  const { t } = useTranslation();

  const instructions = toList(recipe?.instructions);
  const ingredients = toList(recipe?.ingredients);

  return (
    <main className="flex px-5">
      <div className="w-full mx-auto p-10 space-y-6 bg-white dark:bg-neutral-900 rounded-2xl">
        {loadingSingleRecipes ? (
          <div className="grid grid-cols-1 items-start gap-5">
            <div className="flex items-start gap-5">
              <Skeleton className="aspect-[4/3] w-full rounded-2xl sm:aspect-[16/10] md:aspect-square md:w-64 lg:w-80 xl:w-96 md:shrink-0" />
              <div className="space-y-2 md:space-y-6">
                <Skeleton className="w-20 h-5 rounded-lg sm:h-44 md:w-64 md:h-8" />
                <div className="flex items-center gap-4">
                  <Skeleton className="w-20 h-5 rounded-full sm:h-44 md:w-32 md:h-10" />
                  <Skeleton className="w-20 h-5 rounded-full sm:h-44 md:w-32 md:h-10" />
                  <Skeleton className="w-20 h-5 rounded-full sm:h-44 md:w-32 md:h-10" />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <Skeleton className="w-full h-5 rounded-lg md:h-4" />
                  <Skeleton className="w-full h-5 rounded-lg md:h-4" />
                  <Skeleton className="w-full h-5 rounded-lg md:h-4" />
                  <Skeleton className="w-3/4 h-5 rounded-lg md:h-4" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full flex flex-col gap-y-4">
                <Skeleton className="w-20 h-5 rounded-lg sm:h-44 md:w-40 md:h-8" />
                <Skeleton className="w-full h-5 rounded-lg sm:h-44 md:h-72" />
              </div>
              <div className="w-full flex flex-col gap-y-4">
                <Skeleton className="w-20 h-5 rounded-lg sm:h-44 md:w-40 md:h-8" />
                <Skeleton className="w-full h-5 rounded-lg sm:h-44 md:h-72" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-5">
            {/* Mobile: gambar full-width di atas. md+: gambar kolom kiri tetap, teks kanan fleksibel. */}
            <div className="grid grid-cols-1 gap-5 md:flex md:items-start">
              <ResponsiveImage
                variant="hero"
                eager
                src={
                  recipe?.thumbnail === "placeholder.png"
                    ? getAssetImage("food/placeholder.png")
                    : recipe?.thumbnail
                }
                alt={recipe?.slug}
              />
              {/* Title */}
              <div className="min-w-0 flex-1 space-y-2 md:space-y-6">
                <h1 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">
                  {recipe?.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span
                    className={`flex items-center justify-center p-2 rounded-2xl outline ${recipe?.time <= 10 ? "text-green-500 bg-green-500/3 outline-green-500" : recipe?.time <= 30 ? "text-orange-500 bg-orange-500/3 outline-orange-500" : "text-red-500 bg-red-500/3 outline-red-500"} gap-2`}
                  >
                    {renderIcon("Clock3", { className: "w-5 h-5" })}{" "}
                    {recipe?.time} {t("detail.minutes")}
                  </span>
                  <span
                    className={`flex items-center justify-center p-2 rounded-2xl outline ${recipe?.difficulty.toLowerCase() === "easy" ? "text-green-500 bg-green-500/3 outline-green-500" : recipe?.difficulty.toLowerCase() === "medium" ? "text-orange-500 bg-orange-500/3 outline-orange-500" : "text-red-500 bg-red-500/3 outline-red-500"} gap-2`}
                  >
                    {renderIcon("Flame", { className: "w-5 h-5" })}{" "}
                    {recipe?.difficulty}
                  </span>
                  <span className="flex items-center justify-center p-2 outline rounded-2xl text-orange-500 bg-orange-500/3 outline-orange-500 gap-2">
                    {renderIcon("Tags", { className: "w-5 h-5 " })}{" "}
                    {recipe?.category?.name}
                  </span>
                </div>
                {/* Description */}
                <p className="my-5 w-full max-w-2xl leading-relaxed text-gray-700 dark:text-orange-200/70">
                  {recipe?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Ingredients */}
              <div className="w-full ">
                <h2 className="text-lg font-bold mb-2">
                  {t("detail.ingredients")}
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-orange-200/70 space-y-1">
                  {Array.isArray(ingredients) &&
                    ingredients.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="w-full">
                <h2 className="text-lg font-bold mb-2">{t("detail.steps")}</h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-2 dark:text-orange-200/70">
                  {Array.isArray(instructions) &&
                    instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                </ol>
              </div>
            </div>

            <ReviewSection recipeId={id} />
          </div>
        )}
      </div>
    </main>
  );
}

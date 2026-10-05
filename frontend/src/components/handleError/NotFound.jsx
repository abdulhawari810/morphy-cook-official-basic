import notFound from "@/assets/illustration/empty_data.png";
import searchNotFound from "@/assets/illustration/search_not_found.png";

import { cn } from "@/lib/utils";

export default function NoDataFound({
  title,
  subtitle,
  thumbnail,
  titleClass,
  subtitleClass,
  bodyClass,
  thumbnailClass,
  type = "no-data",
  containerClass,
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center p-3 justify-center",
        containerClass,
      )}
    >
      <div className={cn("w-full flex items-center justify-center", bodyClass)}>
        {type === "search" ? (
          <img
            src={thumbnail || searchNotFound}
            alt={title}
            className={cn(
              "md:w-40 md:h-40  w-32 h-32 object-contain",
              thumbnailClass,
            )}
          />
        ) : (
          <img
            src={thumbnail || notFound}
            alt={title}
            className={cn(
              "md:w-40 md:h-40  w-32 h-32 object-contain",
              thumbnailClass,
            )}
          />
        )}
      </div>

      <h2 className={cn("text-lg md:text-xl font-semibold", titleClass)}>
        {title}
      </h2>

      <p
        className={cn(
          "text-gray-500 text-center dark:text-orange-200 mt-4 md:text-xl text-md",
          subtitleClass,
        )}
      >
        {subtitle}
      </p>
    </div>
  );
}

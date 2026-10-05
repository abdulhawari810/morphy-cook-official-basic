import { useState } from "react";
import { useTranslation } from "react-i18next";
import ResponsiveImage from "./responsive.image.component";

const FALLBACK_IMAGE = "https://picsum.photos/600/400";

export default function Carousel({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  const total = images.length;

  if (!total) return null;

  const prev = () =>
    setCurrent((i) => (i === 0 ? total - 1 : i - 1));

  const next = () => setCurrent((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full">
      <ResponsiveImage
        variant="banner"
        eager
        src={images[current]}
        alt={t("carousel.recipe_image")}
        fallbackSrc={FALLBACK_IMAGE}
      />

      <button
        type="button"
        onClick={prev}
        aria-label={t("carousel.previous")}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={next}
        aria-label={t("carousel.next")}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((image, i) => (
          <button
            key={image ?? i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={t("carousel.go_to", { index: i + 1 })}
            aria-current={i === current}
            className={`w-2.5 h-2.5 rounded-full ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
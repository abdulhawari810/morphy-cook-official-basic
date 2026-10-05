import { useState } from "react";
import { cn } from "@/lib/utils";
import { getAssetImage } from "@/utils/image.utils";

const PLACEHOLDER = getAssetImage("food/placeholder.png");

// Satu komponen gambar untuk semua ukuran layar:
// mobile -> tablet -> laptop -> PC diatur lewat variant,
// bukan class acak per halaman.
const VARIANTS = {
  // Halaman detail: full-width di HP, kolom tetap dari md ke atas
  hero: {
    wrapper:
      "relative w-full overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800 aspect-[4/3] sm:aspect-[16/10] md:aspect-square md:w-64 md:shrink-0 lg:w-80 xl:w-96",
    img: "h-full w-full object-cover object-center",
  },
  // Kartu resep: rasio konsisten di semua grid
  card: {
    wrapper:
      "relative w-full overflow-hidden aspect-[16/10] bg-neutral-200 dark:bg-neutral-800",
    img: "h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105",
  },
  // Carousel/banner: melebar mengikuti layar
  banner: {
    wrapper:
      "relative w-full overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800 aspect-[16/10] sm:aspect-[21/9] lg:aspect-[21/8]",
    img: "h-full w-full object-cover object-center",
  },
  // Avatar: selalu kotak, membesar bertahap
  avatar: {
    wrapper:
      "relative shrink-0 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800 h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14",
    img: "h-full w-full object-cover object-center",
  },
};

export default function ResponsiveImage({
  src,
  alt = "",
  variant = "card",
  fallbackSrc,
  className,
  imgClassName,
  eager = false,
  ...props
}) {
  const [failed, setFailed] = useState(false);
  const config = VARIANTS[variant] ?? VARIANTS.card;
  const fallback = fallbackSrc ?? PLACEHOLDER;

  const currentSrc = failed || !src ? fallback : src;

  return (
    <div className={cn(config.wrapper, className)}>
      <img
        src={currentSrc}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onError={() => setFailed(true)}
        className={cn(config.img, imgClassName)}
        {...props}
      />
    </div>
  );
}

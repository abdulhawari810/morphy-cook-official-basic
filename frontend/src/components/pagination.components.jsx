import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildPageItems, clampPage } from "@/utils/pagination";

/**
 * Pagination: `‹ Back  [1] 2 3 … 12  Next ›`
 *
 * - Nomor halaman dalam kotak; yang aktif terisi, lainnya muda
 * - Elipsis menggantikan halaman yang disembunyikan
 * - Nomor terakhir jadi link teks (aksen) supaya kelihatan berbeda dari
 *   nomor di dalam jendela, sekaligus mudah diklik untuk lompat ke akhir
 */
export default function Pagination({
  currentPage,
  totalPage,
  onPageChange,
  maxVisible = 5,
}) {
  const { t } = useTranslation();

  //_ total = jumlah halaman apa adanya (jangan di-clamp ke 1,
  //_ clampPage(totalPage, 1) selalu menghasilkan 1 karena argumen
  //_ kedua dipakai sebagai batas atas).
  const rawTotal = Math.trunc(Number(totalPage));
  const total = Number.isFinite(rawTotal) ? Math.max(rawTotal, 0) : 0;
  const page = total >= 1 ? clampPage(currentPage, total) : 1;

  if (total < 1) return null;

  const items = buildPageItems(page, total, maxVisible);
  const isFirst = page <= 1;
  const isLast = page >= total;

  const goTo = (target) => {
    const next = clampPage(target, total);

    if (next === page) return;

    onPageChange?.(next);
  };

  return (
    <nav
      aria-label={t("common.pagination.label")}
      className="flex justify-center mt-6"
    >
      <ul className="flex items-center gap-1.5 rounded-2xl bg-white px-4 py-2.5 shadow-sm dark:bg-neutral-900">
        <li>
          <button
            type="button"
            disabled={isFirst}
            onClick={() => goTo(page - 1)}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
              isFirst
                ? "cursor-not-allowed text-neutral-300 dark:text-neutral-700"
                : "text-orange-500 hover:bg-orange-500/10",
            )}
          >
            <ChevronLeft className="h-4 w-4" />

            <span className="hidden sm:inline">
              {t("common.pagination.prev")}
            </span>
          </button>
        </li>

        {items.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <li
                key={`gap-${index}`}
                aria-hidden="true"
                className="px-1 text-sm text-neutral-400 dark:text-neutral-600"
              >
                …
              </li>
            );
          }

          const isActive = item === page;

          //_ nomor terakhir dipisah gaya: jadi tautan lompat ke akhir
          const isLastLink = item === total && total > 1 && !isActive;

          const className = isActive
            ? "flex h-8 min-w-8 items-center justify-center rounded-lg bg-orange-500 px-2 text-sm font-semibold text-white"
            : isLastLink
              ? "flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-500/10"
              : "flex h-8 min-w-8 items-center justify-center rounded-lg bg-orange-500/10 px-2 text-sm font-medium text-neutral-600 transition hover:bg-orange-500/20 dark:text-neutral-300";

          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => goTo(item)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`${t("common.pagination.page")} ${item}`}
                className={cn(
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                  className,
                )}
              >
                {item}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            disabled={isLast}
            onClick={() => goTo(page + 1)}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
              isLast
                ? "cursor-not-allowed text-neutral-300 dark:text-neutral-700"
                : "text-orange-500 hover:bg-orange-500/10",
            )}
          >
            <span className="hidden sm:inline">
              {t("common.pagination.next")}
            </span>

            <ChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
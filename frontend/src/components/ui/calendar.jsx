import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Calendar (shadcn/ui di atas `react-day-picker`).
 *
 * Styling memakai palet aplikasi (orange + neutral), bukan token
 * shadcn default, supaya menyatu dengan form dan komponen lain.
 */
const CALENDAR_CLASSES = {
  root: "w-full",
  months: "flex flex-col gap-4 sm:flex-row",
  month: "flex flex-col gap-4",
  month_caption: "flex items-center justify-between px-1",
  caption_label:
    "text-sm font-semibold text-neutral-800 dark:text-neutral-100",
  nav: "flex items-center gap-1",
  button_previous:
    "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:bg-orange-500/10 hover:text-orange-500 dark:border-neutral-700 dark:text-neutral-300",
  button_next:
    "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:bg-orange-500/10 hover:text-orange-500 dark:border-neutral-700 dark:text-neutral-300",
  month_grid: "w-full border-collapse",
  weekdays: "flex",
  weekday:
    "w-8 pb-1 text-[0.65rem] font-normal uppercase text-neutral-400 dark:text-neutral-500",
  week: "flex w-full mt-1",
  day: "h-8 w-8 p-0 text-center text-sm",
  day_button:
    "h-8 w-8 rounded-lg font-normal transition hover:bg-orange-500/10 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-30 aria-selected:bg-orange-500 aria-selected:text-white aria-selected:hover:bg-orange-500 dark:aria-selected:text-black",
  today:
    "font-semibold text-orange-500 underline decoration-orange-500/40 underline-offset-4",
  outside: "text-neutral-300 dark:text-neutral-600",
  disabled: "text-neutral-300 dark:text-neutral-600",
  hidden: "invisible",
  dropdown:
    "w-full rounded-lg border border-neutral-200 bg-white px-2 py-1 text-sm text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
};

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{ ...CALENDAR_CLASSES, ...classNames }}
      components={{
        Chevron: ({ className: chevronClass, orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("h-4 w-4", chevronClass)} />
          ) : (
            <ChevronRight className={cn("h-4 w-4", chevronClass)} />
          ),
      }}
      {...props}
    />
  );
};

export default Calendar;
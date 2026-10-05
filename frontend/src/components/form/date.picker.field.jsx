import { forwardRef, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Calendar from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { INPUT_BASE, LABEL_BASE, ERROR_TEXT } from "@/components/form/field";
import { useTranslation } from "react-i18next";
import {
  toDateInputValue,
  fromDateInputValue,
  today,
} from "@/utils/date";

const FORMAT_LOCALE = { id: "id-ID", en: "en-US" };

/**
 * Date picker (calendar shadcn) untuk field form.
 *
 * Nilai yang dipegang tetap string `YYYY-MM-DD` — sama dengan
 * `<input type="date">` — supaya zod, payload ke server, dan
 * `defaultValues` tidak perlu berubah.
 */
const DatePickerField = forwardRef(
  ({ label, value, onChange, error, maxDate, placeholder, id, name }, ref) => {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const selected = fromDateInputValue(value);
    const locale = FORMAT_LOCALE[i18n.language] ?? FORMAT_LOCALE.id;

    const handleSelect = (date) => {
      if (!date) return;

      onChange(toDateInputValue(date));
      setOpen(false);
    };

    return (
      <div ref={ref} className="w-full">
        {label && (
          <label htmlFor={id || name} className={LABEL_BASE}>
            {label}
          </label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <button
                type="button"
                id={id || name}
                aria-invalid={error ? "true" : undefined}
                aria-label={placeholder ?? label}
                className={cn(
                  INPUT_BASE,
                  "flex items-center justify-between gap-2 text-left font-normal",
                  !selected && "text-neutral-400 dark:text-neutral-500",
                  error && "ring-red-500",
                )}
              >
                <span
                  className={cn(
                    "truncate",
                    selected && "text-neutral-900 dark:text-neutral-100",
                  )}
                >
                  {selected
                    ? new Intl.DateTimeFormat(locale, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(selected)
                    : (placeholder ?? label)}
                </span>

                <CalendarIcon className="h-4 w-4 shrink-0 opacity-50" />
              </button>
            }
          />

          <PopoverContent
            align="start"
            className="w-auto rounded-2xl border border-neutral-200 bg-white p-0 shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            <Calendar
              mode="single"
              locale={locale}
              selected={selected}
              defaultMonth={selected ?? undefined}
              max={maxDate}
              disabled={maxDate ? { after: maxDate } : undefined}
              onSelect={handleSelect}
            />

            <div className="flex items-center justify-between border-t border-neutral-200 px-3 py-2 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="text-xs font-medium text-neutral-500 transition hover:text-red-500"
              >
                {t("profile.birth_date_clear")}
              </button>

              <button
                type="button"
                onClick={() => handleSelect(today())}
                className="text-xs font-medium text-orange-500 transition hover:underline"
              >
                {t("profile.birth_date_today")}
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {error && (
          <p role="alert" className={ERROR_TEXT}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

DatePickerField.displayName = "DatePickerField";

export default DatePickerField;
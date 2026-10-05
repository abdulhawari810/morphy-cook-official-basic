import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { INPUT_BASE } from "@/components/form/field";
import { useArrayFieldError } from "@/components/form/useFieldError";

/**
 * Daftar input dinamis (ingredients, instructions, alergi_food).
 *
 * Dipakai `useFieldArray` dari react-hook-form supaya error per
 * item bisa ditunjuk (`ingredients.2`) dan tombol hapus aman
 * saat list bergeser.
 */
const DynamicList = ({
  name,
  label,
  addLabel,
  placeholder,
  rows = 2,
  maxItems = 30,
  itemClassName = "flex gap-2",
}) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  const {
    fields,
    append,
    remove,
    update,
  } = useFieldArray({ control, name });

  const error = useArrayFieldError(name);

  const isEmpty = fields.length === 0;

  return (
    <div className="w-full space-y-3 md:col-span-2 xl:col-span-4">
      <div>
        <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
          {label}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {t("common.form_list.total_item")}: {fields.length}
        </p>
      </div>

      <div className="space-y-2">
        {isEmpty && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t("common.form_list.empty")}
          </p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className={itemClassName}>
            <div className="flex-1">
              <textarea
                rows={rows}
                placeholder={placeholder}
                defaultValue={field.value ?? ""}
                onBlur={(e) => update(index, e.target.value)}
                aria-label={`${label} ${index + 1}`}
                aria-invalid={error ? "true" : undefined}
                className={cn(INPUT_BASE, "py-3", error && "ring-red-500")}
              />
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              disabled={isEmpty}
              aria-label={t("common.form_list.remove_item", { index: index + 1 })}
              className="shrink-0 h-12 w-12 rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 disabled:opacity-40 dark:border-red-500/30 dark:hover:bg-red-500/10"
            >
              <X className="mx-auto w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={() => append("")}
        disabled={fields.length >= maxItems}
        className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="mr-1 inline-block w-4 h-4" />
        {addLabel ?? t("common.add")}
      </button>
    </div>
  );
};

export default DynamicList;
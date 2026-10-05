import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import RHFForm from "@/components/form/rhf.form";
import {
  TextField,
  PasswordField,
  SelectField,
  TextAreaField,
} from "@/components/form/field";
import { useFieldError } from "@/components/form/useFieldError";
import DynamicList from "@/components/form/dynamic.list";
import FileUploadField from "@/components/form/file.upload.field";
import { toArrayMeta } from "@/utils/formSchema";

const GENERIC_LIST_FIELD = "ingredients";

/**
 * Renderer satu field.
 *
 * Dipisah jadi komponen sendiri karena `useFieldError` adalah hook —
 * tidak boleh dipanggil di dalam loop `.map()`.
 */
const FieldRenderer = ({ field }) => {
  const { register, control } = useFormContext();
  const { t } = useTranslation();
  const error = useFieldError(field.name);

  if (field.type === "multi-text") {
    return (
      <DynamicList
        name={field.name}
        label={field.label}
        addLabel={`+ ${t("common.add")} ${field.label}`}
        placeholder={field.placeholder}
        rows={field.rows ?? 2}
      />
    );
  }

  if (field.type === "file") {
    return (
      <FileUploadField name={field.name} label={field.label} />
    );
  }

  if (field.type === "password") {
    return (
      <PasswordField
        label={field.label}
        error={error}
        autoComplete={field.autoComplete}
        {...register(field.name)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <SelectField
        label={field.label}
        error={error}
        options={field.options ?? []}
        placeholder={field.placeholder}
        {...register(field.name)}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <TextAreaField
        label={field.label}
        error={error}
        placeholder={field.placeholder}
        {...register(field.name)}
      />
    );
  }

  //_ select berbasis component controlled (mis. SelectSkill dari base-ui)
  if (field.type === "custom") {
    return (
      <Controller
        name={field.name}
        control={control}
        render={({ field: controlled }) =>
          field.render({
            value: controlled.value,
            onChange: controlled.onChange,
            error,
          })
        }
      />
    );
  }

  return (
    <TextField
      type={field.type === "number" ? "number" : (field.type ?? "text")}
      label={field.label}
      error={error}
      placeholder={field.placeholder}
      {...register(field.name)}
    />
  );
};

/**
 * Form generik berbasis Field Definition.
 *
 * Skema zod tetap sumber kebenaran validasi; `fields` hanya menentukan
 * tampilan + label. Daftar input dinamis ditangani `DynamicList`.
 */
const FormComponent = ({
  initialData,
  showForm,
  fields = [],
  defaultForm = {},
  onClose,
  onSubmit,
  loadingState,
  title,
  schema,
}) => {
  if (!showForm) return null;

  //_ validasi panjang array hanya relevan bila form punya field list
  const listMeta = toArrayMeta(schema, GENERIC_LIST_FIELD);

  return (
    <main className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-3 sm:p-5 lg:p-8">
      <RHFForm
        key={`${initialData?.id ?? "create"}`}
        schema={schema}
        defaultValues={
          initialData ? { ...defaultForm, ...initialData } : defaultForm
        }
        onSubmit={onSubmit}
        maxListItems={listMeta.max}
        className="flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-neutral-950"
      >
        <FormHeader title={initialData?.title || title} />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {fields.map((field) => (
              <FieldRenderer key={field.name} field={field} />
            ))}
          </div>
        </div>

        <FormFooter
          onClose={onClose}
          loadingState={loadingState}
          title={title}
        />
      </RHFForm>
    </main>
  );
};

const FormHeader = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className="border-b border-neutral-200 px-4 py-4 sm:px-6 dark:border-neutral-800">
      <h1 className="text-lg font-bold text-neutral-900 sm:text-xl dark:text-neutral-100">
        {title}
      </h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        {t("dashboard.admin.users.form.subtitle")}
      </p>
    </div>
  );
};

const FormFooter = ({ onClose, loadingState, title }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 bg-white px-4 py-4 sm:flex-row sm:justify-end sm:px-6 dark:border-neutral-800 dark:bg-neutral-950">
      <button
        type="button"
        onClick={onClose}
        className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
      >
        {t("common.cancel")}
      </button>

      <button
        type="submit"
        disabled={loadingState}
        className="flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
      >
        {loadingState ? (
          <span>{t("common.button_loading.loading")}</span>
        ) : (
          <span>{title}</span>
        )}
      </button>
    </div>
  );
};

export default FormComponent;
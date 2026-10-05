import { useForm, FormProvider, Form as HookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/errorMessage";

/**
 * `<form>` milik react-hook-form + zodResolver.
 *
 * Semua form di aplikasi ini melewati komponen ini supaya
 * perilaku submit konsisten:
 * - cegah navigasi saat `isSubmitting`
 * - batasi 1x submit (`isSubmitting`)
 * - error dari server (mis. email sudah terdaftar) ditampilkan
 *   lewat `setError` pemanggil, atau fallback ke toast
 */
const RHFForm = ({
  onSubmit,
  schema,
  defaultValues,
  children,
  onInvalid,
  serverError,
  className,
  id,
  ...options
}) => {
  const { t } = useTranslation();

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    ...options,
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onValid = async (values) => {
    try {
      //_ `false` berarti "jangan tutup form", dipakai form resep
      const result = await onSubmit(values, { setError, reset });

      return result;
    } catch (error) {
      //_ error server: tampilkan inline bila ada nama field-nya
      const field = error?.field;

      if (field) {
        setError(field, {
          type: "server",
          message: getErrorMessage(
            error,
            t("validation.invalid_value"),
          ),
        });

        return false;
      }

      toast.error(
        getErrorMessage(error, t("validation.invalid_value")),
      );

      return false;
    }
  };

  return (
    <FormProvider {...methods}>
      <HookForm
        id={id}
        noValidate
        className={className}
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        {serverError && (
          <p role="alert" className="mb-3 text-sm text-red-500">
            {serverError}
          </p>
        )}

        {typeof children === "function" ? children(isSubmitting) : children}
      </HookForm>
    </FormProvider>
  );
};

export default RHFForm;
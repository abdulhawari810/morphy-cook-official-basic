import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useFieldError } from "@/components/form/useFieldError";

const MAX_SIZE_IN_BYTES = 2 * 1024 * 1024;
const ACCEPTED_TYPES = "image/png,image/jpeg,image/jpg,image/webp";

/**
 * Upload gambar (base64) yang terhubung ke react-hook-form.
 *
 * Nilai disimpan sebagai data URL, sama seperti perilaku lama.
 */
const FileUploadField = ({ name, label }) => {
  const { t } = useTranslation();
  const { setValue, watch, getValues } = useFormContext();
  const fileInputRef = useRef(null);

  const value = watch(name);
  const error = useFieldError(name);

  const readAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const processFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(t("handleMessage.upload.invalid_type"));
      return;
    }

    if (file.size > MAX_SIZE_IN_BYTES) {
      toast.error(t("handleMessage.upload.too_large"));
      return;
    }

    const base64 = await readAsDataURL(file);

    setValue(name, base64, { shouldDirty: true, shouldValidate: true });
  };

  const handleRemove = () => {
    setValue(name, "", { shouldDirty: true, shouldValidate: true });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full space-y-3 md:col-span-2 xl:col-span-4">
      <p className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-200">
        {label}
      </p>

      <div className="flex flex-col items-center justify-center gap-4">
        {value ? (
          <div className="relative w-full max-w-xs">
            <img
              src={value}
              alt={t("upload.preview")}
              className="w-full h-48 object-cover rounded-xl border border-neutral-200 dark:border-neutral-800"
            />

            <button
              type="button"
              onClick={handleRemove}
              aria-label={t("upload.remove")}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
            >
              <XIcon />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "w-full max-w-xs h-48 border-2 border-dashed rounded-xl",
              "flex flex-col items-center justify-center gap-2 cursor-pointer transition",
              "border-neutral-300 dark:border-neutral-700",
              "hover:border-orange-500 hover:bg-orange-500/5",
            )}
          >
            <ImageIcon />

            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {t("upload.dropzone.hint")}
            </span>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              {t("upload.dropzone.formats")}
            </span>
          </button>
        )}

        {value && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-xs h-12 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            {t("upload.replace")}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          onChange={(e) => processFile(e.target.files?.[0])}
          className="hidden"
        />
      </div>

      {error && (
        <p role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}

      {/* Nilai tetap ikut submit walau input file-nya hidden */}
      <input type="hidden" name={name} value={getValues(name) || ""} readOnly />
    </div>
  );
};

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const ImageIcon = () => (
  <svg
    className="w-10 h-10 text-neutral-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export default FileUploadField;
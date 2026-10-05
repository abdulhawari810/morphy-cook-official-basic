import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const MAX_SIZE_IN_BYTES = 2 * 1024 * 1024;
const ACCEPTED_TYPES = "image/png,image/jpeg,image/jpg,image/webp";

const FileUploadField = ({ field, value, onChange }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useTranslation();

  const readAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error(t("handleMessage.upload.invalid_type"));
      return false;
    }

    if (file.size > MAX_SIZE_IN_BYTES) {
      toast.error(t("handleMessage.upload.too_large"));
      return false;
    }

    return true;
  };

  const processFile = async (file) => {
    if (!validateFile(file)) return;

    const base64 = await readAsDataURL(file);

    onChange(field.name, base64);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await processFile(file);
  };

  const handleRemoveFile = () => {
    onChange(field.name, "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    await processFile(file);
  };

  const labelClass =
    "mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-200";

  return (
    <div className="w-full space-y-3 md:col-span-2 xl:col-span-4">
      <label className={labelClass}>{field.label}</label>

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
              onClick={handleRemoveFile}
              aria-label={t("upload.remove")}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
            >
              ✕
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition",
              isDragging
                ? "border-orange-500 bg-orange-500/10"
                : "border-neutral-300 dark:border-neutral-700 hover:border-orange-500 hover:bg-orange-500/5",
            )}
          >
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
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t("upload.dropzone.hint")}
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              {t("upload.dropzone.formats")}
            </p>
          </div>
        )}

        {value && (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-xs"
          >
            {t("upload.replace")}
          </Button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FileUploadField;

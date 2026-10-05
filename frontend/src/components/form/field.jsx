import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export const INPUT_BASE =
  "w-full px-4 h-12 rounded-lg ring ring-neutral-300 dark:ring-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:placeholder:text-neutral-500";

export const ERROR_TEXT = "mt-1 text-xs text-red-500";

export const LABEL_BASE =
  "block text-sm font-medium text-gray-700 dark:text-neutral-400 mb-2";

/**
 * Label + input + pesan error.
 *
 * `error` Apartment berupa string dari react-hook-form, sudah diterjemahkan
 * oleh pemanggil (lihat `translateIssues`).
 */
const Field = ({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
  labelClassName,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={htmlFor} className={cn(LABEL_BASE, labelClassName)}>
          {label}
        </label>
      )}

      {children}

      {error && (
        <p role="alert" className={ERROR_TEXT}>
          {error}
        </p>
      )}

      {!error && hint && (
        <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
          {hint}
        </p>
      )}
    </div>
  );
};

/** Input teks biasa dengan register dari react-hook-form. */
export const TextField = forwardRef(
  ({ label, error, hint, className, inputClassName, ...props }, ref) => (
    <Field
      label={label}
      htmlFor={props.id || props.name}
      error={error}
      hint={hint}
      className={className}
    >
      <input
        ref={ref}
        id={props.id || props.name}
        aria-invalid={error ? "true" : undefined}
        className={cn(INPUT_BASE, error && "ring-red-500", inputClassName)}
        {...props}
      />
    </Field>
  ),
);
TextField.displayName = "TextField";

/** Input password dengan tombol show/hide. */
export const PasswordField = forwardRef(
  ({ label, error, hint, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <Field
        label={label}
        htmlFor={props.id || props.name}
        error={error}
        hint={hint}
        className={className}
      >
        <div className="relative">
          <input
            ref={ref}
            id={props.id || props.name}
            type={visible ? "text" : "password"}
            aria-invalid={error ? "true" : undefined}
            className={cn(INPUT_BASE, "pr-11", error && "ring-red-500")}
            {...props}
          />

          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition dark:text-neutral-500 dark:hover:text-orange-500"
          >
            {visible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </Field>
    );
  },
);
PasswordField.displayName = "PasswordField";

/** Native `<select>`. */
export const SelectField = forwardRef(
  ({ label, error, options = [], placeholder, className, ...props }, ref) => (
    <Field
      label={label}
      htmlFor={props.id || props.name}
      error={error}
      className={className}
    >
      <select
        ref={ref}
        id={props.id || props.name}
        aria-invalid={error ? "true" : undefined}
        className={cn(INPUT_BASE, error && "ring-red-500")}
        {...props}
      >
        <option value="">{placeholder ?? label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  ),
);
SelectField.displayName = "SelectField";

/** Area teks. */
export const TextAreaField = forwardRef(
  ({ label, error, className, ...props }, ref) => (
    <Field
      label={label}
      htmlFor={props.id || props.name}
      error={error}
      className={className}
    >
      <textarea
        ref={ref}
        id={props.id || props.name}
        aria-invalid={error ? "true" : undefined}
        className={cn(INPUT_BASE, "h-32 py-3", error && "ring-red-500")}
        {...props}
      />
    </Field>
  ),
);
TextAreaField.displayName = "TextAreaField";

export default Field;
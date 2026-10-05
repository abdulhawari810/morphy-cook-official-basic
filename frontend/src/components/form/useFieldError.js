import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { translateIssues } from "@/utils/validationMessage";

/** Error satu field dalam bentuk string siap tampil. */
export const useFieldError = (name) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
  } = useFormContext();

  return useMemo(
    () => translateIssues(errors[name]?.issues, t),
    [errors, name, t],
  );
};

/** Error sebuah field array (mis. `ingredients`). */
export const useArrayFieldError = (name) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return useMemo(() => {
    if (!error) return null;

    //_ zod menaruh issue di level item (`ingredients.0`) atau level array
    const issues = error.issues ?? [error];

    return translateIssues(issues, t);
  }, [error, t]);
};
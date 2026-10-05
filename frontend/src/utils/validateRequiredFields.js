export const validateRequiredFields = (form, fields, t) => {
  const requiredFields = fields.filter((field) => field.required);

  for (const field of requiredFields) {
    const value = form[field.name];

    if (value === null || value === undefined) {
      return {
        valid: false,
        message: `${field.label} ${t("handleMessage.form.required")}`,
      };
    }

    if (typeof value === "string" && value.trim() === "") {
      return {
        valid: false,
        message: `${field.label} ${t("handleMessage.form.required")}`,
      };
    }

    if (
      Array.isArray(value) &&
      (value.length === 0 ||
        value.some(
          (item) =>
            item === null ||
            item === undefined ||
            (typeof item === "string" && item.trim() === ""),
        ))
    ) {
      return {
        valid: false,
        message: `${field.label} ${t("handleMessage.form.required")}`,
      };
    }
  }

  return {
    valid: true,
    message: null,
  };
};

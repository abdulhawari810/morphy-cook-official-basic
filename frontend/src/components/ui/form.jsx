import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useFieldError } from "@/components/form/useFieldError";

const FormItemContext = React.createContext({ name: "" });

const FormField = ({ ...props }) => (
  <FormItemContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormItemContext.Provider>
);

//_ internal saja; diekspor dari useFormField.js agar file ini tetap
//_ hanya mengekspor komponen (dibutuhkan react-refresh HMR)
const useFormField = () => {
  const { name } = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  return { name, ...getFieldState(name, formState) };
};

const FormItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full space-y-0", className)} {...props} />
));
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error } = useFormField();
  return (
    <Label
      ref={ref}
      className={cn(error && "text-red-500", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, name } = useFormField();
  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    ref,
    id: child.props.id ?? name,
    name,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? `${name}-message` : undefined,
  });
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-1 text-xs text-slate-500 dark:text-neutral-400", className)}
    {...props}
  />
));
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(({ className, ...props }, ref) => {
  const { name } = React.useContext(FormItemContext);
  const message = useFieldError(name);
  if (!message) return null;
  return (
    <p
      ref={ref}
      role="alert"
      id={`${name}-message`}
      className={cn("mt-1 text-xs text-red-500", className)}
      {...props}
    >
      {message}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};

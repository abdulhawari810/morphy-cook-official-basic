import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-gray-900 transition-colors placeholder:text-neutral-400 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };

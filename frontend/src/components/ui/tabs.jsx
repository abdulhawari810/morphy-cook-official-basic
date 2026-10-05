import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

/**
 * Tabs (shadcn/ui di atas Base UI).
 *
 * Base UI sudah menangani navigasi keyboard (arrow keys, Home/End),
 * roving tabindex, dan `aria-controls` antar panel.
 */
function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex w-full items-center gap-1 rounded-xl bg-neutral-100 p-1 dark:bg-neutral-800",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition",
        "text-neutral-500 hover:text-orange-500 dark:text-neutral-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
        "data-[selected]:bg-white data-[selected]:text-orange-500 data-[selected]:shadow-sm",
        "dark:data-[selected]:bg-neutral-950 dark:data-[selected]:text-orange-500",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
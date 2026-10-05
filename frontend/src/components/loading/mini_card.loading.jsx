import { Skeleton } from "@/components/ui/skeleton";

export default function MiniCardLoading() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-800">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="my-4 h-4 w-2/3" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

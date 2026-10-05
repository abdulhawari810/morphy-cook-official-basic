import { Skeleton } from "@/components/ui/skeleton";
export default function CardLoading() {
  return (
    <div className="bg-white dark:bg-neutral-800 break-inside-avoid rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative">
      <Skeleton className="w-full h-32 rounded-t-2xl sm:h-44 md:h-44" />
      <Skeleton className="w-20 md:w-40 h-3 mt-2 rounded-sm sm:h-3 md:h-4" />
      <Skeleton className="w-40 md:w-60 h-3 mt-2 rounded-sm sm:h-3 md:h-4" />
      <Skeleton className="w-40 md:w-72 h-3 mt-2 rounded-sm sm:h-3 md:h-4" />
      <div className="md:flex hidden items-center justify-center gap-4">
        <Skeleton className="w-40 h-3 mt-2 rounded-sm sm:h-3 md:h-10" />
        <Skeleton className="w-40 h-3 mt-2 rounded-sm sm:h-3 md:h-10" />
      </div>
    </div>
  );
}

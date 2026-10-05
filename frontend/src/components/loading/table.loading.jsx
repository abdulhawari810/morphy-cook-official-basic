import { Skeleton } from "@/components/ui/skeleton";

export default function TableLoading() {
  return (
    <tr className="border-t border-gray-200 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900">
      <td className="px-4 py-3 whitespace-nowrap">
        <Skeleton className="w-5 h-5 rounded-2xl md:h-5 bg-slate-500 dark:bg-neutral-800"></Skeleton>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Skeleton className="w-12 h-12 rounded-2xl md:h-12 bg-slate-500 dark:bg-neutral-800"></Skeleton>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Skeleton className="w-16 h-2 rounded-2xl md:h-2 bg-slate-500 dark:bg-neutral-800"></Skeleton>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Skeleton className="w-45 h-2 rounded-2xl md:h-2 bg-slate-500 dark:bg-neutral-800"></Skeleton>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Skeleton className="w-16 h-2 rounded-2xl md:h-2 bg-slate-500 dark:bg-neutral-800"></Skeleton>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Skeleton className="w-16 h-2 rounded-2xl md:h-2 bg-slate-500 dark:bg-neutral-800"></Skeleton>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Skeleton className="w-16 h-2 rounded-2xl md:h-2 bg-slate-500 dark:bg-neutral-800"></Skeleton>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <Skeleton className="w-16 h-2 rounded-2xl md:h-2 bg-slate-500 dark:bg-neutral-800"></Skeleton>
      </td>
      <td className="px-4 py-3 items-center justify-center gap-1 flex flex-col whitespace-nowrap">
        <Skeleton className="w-2 h-2 rounded-2xl md:h-2 bg-slate-500 dark:bg-neutral-800"></Skeleton>
        <Skeleton className="w-2 h-2 rounded-2xl md:h-2 bg-slate-500 dark:bg-neutral-800"></Skeleton>
        <Skeleton className="w-2 h-2 rounded-2xl md:h-2 bg-slate-500 dark:bg-neutral-800"></Skeleton>
      </td>
    </tr>
  );
}

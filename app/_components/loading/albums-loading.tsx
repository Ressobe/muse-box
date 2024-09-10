import { Skeleton } from "@/app/_components/ui/skeleton";

export function AlbumsLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <ul className="flex flex-wrap gap-x-10">
        <li>
          <Skeleton className="w-[150px] h-[150px]" />
        </li>
        <li>
          <Skeleton className="w-[150px] h-[150px]" />
        </li>
        <li>
          <Skeleton className="w-[150px] h-[150px]" />
        </li>
        <li>
          <Skeleton className="w-[150px] h-[150px]" />
        </li>
        <li>
          <Skeleton className="w-[150px] h-[150px]" />
        </li>
      </ul>
    </div>
  );
}

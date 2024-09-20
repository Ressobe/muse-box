import { Skeleton } from "@/app/_components/ui/skeleton";

export function CardsLoading() {
  return (
    <div className="flex gap-6">
      <div>
        <Skeleton className="h-28 w-28 md:w-40 md:h-40 lg:w-56 lg:h-56" />
      </div>
      <div>
        <Skeleton className="h-28 w-28 md:w-40 md:h-40 lg:w-56 lg:h-56" />
      </div>
      <div>
        <Skeleton className="h-28 w-28 md:w-40 md:h-40 lg:w-56 lg:h-56" />
      </div>
      <div>
        <Skeleton className="h-28 w-28 md:w-40 md:h-40 lg:w-56 lg:h-56" />
      </div>
    </div>
  );
}

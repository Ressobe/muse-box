import { Skeleton } from "@/app/_components/ui/skeleton";

export function TableLoading() {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton className="w-full h-[50px]" />
      </div>
      <div>
        <Skeleton className="w-full h-[50px]" />
      </div>
      <div>
        <Skeleton className="w-full h-[50px]" />
      </div>
    </div>
  );
}

import { Skeleton } from "@/app/_components/ui/skeleton";

export function TracksLoading() {
  return (
    <div>
      <ul>
        <li>
          <Skeleton className="min-w-full h-[100px]" />
        </li>
        <li>
          <Skeleton className="min-w-full h-[100px]" />
        </li>
        <li>
          <Skeleton className="min-w-full h-[100px]" />
        </li>
      </ul>
    </div>
  );
}

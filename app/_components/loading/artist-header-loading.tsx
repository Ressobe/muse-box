import { Skeleton } from "@/app/_components/ui/skeleton";

export async function ArtistHeaderLoading() {
  return (
    <div>
      <Skeleton className="w-2/3 h-[200px]" />
    </div>
  );
}

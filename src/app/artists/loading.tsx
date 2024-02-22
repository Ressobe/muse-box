import { Card, CardContent } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function LoadingArtists() {
  return (
    <div className="max-w-5xl flex flex-col mt-10 mx-auto px-4  gap-6">
      <Card className="grid sm:grid-cols-[200px_1fr] py-4 h-[300px]">
        <div className="flex items-center justify-center p-6">
          <Skeleton className="w-40 h-40 rounded-full" />
        </div>
        <CardContent className="flex flex-col justify-center gap-2">
          <Skeleton className="w-1/5 h-10" />
          <Skeleton className="w-2/5 h-10" />
          <Skeleton className="w-3/5 h-20" />
        </CardContent>
      </Card>
      <Card className="grid sm:grid-cols-[200px_1fr] py-4 h-[300px]">
        <div className="flex items-center justify-center p-6">
          <Skeleton className="w-40 h-40 rounded-full" />
        </div>
        <CardContent className="flex flex-col justify-center gap-2">
          <Skeleton className="w-1/5 h-10" />
          <Skeleton className="w-2/5 h-10" />
          <Skeleton className="w-3/5 h-20" />
        </CardContent>
      </Card>
    </div>
  );
}

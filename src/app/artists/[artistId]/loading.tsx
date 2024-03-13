import { Skeleton } from "@/src/components/ui/skeleton";

export default function LoadingArtist() {
  return (
    <div className="flex max-w-4xl mx-auto mt-20">
      <div className="w-1/3 flex flex-col justify-center items-center gap-2">
        <Skeleton className="aspect-square rounded-full object-cover border border-gray-200 dark:border-gray-800 h-[200px] width-[200px]" />
        <Skeleton className="w-1/3 h-8" />
        <Skeleton className="w-1/2 h-8" />
        <div className="pt-5 flex items-center gap-3">
          <Skeleton className="w-1/2 h-8" />
          <Skeleton className="w-1/2 h-8" />
        </div>
      </div>
      <div className="pl-20 flex flex-col w-2/3  gap-10 ">
        <Skeleton className="w-4/5 h-10" />
        <Skeleton className="w-4/5 h-10" />
        <Skeleton className="w-4/5 h-20" />
      </div>
    </div>
  );
}

import { BarChart4, StarIcon, UsersIcon } from "lucide-react";

type ArtistStatsProps = {
  avgRating?: number;
  amountOfRatings?: number;
  amountOfFollowers?: number;
  popularity?: number;
};

export default function ArtistStats({
  avgRating,
  amountOfRatings,
  amountOfFollowers,
  popularity,
}: ArtistStatsProps) {
  return (
    <div className="py-4 space-y-2">
      <div className="flex items-center space-x-2">
        <StarIcon className="w-5 h-5 fill-current" />
        <span className="text-sm font-semibold">{avgRating}</span>
        <span className="text-sm">({amountOfRatings} ratings)</span>
      </div>

      <div className="flex items-center space-x-2">
        <UsersIcon className="w-5 h-5 " />
        <span className="text-sm font-semibold">{amountOfFollowers}</span>
        <span className="text-sm">followers</span>
      </div>

      <div className="flex items-center space-x-2 ">
        <BarChart4 className="w-5 h-5" />
        <span className="text-sm font-semibold">{popularity}</span>
        <span className="text-sm">popularity</span>
      </div>
    </div>
  );
}

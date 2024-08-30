import clsx from "clsx";

type RatingStatsProps = {
  stats: {
    ratingAvg: number | null | undefined;
  } | null;
  size?: "sm" | "lg" | "xl";
};

export function RatingStats({ stats, size = "xl" }: RatingStatsProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-x-4",
        size === "xl" && "text-4xl",
        size === "lg" && "text-2xl",
        size === "sm" && "text-xl",
      )}
    >
      <span className="text-yellow-500">★</span>
      {!stats || !stats.ratingAvg ? (
        <span
          className={clsx(
            size === "xl" && "text-xl",
            size === "lg" && "text-lg",
            size === "sm" && "text-sm",
          )}
        >
          Not rated yet!
        </span>
      ) : (
        stats.ratingAvg
      )}
    </div>
  );
}

import clsx from "clsx";

type RatingStatsProps = {
  ratingAvg?: number | null | undefined;
  ratingCount?: number | null | undefined;
  size?: "sm" | "lg" | "xl";
};

export function RatingStats({
  ratingAvg,
  ratingCount,
  size = "xl",
}: RatingStatsProps) {
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
      {!ratingAvg ? (
        <div
          className={clsx(
            "text-nowrap",
            size === "xl" && "text-xl",
            size === "lg" && "text-lg",
            size === "sm" && "text-sm",
          )}
        >
          Not rated yet!
        </div>
      ) : (
        <>
          {ratingAvg}{" "}
          {ratingCount && (
            <span className="text-muted-foreground text-sm">
              {" "}
              ({ratingCount})
            </span>
          )}
        </>
      )}
    </div>
  );
}

const sortTypes = [
  "alphabetical",
  "alphabeticalReverse",
  "highestRating",
  "lowestRating",
  "default",
] as const;

export type SortType = (typeof sortTypes)[number];

export function isValidSortType(value: string | undefined): value is SortType {
  return sortTypes.includes(value as SortType);
}

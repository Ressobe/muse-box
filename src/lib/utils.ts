import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getUserArtistReview } from "@/data-access/user";
import { currentUser } from "@/lib/auth";

export async function shouldShowAddReview(artistId: string): Promise<boolean> {
  const user = await currentUser();
  if (!user) {
    return false;
  }

  const review = await getUserArtistReview(user.id, artistId);
  // Two times negation because I want to change type to boolean
  // And last because i show review when user don't have review already
  return !!!review;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYear(date: Date | null) {
  if (!date) return "";
  return new Date(date).getFullYear();
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getTime(seconds: number | null) {
  if (!seconds) return null;
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format the minutes and seconds to be two digits if needed
  const formattedMinutes = minutes.toString();
  const formattedSeconds =
    remainingSeconds < 10
      ? "0" + remainingSeconds
      : remainingSeconds.toString();

  // Combine and return the formatted time
  return formattedMinutes + ":" + formattedSeconds;
}

export function getFullAlbumTime(
  tracks: {
    length: number | null;
  }[],
) {
  let fullTime = 0;
  for (const t of tracks) {
    fullTime += t.length ?? 0;
  }
  return fullTime;
}

function pluralize(value: number, singular: string, plural?: string): string {
  return value === 1 ? singular : plural || singular + "s";
}

export function formatTimeDiff(createdAt: Date): string {
  const currentTime = new Date();
  const timeDiff = Math.abs(currentTime.getTime() - createdAt.getTime());
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  switch (true) {
    case hours === 0 && minutes === 0:
      return "Just now";

    case hours === 0:
      return `${minutes} ${pluralize(minutes, "minute")} ago`;

    case hours === 1:
      return `1 ${pluralize(hours, "hour")} ago`;

    case hours < 24:
      return `${hours} ${pluralize(hours, "hour")} ago`;

    case hours < 24 * 7:
      const days = Math.floor(hours / 24);
      return `${days} ${pluralize(days, "day")} ago`;

    case hours < 24 * 30:
      const weeks = Math.floor(hours / (24 * 7));
      return `${weeks} ${pluralize(weeks, "week")} ago`;

    case hours < 24 * 365:
      const months = Math.floor(hours / (24 * 30));
      return `${months} ${pluralize(months, "month")} ago`;

    default:
      const years = Math.floor(hours / (24 * 365));
      return `${years} ${pluralize(years, "year")} ago`;
  }
}

export function formatDateToShortMonthDayYear(date: Date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return [`${day < 10 ? "0" + day : day}`, `${month}`, `${year}`];
}

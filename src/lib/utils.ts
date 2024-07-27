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

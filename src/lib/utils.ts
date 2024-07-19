import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYear(date: Date | null) {
  if (!date) return "";
  return new Date(date).getFullYear();
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

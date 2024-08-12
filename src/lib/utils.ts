import { NotificationT } from "@/types/notification";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes.toString();
  const formattedSeconds =
    remainingSeconds < 10
      ? "0" + remainingSeconds
      : remainingSeconds.toString();

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

export function formatTimeDiff(created: Date | string) {
  const createdAt = new Date(created);
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

export function formatNumberWithPrefix(num: number): string {
  const prefixes = ["", "K", "M", "B"];
  let prefixIndex = 0;

  while (num >= 1000 && prefixIndex < prefixes.length - 1) {
    num /= 1000;
    prefixIndex++;
  }

  let formattedNumber = num.toFixed(1);
  if (formattedNumber.endsWith(".0")) {
    formattedNumber = formattedNumber.slice(0, -2); // Usuwa końcowe ".0"
  }

  return formattedNumber + prefixes[prefixIndex];
}

export function isNewNotification(notifications: NotificationT[]) {
  for (const item of notifications) {
    if (!item.isRead) return true;
  }
  return false;
}

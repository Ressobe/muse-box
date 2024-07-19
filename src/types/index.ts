export enum ESubscriptionPeriod {
  Year = 1,
  Month = 2,
}

type DateTimeFormatOptions = {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "long" | "short";
};

export const options: DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export type Entity = "artist" | "album" | "track";

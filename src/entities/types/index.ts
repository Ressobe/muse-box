import { Album } from "../models/album";
import { ArtistSelect } from "../models/artist";
import { Track, TrackWithAlbum } from "../models/track";

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

export type LikedArtists = ArtistSelect[];
export type LikedAlbums = Album[];
export type LikedTracks = TrackWithAlbum[];

export type LikedItems =
  | { type: "artists"; items: LikedArtists }
  | { type: "albums"; items: LikedAlbums }
  | { type: "tracks"; items: LikedTracks };

export enum ESubscriptionPeriod {
  Year = 1,
  Month = 2,
}

export const entityToPlaylists = {
  artist: "Favourite Artists",
  album: "Favourite Albums",
  track: "Favourite Tracks",
};

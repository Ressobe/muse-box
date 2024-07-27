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

export const entityToPlaylists = {
  artist: "Favourite Artists",
  album: "Favourite Albums",
  track: "Favourite Tracks",
};

type Artist = {
  id: string;
  name: string;
  image: string | null;
  bio: string | null;
  country: string | null;
};

type Album = {
  id: string;
  image: string | null;
  artistId: string;
  typeId: number;
  title: string;
  length: number | null;
  releaseDate: Date | null;
  artist: Artist;
};

type Track = {
  id: string;
  image: string | null;
  artistId: string;
  title: string;
  length: number | null;
  albumId: string;
  position: number;
  artist: Artist;
  album: Omit<Album, "artist">;
};

export type LikedArtists = Artist[];
export type LikedAlbums = Album[];
export type LikedTracks = Track[];

export type LikedItems =
  | { type: "artists"; items: LikedArtists }
  | { type: "albums"; items: LikedAlbums }
  | { type: "tracks"; items: LikedTracks };

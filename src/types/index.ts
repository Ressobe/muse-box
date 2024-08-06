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

export type Artist =
  | {
      id: string;
      name: string;
      image: string | null;
      bio: string | null;
      country: string | null;
      stats: {
        entityId: string;
        likes: number | null;
        popularity: number | null;
        ratingAvg: number | null;
        ratingSum: number | null;
        ratingCount: number | null;
      };
    }
  | undefined;

export type Album =
  | {
      id: string;
      image: string | null;
      artistId: string;
      typeId: number;
      title: string;
      length: number | null;
      releaseDate: Date | null;
      artist: {
        id: string;
        name: string;
        image: string | null;
        bio: string | null;
        country: string | null;
      };
    }
  | undefined;

export type Track =
  | {
      id: string;
      image: string | null;
      artistId: string;
      title: string;
      length: number | null;
      albumId: string;
      position: number;
      artist: {
        id: string;
        name: string;
        image: string | null;
        bio: string | null;
        country: string | null;
      };
      album: {
        id: string;
        image: string | null;
        artistId: string;
        typeId: number;
        title: string;
        length: number | null;
        releaseDate: Date | null;
      };
    }
  | undefined;

export type PlaylistItem = Artist | Album | Track;
export type PlaylistResponse = Artist[] | Album[] | Track[];

type LArtist = {
  id: string;
  name: string;
  image: string | null;
  bio: string | null;
  country: string | null;
};

type LAlbum = {
  id: string;
  image: string | null;
  artistId: string;
  typeId: number;
  title: string;
  length: number | null;
  releaseDate: Date | null;
  artist: LArtist;
};

export type LTrack = {
  id: string;
  image: string | null;
  artistId: string;
  title: string;
  length: number | null;
  albumId: string;
  position: number;
  artist: LArtist;
  album: Omit<LAlbum, "artist">;
};

export type LikedArtists = LArtist[];
export type LikedAlbums = LAlbum[];
export type LikedTracks = LTrack[];

export type LikedItems =
  | { type: "artists"; items: LikedArtists }
  | { type: "albums"; items: LikedAlbums }
  | { type: "tracks"; items: LikedTracks };

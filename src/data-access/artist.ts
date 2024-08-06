import { db } from "@/database/db";
import {
  albums,
  artists,
  artistsStats,
  genresToArtists,
  reviewsArtists,
  tracks,
} from "@/database/schema";
import { Artist } from "@/schemas/artist";
import { and, count, desc, eq, or, sql } from "drizzle-orm";
import { createArtistStat } from "./stat";
import { createAlbum, createAlbumTypes } from "./album";
import { createTrack } from "./track";

export async function getArtists() {
  return await db.query.artists.findMany();
}

export async function getArtistById(artistId: string) {
  return await db.query.artists.findFirst({
    where: eq(artists.id, artistId),
    with: {
      stats: true,
    },
  });
}

export async function getArtist(artistId: string) {
  return await db.query.artists.findFirst({
    where: eq(artists.id, artistId),
  });
}

export async function getArtistAlbums(artistId: string, limit?: number) {
  return db.query.albums.findMany({
    where: and(eq(albums.artistId, artistId), eq(albums.typeId, 1)),
    limit,
  });
}

export async function getArtistSinglesEps(artistId: string, limit?: number) {
  return db.query.albums.findMany({
    where: and(
      eq(albums.artistId, artistId),
      or(eq(albums.typeId, 2), eq(albums.typeId, 3)),
    ),
    limit,
  });
}

export async function getArtistTracks(artistId: string, limit?: number) {
  return await db.query.tracks.findMany({
    where: eq(tracks.artistId, artistId),
    with: {
      album: true,
      stats: true,
    },
    limit,
  });
}

export async function getArtistGenres(artistId: string, limit?: number) {
  return await db.query.genresToArtists.findMany({
    where: eq(genresToArtists.artistId, artistId),
    with: {
      genre: true,
    },
    limit,
  });
}

export async function getArtistDiscography(artistId: string, limit?: number) {
  return await db.query.albums.findMany({
    where: eq(albums.artistId, artistId),
    with: {
      artist: true,
      tracks: {
        with: {
          stats: true,
        },
      },
      albumType: true,
    },
    limit,
  });
}

export async function getArtistStats(artistId: string) {
  return await db.query.artistsStats.findFirst({
    where: eq(artistsStats.entityId, artistId),
  });
}

export async function createArtist(newArtist: Artist) {
  const [artist] = await db.insert(artists).values(newArtist).returning();
  await createArtistStat(artist.id);
  return artist;
}

export async function getArtistImage(artistId: string): Promise<string | null> {
  const artist = await getArtistById(artistId);
  return artist?.image || null;
}

export async function getArtistReviews(
  artistId: string,
  limit?: number,
  offset = 0,
) {
  return await db.query.reviewsArtists.findMany({
    where: eq(reviewsArtists.entityId, artistId),
    with: {
      user: true,
    },
    orderBy: desc(reviewsArtists.createdAt),
    limit,
    offset,
  });
}

export async function getArtistReviewsCount(artistId: string) {
  const [c] = await db
    .select({ count: count() })
    .from(reviewsArtists)
    .where(eq(reviewsArtists.entityId, artistId));
  return c;
}

export async function getFilteredArtists(query: string) {
  const filteredArtists = await db
    .select()
    .from(artists)
    .where(sql`${artists.name} LIKE ${`%${query}%`} COLLATE NOCASE`);

  return filteredArtists;
}

export async function emptyArtists() {
  const artists = [
    {
      name: "Quebonafide",
      bio: "One of the most popular Polish rappers, known for his diverse style.",
      country: "Poland",
    },
    {
      name: "Sokół",
      bio: "Veteran of the Polish hip-hop scene, known for his deep lyrics.",
      country: "Poland",
    },
    {
      name: "O.S.T.R.",
      bio: "Renowned Polish rapper and producer, known for his lyrical depth.",
      country: "Poland",
    },
    {
      name: "KęKę",
      bio: "Popular Polish rapper known for his authentic style and storytelling.",
      country: "Poland",
    },
  ];

  artists.forEach(async (artist) => {
    await createArtist(artist);
  });
}

export async function insertTacoHemingway() {
  // await createAlbumTypes();
  const artist = await createArtist({
    name: "Taco Hemingway",
    bio: "Polish rapper known for his unique style and storytelling.",
    country: "Poland",
    image: "/taco-avatar.jpeg",
  });

  const album1 = await createAlbum({
    artistId: artist.id,
    typeId: 1,
    title: "Trójkąt Warszawski",
    image: "/taco4.jpeg",
    length: 1753,
    releaseDate: new Date("2014-12-19"),
  });

  const album2 = await createAlbum({
    artistId: artist.id,
    typeId: 1,
    title: "Umowa o dzieło",
    image: "/taco3.jpeg",
    length: 1753,
    releaseDate: new Date("2015-06-27"),
  });

  await createTrack({
    title: "Szlugi i Kalafiory",
    image: "/taco4.jpeg",
    albumId: album1.id,
    artistId: artist.id,
    position: 1,
    length: 186,
  });

  await createTrack({
    title: "Marsz, Marsz",
    image: "/taco4.jpeg",
    albumId: album1.id,
    artistId: artist.id,
    position: 2,
    length: 230,
  });

  await createTrack({
    title: "Wszystko Jedno",
    image: "/taco4.jpeg",
    albumId: album1.id,
    artistId: artist.id,
    position: 3,
    length: 310,
  });

  await createTrack({
    title: "Trójkąt",
    image: "/taco4.jpeg",
    albumId: album1.id,
    artistId: artist.id,
    position: 4,
    length: 326,
  });

  await createTrack({
    title: "(Przerywnik)",
    image: "/taco4.jpeg",
    albumId: album1.id,
    artistId: artist.id,
    position: 5,
    length: 132,
  });

  await createTrack({
    title: "Mięso",
    image: "/taco4.jpeg",
    albumId: album1.id,
    artistId: artist.id,
    position: 6,
    length: 257,
  });

  await createTrack({
    title: "900729",
    image: "/taco4.jpeg",
    albumId: album1.id,
    artistId: artist.id,
    position: 7,
    length: 303,
  });

  await createTrack({
    title: "Od zera",
    image: "/taco3.jpeg",
    albumId: album2.id,
    artistId: artist.id,
    position: 1,
    length: 116,
  });

  await createTrack({
    title: "A mówiłem Ci",
    image: "/taco3.jpeg",
    albumId: album2.id,
    artistId: artist.id,
    position: 2,
    length: 339,
  });

  await createTrack({
    title: "Następna stacja",
    image: "/taco3.jpeg",
    albumId: album2.id,
    artistId: artist.id,
    position: 3,
    length: 251,
  });

  await createTrack({
    title: "6 zer",
    image: "/taco3.jpeg",
    albumId: album2.id,
    artistId: artist.id,
    position: 4,
    length: 237,
  });

  await createTrack({
    title: "+4822",
    image: "/taco3.jpeg",
    albumId: album2.id,
    artistId: artist.id,
    position: 5,
    length: 236,
  });

  await createTrack({
    title: "Awizo",
    image: "/taco3.jpeg",
    albumId: album2.id,
    artistId: artist.id,
    position: 6,
    length: 259,
  });

  await createTrack({
    title: "Białkoholicy",
    image: "/taco3.jpeg",
    albumId: album2.id,
    artistId: artist.id,
    position: 7,
    length: 282,
  });

  await createTrack({
    title: "100 kmh",
    image: "/taco3.jpeg",
    albumId: album2.id,
    artistId: artist.id,
    position: 8,
    length: 119,
  });
}

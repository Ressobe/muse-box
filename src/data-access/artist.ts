import { db } from "@/database/db";
import {
  albums,
  artists,
  artistsStats,
  genresToArtists,
  reviewsArtists,
  tracks,
  tracksStats,
} from "@/database/schema";
import { Artist } from "@/schemas/artist";
import { and, count, desc, eq, or, sql } from "drizzle-orm";
import { createArtistStat } from "./stat";

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
    orderBy: desc(albums.releaseDate),
    limit,
  });
}

export async function getArtistSinglesEps(artistId: string, limit?: number) {
  return db.query.albums.findMany({
    where: and(
      eq(albums.artistId, artistId),
      or(eq(albums.typeId, 2), eq(albums.typeId, 3)),
    ),
    orderBy: desc(albums.releaseDate),
    limit,
  });
}

export async function getArtistTracks(artistId: string, limit?: number) {
  if (limit) {
    return await db
      .select()
      .from(tracks)
      .leftJoin(tracksStats, eq(tracksStats.entityId, tracks.id))
      .innerJoin(albums, eq(albums.artistId, artistId))
      .limit(limit);
  }

  return await db
    .select()
    .from(tracks)
    .leftJoin(tracksStats, eq(tracksStats.entityId, tracks.id))
    .innerJoin(albums, eq(albums.artistId, artistId));
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

export async function getArtistDiscography(artistId: string) {
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
    orderBy: desc(albums.releaseDate),
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

export async function getFilteredArtists(query: string, limit?: number) {
  const filteredArtistsQuery = db
    .select()
    .from(artists)
    .where(sql`${artists.name} LIKE ${`%${query}%`} COLLATE NOCASE`);

  if (typeof limit === "number") {
    filteredArtistsQuery.limit(limit);
  }

  const filteredArtists = await filteredArtistsQuery;

  return filteredArtists;
}

export async function getTopArtists() {
  return await db
    .select({
      id: artists.id,
      name: artists.name,
      image: artists.image,
      bio: artists.bio,
      country: artists.country,
      ratingAvg: artistsStats.ratingAvg,
    })
    .from(artists)
    .innerJoin(artistsStats, eq(artistsStats.entityId, artists.id))
    .orderBy(desc(artistsStats.ratingAvg));
}

export async function getArtistByAlbumId(albumId: string) {
  const alb = await db.query.albums.findFirst({
    where: eq(albums.id, albumId),
    with: {
      artist: true,
    },
  });

  return alb?.artist;
}

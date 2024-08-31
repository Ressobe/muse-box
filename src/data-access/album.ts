import { db } from "@/database/db";
import { albums, reviewsAlbums } from "@/database/schema";
import { Album } from "@/schemas/album";
import { count, desc, eq, sql } from "drizzle-orm";
import { createAlbumStat } from "./stat";

export async function getAlbums(limit?: number) {
  return await db.query.albums.findMany({
    limit,
  });
}

export async function getAlbumById(albumId: string) {
  return await db.query.albums.findFirst({
    where: eq(albums.id, albumId),
    with: {
      artist: true,
      tracks: {
        with: {
          stats: true,
          artistCredit: {
            with: {
              artistsCreditsNames: true,
            },
          },
        },
      },
      albumType: true,
      stats: true,
    },
  });
}

export async function getAlbum(albumId: string) {
  return await db.query.albums.findFirst({
    where: eq(albums.id, albumId),
    with: {
      artist: true,
    },
  });
}

export async function getAlbumsByArtistId(artistId: string, limit?: number) {
  return await db.query.albums.findMany({
    where: eq(albums.artistId, artistId),
    limit,
  });
}

export async function createAlbum(newAlbum: Album) {
  const [album] = await db.insert(albums).values(newAlbum).returning();
  await createAlbumStat(album.id);
  return album;
}

export async function getAlbumReviews(
  albumId: string,
  limit?: number,
  offset = 0,
) {
  return await db.query.reviewsAlbums.findMany({
    where: eq(reviewsAlbums.entityId, albumId),
    with: {
      user: true,
    },
    orderBy: desc(reviewsAlbums.createdAt),
    limit,
    offset,
  });
}

export async function getAlbumReviewsCount(albumId: string) {
  const [c] = await db
    .select({ count: count() })
    .from(reviewsAlbums)
    .where(eq(reviewsAlbums.entityId, albumId));
  return c;
}

export async function getAlbumImage(albumId: string): Promise<string | null> {
  const album = await getAlbumById(albumId);
  return album?.image || null;
}

export async function getFilteredAlbums(query: string, limit?: number) {
  const filteredAlbumsQuery = db
    .select()
    .from(albums)
    .where(sql`${albums.title} LIKE ${`%${query}%`} COLLATE NOCASE`);

  if (typeof limit === "number") {
    filteredAlbumsQuery.limit(limit);
  }

  const filteredAlbums = await filteredAlbumsQuery;

  return filteredAlbums;
}

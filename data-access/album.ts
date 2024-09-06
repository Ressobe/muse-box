import { db } from "@/drizzle/database/db";
import { albums, albumsStats, reviewsAlbums } from "@/drizzle/database/schema";
import { Album } from "@/schemas/album";
import { asc, count, desc, eq, sql } from "drizzle-orm";
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

export async function getTopAlbums(limit?: number) {
  const topAlbumsQuery = db
    .select({
      id: albums.id,
      title: albums.title,
      length: albums.length,
      image: albums.image,
      artistId: albums.artistId,
      typeId: albums.typeId,
      releaseDate: albums.releaseDate,
      ratingAvg: albumsStats.ratingAvg,
    })
    .from(albums)
    .innerJoin(albumsStats, eq(albumsStats.entityId, albums.id))
    .orderBy(desc(albumsStats.ratingAvg));

  if (typeof limit === "number") {
    topAlbumsQuery.limit(limit);
  }

  const topAlbumsResults = await topAlbumsQuery;
  return topAlbumsResults;
}

export async function getAlbumsSearch(limit?: number, offset = 0) {
  return await db.query.albums.findMany({
    with: {
      stats: true,
    },
    limit,
    offset,
    orderBy: asc(albums.title),
  });
}

export async function getAlbumsSortedByHighestRating(
  limit?: number,
  offset = 0,
) {
  const query = db
    .select({
      id: albums.id,
      title: albums.title,
      length: albums.length,
      image: albums.image,
      artistId: albums.artistId,
      typeId: albums.typeId,
      releaseDate: albums.releaseDate,
      stats: {
        ratingAvg: albumsStats.ratingAvg,
        ratingSum: albumsStats.ratingSum,
        ratingCount: albumsStats.ratingCount,
      },
    })
    .from(albums)
    .leftJoin(albumsStats, eq(albumsStats.entityId, albums.id))
    .orderBy(desc(albumsStats.ratingAvg))
    .offset(offset);

  if (typeof limit === "number") {
    query.limit(limit);
  }

  return await query;
}

export async function getAlbumsSortedByLowestRating(
  limit?: number,
  offset = 0,
) {
  const query = db
    .select({
      id: albums.id,
      title: albums.title,
      length: albums.length,
      image: albums.image,
      artistId: albums.artistId,
      typeId: albums.typeId,
      releaseDate: albums.releaseDate,
      stats: {
        ratingAvg: albumsStats.ratingAvg,
        ratingSum: albumsStats.ratingSum,
        ratingCount: albumsStats.ratingCount,
      },
    })
    .from(albums)
    .leftJoin(albumsStats, eq(albumsStats.entityId, albums.id))
    .orderBy(
      sql`CASE WHEN ${albumsStats.ratingAvg} IS NULL THEN 1 ELSE 0 END`,
      asc(sql`COALESCE(${albumsStats.ratingAvg}, 0)`),
    )
    .offset(offset);

  if (typeof limit === "number") {
    query.limit(limit);
  }

  return await query;
}

export async function getAlbumsSortedAlphabetically(
  limit?: number,
  offset = 0,
) {
  return await db.query.albums.findMany({
    with: {
      stats: true,
    },
    limit,
    offset,
    orderBy: asc(albums.title),
  });
}
export async function getAlbumsSortedInReverseAlphabetical(
  limit?: number,
  offset = 0,
) {
  return await db.query.albums.findMany({
    with: {
      stats: true,
    },
    limit,
    offset,
    orderBy: desc(albums.title),
  });
}

export async function getAlbumsCount() {
  const [c] = await db.select({ count: count() }).from(albums);
  return c;
}

export async function getPopularAlbums(limit?: number) {
  const popularAlbumsQuery = db
    .select({
      id: albums.id,
      title: albums.title,
      length: albums.length,
      typeId: albums.typeId,
      artistId: albums.artistId,
      releaseDate: albums.releaseDate,
      image: albums.image,
    })
    .from(albums)
    .innerJoin(albumsStats, eq(albumsStats.entityId, albums.id))
    .orderBy(desc(albumsStats.ratingCount));

  if (typeof limit === "number") {
    popularAlbumsQuery.limit(limit);
  }

  return await popularAlbumsQuery;
}

export async function getNewAlbums(limit?: number) {
  const newAlbumsQuery = db
    .select({
      id: albums.id,
      title: albums.title,
      length: albums.length,
      typeId: albums.typeId,
      artistId: albums.artistId,
      releaseDate: albums.releaseDate,
      image: albums.image,
    })
    .from(albums)
    .orderBy(desc(albums.releaseDate));

  if (typeof limit === "number") {
    newAlbumsQuery.limit(limit);
  }

  return await newAlbumsQuery;
}

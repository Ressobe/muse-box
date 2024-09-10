import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";
import { db } from "@/drizzle/database/db";
import {
  Album,
  AlbumWithRatingAvg,
  AlbumWithStats,
  AlbumWithTracks,
} from "@/src/entities/models/album";
import { and, asc, count, desc, eq, or, sql } from "drizzle-orm";
import { albums, albumsStats } from "@/drizzle/database/schema";

export class AlbumsRepository implements IAlbumsRepository {
  async getAlbums(limit?: number): Promise<Album[]> {
    return await db.query.albums.findMany({
      limit,
    });
  }

  async getAlbum(albumId: string): Promise<Album | undefined> {
    return await db.query.albums.findFirst({
      where: eq(albums.id, albumId),
    });
  }

  async getAlbumWithRelations(
    albumId: string,
  ): Promise<AlbumWithTracks | undefined> {
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

  async insertAlbum(newAlbum: Album): Promise<Album> {
    const [album] = await db.insert(albums).values(newAlbum).returning();
    return album;
  }

  async getAlbumsSearch(offset = 0, limit?: number): Promise<AlbumWithStats[]> {
    return await db.query.albums.findMany({
      with: {
        stats: true,
      },
      limit,
      offset,
      orderBy: asc(albums.title),
    });
  }

  async getAlbumsSortedByHighestRating(
    offset = 0,
    limit?: number,
  ): Promise<AlbumWithStats[]> {
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

  async getAlbumsSortedByLowestRating(
    offset = 0,
    limit?: number,
  ): Promise<AlbumWithStats[]> {
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

  async getAlbumsSortedAlphabetically(
    offset = 0,
    limit?: number,
  ): Promise<AlbumWithStats[]> {
    return await db.query.albums.findMany({
      with: {
        stats: true,
      },
      limit,
      offset,
      orderBy: asc(albums.title),
    });
  }

  async getAlbumsSortedInReverseAlphabetical(
    offset = 0,
    limit?: number,
  ): Promise<AlbumWithStats[]> {
    return await db.query.albums.findMany({
      with: {
        stats: true,
      },
      limit,
      offset,
      orderBy: desc(albums.title),
    });
  }

  async getAlbumsCount(): Promise<number> {
    const [c] = await db.select({ count: count() }).from(albums);
    return c.count;
  }

  async getAlbumsForArtist(artistId: string, limit?: number): Promise<Album[]> {
    return await db.query.albums.findMany({
      where: and(eq(albums.artistId, artistId), eq(albums.typeId, 1)),
      orderBy: desc(albums.releaseDate),
      limit,
    });
  }

  async getAlbumsWithTracksForArtist(
    artistId: string,
    limit?: number,
  ): Promise<AlbumWithTracks[]> {
    return await db.query.albums.findMany({
      where: and(eq(albums.artistId, artistId), eq(albums.typeId, 1)),
      with: {
        tracks: {
          with: {
            stats: true,
          },
        },
        albumType: true,
        stats: true,
      },
      orderBy: desc(albums.releaseDate),
      limit,
    });
  }

  async getSinglesEpsForArtist(
    artistId: string,
    limit?: number,
  ): Promise<Album[]> {
    return db.query.albums.findMany({
      where: and(
        eq(albums.artistId, artistId),
        or(eq(albums.typeId, 2), eq(albums.typeId, 3)),
      ),
      orderBy: desc(albums.releaseDate),
      limit,
    });
  }

  async getSinglesEpsWithTracksForArtist(
    artistId: string,
    limit?: number,
  ): Promise<AlbumWithTracks[]> {
    return db.query.albums.findMany({
      where: and(
        eq(albums.artistId, artistId),
        or(eq(albums.typeId, 2), eq(albums.typeId, 3)),
      ),
      with: {
        tracks: {
          with: {
            stats: true,
          },
        },
        albumType: true,
        stats: true,
      },

      orderBy: desc(albums.releaseDate),
      limit,
    });
  }

  async getPopularAlbums(limit?: number): Promise<Album[]> {
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

  async getNewAlbums(limit?: number): Promise<Album[]> {
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

  async getTopAlbums(limit?: number): Promise<AlbumWithStats[]> {
    const topAlbumsQuery = db
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
          ratingCount: albumsStats.ratingCount,
        },
      })
      .from(albums)
      .innerJoin(albumsStats, eq(albumsStats.entityId, albums.id))
      .orderBy(desc(albumsStats.ratingAvg));

    if (typeof limit === "number") {
      topAlbumsQuery.limit(limit);
    }

    return await topAlbumsQuery;
  }

  async getFilteredAlbums(query: string, limit?: number): Promise<Album[]> {
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
}

import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";
import { db } from "@/drizzle/database/db";
import {
  Track,
  TrackWithAlbum,
  TrackWithAlbumAndRatingAvg,
  TrackWithAlbumAndStats,
} from "@/src/entities/models/track";
import { albums, tracks, tracksStats } from "@/drizzle/database/schemas";
import { count, desc, asc, eq, sql } from "drizzle-orm";

export class TracksRepository implements ITracksRepository {
  async getTracks(limit?: number): Promise<Track[]> {
    return await db.query.tracks.findMany({
      limit,
    });
  }

  async getTrack(trackId: string): Promise<Track | undefined> {
    return await db.query.tracks.findFirst({
      where: eq(tracks.id, trackId),
    });
  }

  async insertTrack(newTrack: Track): Promise<Track> {
    const [track] = await db.insert(tracks).values(newTrack).returning();
    return track;
  }

  async getTopTracksForArtist(
    artistId: string,
    limit = 5,
  ): Promise<TrackWithAlbumAndRatingAvg[]> {
    return await db
      .select({
        id: tracks.id,
        title: tracks.title,
        albumId: tracks.albumId,
        position: tracks.position,
        ratingAvg: tracksStats.ratingAvg,
        album: {
          id: albums.id,
          image: albums.image,
          artistId: albums.artistId,
          title: albums.title,
        },
      })
      .from(tracks)
      .innerJoin(tracksStats, eq(tracks.id, tracksStats.entityId))
      .innerJoin(albums, eq(tracks.albumId, albums.id))
      .where(eq(albums.artistId, artistId))
      .orderBy(desc(tracksStats.ratingAvg))
      .limit(limit);
  }

  async getFilteredTracks(
    query: string,
    limit?: number,
  ): Promise<TrackWithAlbum[]> {
    const filteredTracksQuery = db
      .select({
        id: tracks.id,
        position: tracks.position,
        title: tracks.title,
        image: tracks.image,
        length: tracks.length,
        albumId: tracks.albumId,
        artistsCredits: tracks.artistsCredits,
        album: {
          id: albums.id,
          image: albums.image,
          artistId: albums.artistId,
          typeId: albums.typeId,
          title: albums.title,
          length: albums.length,
          releaseDate: albums.releaseDate,
        },
      })
      .from(tracks)
      .where(sql`${tracks.title} LIKE ${`%${query}%`} COLLATE NOCASE`)
      .innerJoin(albums, eq(tracks.albumId, albums.id));

    if (typeof limit === "number") {
      filteredTracksQuery.limit(limit);
    }

    return await filteredTracksQuery;
  }

  async getTracksCount(): Promise<number> {
    const [c] = await db.select({ count: count() }).from(tracks);
    return c.count;
  }

  async getTopTracks(limit?: number): Promise<TrackWithAlbumAndStats[]> {
    const topTracksQuery = db
      .select({
        id: tracks.id,
        title: tracks.title,
        length: tracks.length,
        image: tracks.image,
        position: tracks.position,
        albumId: tracks.albumId,
        artistsCredits: tracks.artistsCredits,
        stats: {
          ratingAvg: tracksStats.ratingAvg,
          ratingCount: tracksStats.ratingCount,
        },
        album: {
          id: albums.id,
          image: albums.image,
          artistId: albums.artistId,
          typeId: albums.typeId,
          title: albums.title,
          length: albums.length,
          releaseDate: albums.releaseDate,
        },
      })
      .from(tracks)
      .innerJoin(albums, eq(albums.id, tracks.albumId))
      .innerJoin(tracksStats, eq(tracksStats.entityId, tracks.id))
      .orderBy(desc(tracksStats.ratingAvg));

    if (typeof limit === "number") {
      topTracksQuery.limit(limit);
    }

    return await topTracksQuery;
  }

  async getPopularTracks(limit?: number): Promise<TrackWithAlbum[]> {
    const popularTracksQuery = db
      .select({
        id: tracks.id,
        title: tracks.title,
        length: tracks.length,
        image: albums.image,
        position: tracks.position,
        albumId: tracks.albumId,
        artistsCredits: tracks.artistsCredits,
        album: {
          id: albums.id,
          image: albums.image,
          artistId: albums.artistId,
          typeId: albums.typeId,
          title: albums.title,
          length: albums.length,
          releaseDate: albums.releaseDate,
        },
      })
      .from(tracks)
      .innerJoin(albums, eq(albums.id, tracks.albumId))
      .innerJoin(tracksStats, eq(tracksStats.entityId, tracks.id))
      .orderBy(desc(tracksStats.ratingCount));

    if (typeof limit === "number") {
      popularTracksQuery.limit(limit);
    }

    return await popularTracksQuery;
  }

  async getNewTracks(limit?: number): Promise<TrackWithAlbum[]> {
    const newTracksQuery = db
      .select({
        id: tracks.id,
        title: tracks.title,
        length: tracks.length,
        image: albums.image,
        position: tracks.position,
        albumId: tracks.albumId,
        artistsCredits: tracks.artistsCredits,
        album: {
          id: albums.id,
          image: albums.image,
          artistId: albums.artistId,
          typeId: albums.typeId,
          title: albums.title,
          length: albums.length,
          releaseDate: albums.releaseDate,
        },
      })
      .from(tracks)
      .innerJoin(albums, eq(albums.id, tracks.albumId))
      .orderBy(desc(albums.releaseDate));

    if (typeof limit === "number") {
      newTracksQuery.limit(limit);
    }

    return await newTracksQuery;
  }

  async getTracksForArtist(artistId: string, limit?: number): Promise<Track[]> {
    const query = db
      .select({
        id: tracks.id,
        title: tracks.title,
        length: tracks.length,
        image: albums.image,
        position: tracks.position,
        albumId: tracks.albumId,
        artistsCredits: tracks.artistsCredits,
      })
      .from(tracks)
      .leftJoin(tracksStats, eq(tracksStats.entityId, tracks.id))
      .innerJoin(albums, eq(albums.artistId, artistId));

    if (typeof limit === "number") {
      query.limit(limit);
    }

    return await query;
  }

  async getTracksSearch(
    offset: number,
    limit?: number,
  ): Promise<TrackWithAlbumAndStats[]> {
    return await db.query.tracks.findMany({
      with: {
        album: true,
        stats: true,
      },
      limit,
      offset,
      orderBy: asc(tracks.title),
    });
  }

  async getTracksSortedByHighestRating(
    offset = 0,
    limit?: number,
  ): Promise<TrackWithAlbumAndStats[]> {
    const query = db
      .select({
        id: tracks.id,
        title: tracks.title,
        length: tracks.length,
        image: tracks.image,
        albumId: tracks.albumId,
        position: tracks.position,
        artistsCredits: tracks.artistsCredits,
        album: {
          id: albums.id,
          title: albums.title,
          length: albums.length,
          image: albums.image,
          artistId: albums.artistId,
          typeId: albums.typeId,
          releaseDate: albums.releaseDate,
        },
        stats: {
          ratingAvg: tracksStats.ratingAvg,
          ratingCount: tracksStats.ratingCount,
        },
      })
      .from(tracks)
      .innerJoin(albums, eq(albums.id, tracks.albumId))
      .leftJoin(tracksStats, eq(tracksStats.entityId, tracks.id))
      .orderBy(desc(tracksStats.ratingAvg))
      .offset(offset);

    if (typeof limit === "number") {
      query.limit(limit);
    }

    return await query;
  }

  async getTracksSortedByLowestRating(
    offset = 0,
    limit?: number,
  ): Promise<TrackWithAlbumAndStats[]> {
    const query = db
      .select({
        id: tracks.id,
        title: tracks.title,
        length: tracks.length,
        image: tracks.image,
        albumId: tracks.albumId,
        position: tracks.position,
        artistsCredits: tracks.artistsCredits,
        album: {
          id: albums.id,
          title: albums.title,
          length: albums.length,
          image: albums.image,
          artistId: albums.artistId,
          typeId: albums.typeId,
          releaseDate: albums.releaseDate,
        },
        stats: {
          ratingAvg: tracksStats.ratingAvg,
          ratingCount: tracksStats.ratingCount,
        },
      })
      .from(tracks)
      .innerJoin(albums, eq(albums.id, tracks.albumId))
      .leftJoin(tracksStats, eq(tracksStats.entityId, tracks.id))
      .orderBy(
        sql`CASE WHEN ${tracksStats.ratingAvg} IS NULL THEN 1 ELSE 0 END`,
        asc(sql`COALESCE(${tracksStats.ratingAvg}, 0)`),
      )
      .offset(offset);

    if (typeof limit === "number") {
      query.limit(limit);
    }

    return await query;
  }

  async getTracksSortedAlphabetically(
    offset = 0,
    limit?: number,
  ): Promise<TrackWithAlbumAndStats[]> {
    return await db.query.tracks.findMany({
      with: {
        album: {
          with: {
            stats: true,
          },
        },
        stats: true,
      },
      limit,
      offset,
      orderBy: asc(tracks.title),
    });
  }

  async getTracksSortedInReverseAlphabetical(
    offset = 0,
    limit?: number,
  ): Promise<TrackWithAlbumAndStats[]> {
    return await db.query.tracks.findMany({
      with: {
        album: {
          with: {
            stats: true,
          },
        },
        stats: true,
      },
      limit,
      offset,
      orderBy: desc(tracks.title),
    });
  }
}

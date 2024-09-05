import { db } from "@/database/db";
import { albums, reviewsTracks, tracks, tracksStats } from "@/database/schema";
import { Track } from "@/schemas/track";
import { asc, count, desc, eq, sql } from "drizzle-orm";
import { createTrackStat } from "./stat";
import { getAlbumImage } from "./album";

export async function getTracks(limit?: number) {
  return await db.query.tracks.findMany({
    with: {
      album: true,
    },
    limit,
  });
}

export async function getTrackById(trackId: string) {
  return await db.query.tracks.findFirst({
    where: eq(tracks.id, trackId),
    with: {
      album: {
        with: {
          artist: true,
        },
      },
      stats: true,
      artistCredit: {
        with: {
          artistsCreditsNames: {
            with: {
              artist: true,
            },
          },
        },
      },
    },
  });
}

export async function getTrack(trackId: string) {
  return await db.query.tracks.findFirst({
    where: eq(tracks.id, trackId),
    with: {
      album: {
        with: {
          artist: true,
        },
      },
    },
  });
}

export async function createTrack(newTrack: Track) {
  const [track] = await db.insert(tracks).values(newTrack).returning();
  await createTrackStat(track.id);
  return track;
}

export async function getTrackReviews(
  trackId: string,
  limit?: number,
  offset = 0,
) {
  return await db.query.reviewsTracks.findMany({
    where: eq(reviewsTracks.entityId, trackId),
    with: {
      user: true,
    },
    orderBy: desc(reviewsTracks.createdAt),
    limit,
    offset,
  });
}

export async function getTrackReviewsCount(trackId: string) {
  const [c] = await db
    .select({ count: count() })
    .from(reviewsTracks)
    .where(eq(reviewsTracks.entityId, trackId));
  return c;
}

export async function getTrackImage(trackId: string): Promise<string | null> {
  const track = await getTrackById(trackId);
  if (!track) return null;

  return getAlbumImage(track.album.id);
}

export async function getTopTracks(artistId: string, limit: number = 5) {
  const result = await db
    .select({
      id: tracks.id,
      title: tracks.title,
      albumId: tracks.albumId,
      position: tracks.position,
      album: {
        id: albums.id,
        image: albums.image,
        artistId: albums.artistId,
        title: albums.title,
      },
      stats: {
        ratingAvg: tracksStats.ratingAvg,
      },
    })
    .from(tracks)
    .innerJoin(tracksStats, eq(tracks.id, tracksStats.entityId))
    .innerJoin(albums, eq(tracks.albumId, albums.id))
    .where(eq(albums.artistId, artistId))
    .orderBy(desc(tracksStats.ratingAvg))
    .limit(limit)
    .execute();

  return result.map((row) => ({
    id: row.id,
    title: row.title,
    albumId: row.albumId,
    position: row.position,
    album: {
      id: row.album.id,
      image: row.album.image,
      artistId: row.album.artistId,
      title: row.album.title,
    },
    stats: {
      ratingAvg: row.stats?.ratingAvg,
    },
  }));
}

export async function getFilteredTracks(query: string, limit?: number) {
  const filteredTracksQuery = db
    .select({
      id: tracks.id,
      position: tracks.position,
      title: tracks.title,
      image: tracks.image,
      length: tracks.length,
      albumId: tracks.albumId,
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

  const filteredTracks = await filteredTracksQuery;

  return filteredTracks;
}

export async function getTopTracksCards(limit?: number) {
  const topTracksQuery = db
    .select({
      id: tracks.id,
      title: tracks.title,
      length: tracks.length,
      image: tracks.image,
      position: tracks.position,
      albumId: tracks.albumId,
      artistsCredits: tracks.artistsCredits,
      ratingAvg: tracksStats.ratingAvg,
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

  const topTracksResults = await topTracksQuery;
  return topTracksResults;
}

export async function getTracksSearch(limit?: number, offset = 0) {
  return await db.query.tracks.findMany({
    limit,
    offset,
    orderBy: asc(tracks.title),
  });
}

export async function getTracksCount() {
  const [c] = await db.select({ count: count() }).from(tracks);
  return c;
}

export async function getPopularTracks(limit?: number) {
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

export async function getNewTracks(limit?: number) {
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

import { db } from "@/database/db";
import { albums, reviewsTracks, tracks, tracksStats } from "@/database/schema";
import { Track } from "@/schemas/track";
import { desc, eq } from "drizzle-orm";
import { createTrackStat } from "./stat";

export async function getTracks() {
  return await db.query.tracks.findMany({
    with: {
      album: true,
    },
  });
}

export async function getTrackById(trackId: string) {
  return await db.query.tracks.findFirst({
    where: eq(tracks.id, trackId),
    with: {
      album: true,
      stats: true,
      artist: true,
    },
  });
}

export async function getTrack(trackId: string) {
  return await db.query.tracks.findFirst({
    where: eq(tracks.id, trackId),
    with: {
      album: true,
      artist: true,
    },
  });
}

export async function createTrack(newTrack: Track) {
  const [track] = await db.insert(tracks).values(newTrack).returning();
  await createTrackStat(track.id);
  return track;
}

export async function getTrackReviews(trackId: string) {
  return await db.query.reviewsTracks.findMany({
    where: eq(reviewsTracks.entityId, trackId),
    with: {
      user: true,
    },
    orderBy: desc(reviewsTracks.createdAt),
  });
}

export async function getTrackImage(trackId: string): Promise<string | null> {
  const track = await getTrackById(trackId);
  return track?.album?.image || null;
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
    .where(eq(tracks.artistId, artistId))
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
      ratingAvg: row.stats.ratingAvg,
    },
  }));
}

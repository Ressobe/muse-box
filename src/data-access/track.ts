import { db } from "@/database/db";
import { reviewsTracks, tracks } from "@/database/schema";
import { Track } from "@/schemas/track";
import { eq } from "drizzle-orm";
import { createTrackStat } from "./stat";

export async function getTracks() {
  return await db.query.tracks.findMany();
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
  });
}

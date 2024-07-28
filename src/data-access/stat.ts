import { db } from "@/database/db";
import { albumsStats, artistsStats, tracksStats } from "@/database/schema";
import { Entity } from "@/types";
import { eq } from "drizzle-orm";

const statsTables = {
  artist: artistsStats,
  album: albumsStats,
  track: tracksStats,
};

export async function createArtistStat(artistId: string) {
  return await db.insert(artistsStats).values({
    entityId: artistId,
  });
}

export async function createAlbumStat(albumId: string) {
  return await db.insert(albumsStats).values({
    entityId: albumId,
  });
}

export async function createTrackStat(trackId: string) {
  return await db.insert(tracksStats).values({
    entityId: trackId,
  });
}

export async function getArtistStat(artistId: string) {
  return await db.query.artistsStats.findFirst({
    where: eq(artistsStats.entityId, artistId),
  });
}

export async function updateStatsNewRating(
  entityId: string,
  type: Entity,
  newRating: number,
) {
  const table = statsTables[type];

  if (!table) {
    throw new Error(`Unsupported entity type: ${type}`);
  }

  const [existingStat] = await db
    .select()
    .from(table)
    .where(eq(table.entityId, entityId));

  existingStat.ratingSum = existingStat.ratingSum ?? 0;
  existingStat.ratingCount = existingStat.ratingCount ?? 0;

  const newRatingSum = existingStat.ratingSum + newRating;
  const newReviewCount = existingStat.ratingCount + 1;

  let newAvgRating = 0;
  if (newReviewCount !== 0) {
    newAvgRating = newRatingSum / newReviewCount;
  }

  await db
    .update(table)
    .set({
      ratingSum: newRatingSum,
      ratingCount: newReviewCount,
      ratingAvg: Number(newAvgRating.toFixed(2)),
    })
    .where(eq(table.entityId, entityId));
}

export async function updateStatsDeleteRating(
  entityId: string,
  type: Entity,
  oldRating: number,
) {
  const table = statsTables[type];

  if (!table) {
    throw new Error(`Unsupported entity type: ${type}`);
  }

  const [existingStat] = await db
    .select()
    .from(table)
    .where(eq(table.entityId, entityId));

  existingStat.ratingSum = existingStat.ratingSum ?? 0;
  existingStat.ratingCount = existingStat.ratingCount ?? 1;

  const newRatingSum = existingStat.ratingSum - oldRating;
  const newReviewCount = existingStat.ratingCount - 1;

  let newAvgRating = 0;
  if (newReviewCount !== 0) {
    newAvgRating = newRatingSum / newReviewCount;
  }

  await db
    .update(table)
    .set({
      ratingSum: newRatingSum,
      ratingCount: newReviewCount,
      ratingAvg: Math.round(newAvgRating),
    })
    .where(eq(table.entityId, entityId));
}

export async function updateStatsUpdateRating(
  entityId: string,
  type: Entity,
  oldRating: number,
  newRating: number,
) {
  const table = statsTables[type];

  if (!table) {
    throw new Error(`Unsupported entity type: ${type}`);
  }

  const [existingStat] = await db
    .select()
    .from(table)
    .where(eq(table.entityId, entityId));

  existingStat.ratingSum = existingStat.ratingSum ?? 0;
  existingStat.ratingCount = existingStat.ratingCount ?? 1;

  const newRatingSum = existingStat.ratingSum - oldRating + newRating;
  const newReviewCount = existingStat.ratingCount;

  let newAvgRating = 0;
  if (newReviewCount !== 0) {
    newAvgRating = newRatingSum / newReviewCount;
  }

  await db
    .update(table)
    .set({
      ratingSum: newRatingSum,
      ratingCount: newReviewCount,
      ratingAvg: Math.round(newAvgRating),
    })
    .where(eq(table.entityId, entityId));
}

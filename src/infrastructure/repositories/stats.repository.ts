import {
  albumsStats,
  artistsStats,
  tracksStats,
} from "@/drizzle/database/schemas";
import { IStatsRepository } from "@/src/application/repositories/stats.repository.interface";
import { Stat } from "@/src/entities/models/stat";
import { db } from "@/drizzle/database/db";
import { eq } from "drizzle-orm";
import { Content } from "@/src/entities/models/content";

const statsTables = {
  artist: artistsStats,
  album: albumsStats,
  track: tracksStats,
};

export class StatsRepository implements IStatsRepository {
  async insertArtistStat(artistId: string): Promise<Stat> {
    const [stat] = await db
      .insert(artistsStats)
      .values({
        entityId: artistId,
      })
      .returning();
    return stat;
  }

  async insertAlbumStat(albumId: string): Promise<Stat> {
    const [stat] = await db
      .insert(albumsStats)
      .values({
        entityId: albumId,
      })
      .returning();
    return stat;
  }

  async insertTrackStat(trackId: string): Promise<Stat> {
    const [stat] = await db
      .insert(tracksStats)
      .values({
        entityId: trackId,
      })
      .returning();

    return stat;
  }

  async getStatsForArtist(artistId: string): Promise<Stat | undefined> {
    return await db.query.artistsStats.findFirst({
      where: eq(artistsStats.entityId, artistId),
    });
  }

  async getStatsForAlbum(albumId: string): Promise<Stat | undefined> {
    return await db.query.albumsStats.findFirst({
      where: eq(albumsStats.entityId, albumId),
    });
  }

  async getStatsForTrack(trackId: string): Promise<Stat | undefined> {
    return await db.query.tracksStats.findFirst({
      where: eq(tracksStats.entityId, trackId),
    });
  }

  async getStats(entityId: string, type: Content): Promise<Stat | undefined> {
    const table = statsTables[type];
    if (!table) {
      throw new Error(`Unsupported entity type: ${type}`);
    }

    let [existingStat] = await db
      .select()
      .from(table)
      .where(eq(table.entityId, entityId));

    return existingStat;
  }

  async updateStats(
    entityId: string,
    type: Content,
    newRatingSum: number,
    newReviewCount: number,
    newAvgRating: number,
  ): Promise<void> {
    const table = statsTables[type];
    if (!table) {
      throw new Error(`Unsupported entity type: ${type}`);
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
}

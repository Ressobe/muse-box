import {
  albumsStats,
  artistsStats,
  tracksStats,
} from "@/drizzle/database/schemas";
import { IStatsRepository } from "@/src/application/repositories/stats.repository.interface";
import { Stat } from "@/src/entities/models/stat";
import { db } from "@/drizzle/database/db";
import { eq } from "drizzle-orm";

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
}

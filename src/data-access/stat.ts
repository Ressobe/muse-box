import { db } from "@/database/db";
import { albumsStats, artistsStats, tracksStats } from "@/database/schema";
import { Entity } from "@/types";
import { reviewTables } from "@/types/review";
import { eq } from "drizzle-orm";

const statsTables = {
  artist: artistsStats,
  album: albumsStats,
  track: tracksStats,
};

export async function updateAverageRating(entityId: string, type: Entity) {
  // const table = reviewTables[type];
  // if (!table) {
  //   throw new Error(`Unsupported entity type: ${type}`);
  // }
  //
  // const result = await db
  //   .select({
  //     avgRating: db.raw("AVG(rating)"),
  //     reviewCount: db.raw("COUNT(*)"),
  //   })
  //   .from(table)
  //   .where(eq(table.entityId, entityId));
  //
  // const { avgRating, reviewCount } = result[0];
  //
  // const statsTable = statsTables[type];
  // if (!statsTable) {
  //   throw new Error(`Unsupported entity type: ${type}`);
  // }
  //
  // await db
  //   .update(statsTable)
  //   .set({
  //     avgRating,
  //     reviewCount,
  //   })
  //   .where(eq(statsTable.entityId, entityId));
}

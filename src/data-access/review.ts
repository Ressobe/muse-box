import { db } from "@/database/db";
import {
  reviewsAlbums,
  reviewsArtists,
  reviewsTracks,
} from "@/database/schema";
import { Entity } from "@/types";

export async function insertReview(
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Entity,
) {
  if (type === "artist") {
    return await db
      .insert(reviewsArtists)
      .values({
        rating,
        comment,
        entityId: entityId,
        userId,
      })
      .returning();
  }
  if (type === "album") {
    return await db
      .insert(reviewsAlbums)
      .values({
        rating,
        comment,
        entityId: entityId,
        userId,
      })
      .returning();
  }
  if (type === "track") {
    return await db
      .insert(reviewsTracks)
      .values({
        rating,
        comment,
        entityId: entityId,
        userId,
      })
      .returning();
  }
}

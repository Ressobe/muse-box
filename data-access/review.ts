import { db } from "@/drizzle/database/db";
import { Entity } from "@/types";
import { reviewTables } from "@/types/review";
import { and, eq } from "drizzle-orm";
import {
  updateStatsDeleteRating,
  updateStatsNewRating,
  updateStatsUpdateRating,
} from "@/data-access/stat";

export async function getReviewById(reviewId: string, type: Entity) {
  const table = reviewTables[type];

  if (!table) {
    throw new Error(`Unsupported entity type: ${type}`);
  }

  const [review] = await db.select().from(table).where(eq(table.id, reviewId));

  return review;
}

export async function insertReview(
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Entity,
) {
  const table = reviewTables[type];

  if (!table) {
    throw new Error(`Unsupported entity type: ${type}`);
  }

  const [review] = await db
    .insert(table)
    .values({
      entityId: entityId,
      userId: userId,
      comment: comment,
      rating: rating,
      createdAt: new Date(),
    })
    .returning();

  if (review) {
    await updateStatsNewRating(entityId, type, rating);
  }
  return review;
}

export async function deleteReview(
  entityId: string,
  type: Entity,
  reviewId: string,
) {
  const table = reviewTables[type];

  if (!table) {
    throw new Error(`Unsupported entity type: ${type}`);
  }

  const [review] = await db
    .delete(table)
    .where(and(eq(table.entityId, entityId), eq(table.id, reviewId)))
    .returning();

  if (review) {
    await updateStatsDeleteRating(entityId, type, review.rating);
  }

  return review;
}

export async function updateReview(
  reviewId: string,
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Entity,
) {
  const table = reviewTables[type];

  if (!table) {
    throw new Error(`Unsupported entity type: ${type}`);
  }

  const { rating: oldRating } = await getReviewById(reviewId, type);

  const [review] = await db
    .update(table)
    .set({
      comment,
      rating,
      createdAt: new Date(),
    })
    .where(
      and(
        eq(table.id, reviewId),
        eq(table.userId, userId),
        eq(table.entityId, entityId),
      ),
    )
    .returning();

  if (review) {
    await updateStatsUpdateRating(entityId, type, oldRating, rating);
  }

  return review;
}

export async function findReview(
  userId: string,
  entityId: string,
  type: Entity,
) {
  const table = reviewTables[type];

  if (!table) {
    throw new Error(`Unsupported entity type: ${type}`);
  }

  const [review] = await db
    .select()
    .from(table)
    .where(and(eq(table.userId, userId), eq(table.entityId, entityId)));

  return review;
}

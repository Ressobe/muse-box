import { db } from "@/database/db";
import { Entity } from "@/types";
import { reviewTables } from "@/types/review";
import { and, eq } from "drizzle-orm";

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

  return await db
    .insert(table)
    .values({
      rating,
      comment,
      entityId,
      userId,
    })
    .returning();
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

  return await db
    .delete(table)
    .where(and(eq(table.entityId, entityId), eq(table.id, reviewId)))
    .returning();
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

  return await db
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
}

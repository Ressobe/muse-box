import { insertReview } from "@/data-access/review";
import { Entity } from "@/types";

export async function createReviewUseCase(
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Entity,
) {
  // parse with drizzle zod
  const review = await insertReview(entityId, userId, comment, rating, type);
  if (!review) {
    throw "Review not created!";
  }
  return review;
}

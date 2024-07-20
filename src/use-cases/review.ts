import { deleteReview, insertReview, updateReview } from "@/data-access/review";
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
    return null;
  }
  return review;
}

export async function removeReviewUseCase(
  entityId: string,
  type: Entity,
  reviewId: string,
) {
  const review = await deleteReview(entityId, type, reviewId);
  if (review.length === 0) {
    return null;
  }
  return review;
}

export async function editReviewUseCase(
  reviewId: string,
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Entity,
) {
  const review = await updateReview(
    reviewId,
    entityId,
    userId,
    comment,
    rating,
    type,
  );
  if (!review) {
    return null;
  }
  return review;
}

import { editReviewUseCase } from "@/src/application/use-cases/review/edit-review.use-case";
import { findReviewUseCase } from "@/src/application/use-cases/review/find-review.use-case";
import { updateStatsForUpdateRatingUseCase } from "@/src/application/use-cases/stats/update-stats-for-update-rating.use-case";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import { contentSchema } from "@/src/entities/models/content";
import { z } from "zod";

const inputSchema = z.object({
  reviewId: z.string(),
  entityId: z.string(),
  userId: z.string(),
  comment: z.string(),
  rating: z.number(),
  type: contentSchema,
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function editReviewController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in editReviewController");
  }

  const { reviewId, entityId, userId, comment, rating, type } = data;

  const existingReview = await findReviewUseCase(userId, entityId, type);
  if (!existingReview) {
    throw new NotFoundError("Review not founded");
  }

  await updateStatsForUpdateRatingUseCase(
    entityId,
    type,
    existingReview.rating,
    rating,
  );

  const updatedReview = await editReviewUseCase(
    reviewId,
    entityId,
    userId,
    comment,
    rating,
    type,
  );

  return updatedReview;
}

import { removeReviewUseCase } from "@/src/application/use-cases/review/remove-review.use-case";
import { updateStatsForRemoveRatingUseCase } from "@/src/application/use-cases/stats/update-stats-for-remove-rating.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { contentSchema } from "@/src/entities/models/content";
import { z } from "zod";

const inputSchema = z.object({
  entityId: z.string(),
  type: contentSchema,
  reviewId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function removeReviewController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in removeReviewController");
  }

  const { entityId, type, reviewId } = data;

  const removedReview = await removeReviewUseCase(entityId, type, reviewId);

  await updateStatsForRemoveRatingUseCase(entityId, type, removedReview.rating);

  return removedReview;
}

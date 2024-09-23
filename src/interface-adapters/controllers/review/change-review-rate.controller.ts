import { createReviewUseCase } from "@/src/application/use-cases/review/create-review.use-case";
import { findReviewUseCase } from "@/src/application/use-cases/review/find-review.use-case";
import { updateReviewUseCase } from "@/src/application/use-cases/review/update-review.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { contentSchema } from "@/src/entities/models/content";
import { updateStatsForUpdateRatingUseCase } from "@/src/application/use-cases/stats/update-stats-for-update-rating.use-case";
import { z } from "zod";

const inputSchema = z.object({
  entityId: z.string(),
  userId: z.string(),
  rating: z.number(),
  comment: z.string(),
  type: contentSchema,
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function changeReviewRateController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in changeReviewRateCotroller");
  }

  const { entityId, userId, rating, comment, type } = data;

  let review = await findReviewUseCase(userId, entityId, type);

  if (!review) {
    review = await createReviewUseCase(entityId, userId, comment, rating, type);
  }

  await updateStatsForUpdateRatingUseCase(
    entityId,
    type,
    review.rating,
    rating,
  );

  return await updateReviewUseCase(
    review.id,
    entityId,
    userId,
    comment,
    rating,
    type,
  );
}

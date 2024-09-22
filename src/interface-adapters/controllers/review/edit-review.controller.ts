import { editReviewUseCase } from "@/src/application/use-cases/review/edit-review.use-case";
import { InputParseError } from "@/src/entities/errors/common";
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

import * as z from "zod";

export const createReviewSchema = z.object({
  entityId: z.string(),
  userId: z.string(),
  comment: z.string(),
  rating: z.number().min(0).max(10),
  // type: Entity,
});

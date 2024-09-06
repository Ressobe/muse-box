import { z } from "zod";

export const reviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  entityId: z.string(),
  rating: z.number(),
  comment: z.string().optional(),
  createdAt: z.date(),
  entityType: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;

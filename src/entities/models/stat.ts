import { z } from "zod";

export const statSchema = z.object({
  entityId: z.string(),
  likes: z.number().default(0),
  popularity: z.number().default(0),
  ratingAvg: z.number().default(0).nullable(),
  ratingSum: z.number().default(0).nullable(),
  ratingCount: z.number().default(0).nullable(),
});

export const ratingSchema = statSchema.pick({
  ratingAvg: true,
  ratingSum: true,
  ratingCount: true,
});

export type RatingStats = z.infer<typeof ratingSchema>;

export const ratingAvgSchema = statSchema.pick({ ratingAvg: true });

export type Stat = z.infer<typeof statSchema>;

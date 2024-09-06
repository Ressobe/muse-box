import { z } from "zod";

export const statSchema = z.object({
  entityId: z.string(),
  likes: z.number().default(0),
  popularity: z.number().default(0),
  ratingAvg: z.number().default(0),
  ratingSum: z.number().default(0),
  ratingCount: z.number().default(0),
});

export type Stat = z.infer<typeof statSchema>;

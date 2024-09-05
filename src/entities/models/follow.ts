import { z } from "zod";

export const followSchema = z.object({
  followerId: z.string(),
  followingId: z.string(),
});

export type Follow = z.infer<typeof followSchema>;

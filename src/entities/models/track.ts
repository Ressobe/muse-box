import { z } from "zod";

export const trackSchema = z.object({
  id: z.string(),
  artistsCredits: z.string(),
  albumId: z.string(),
  position: z.number(),
  title: z.string(),
  image: z.string().default(""),
  length: z.number().default(0),
});

export type Track = z.infer<typeof trackSchema>;

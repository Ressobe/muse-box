import { z } from "zod";

export const albumSchema = z.object({
  id: z.string(),
  artistId: z.string(),
  typeId: z.number(),
  title: z.string(),
  image: z.string().default("").nullable(),
  length: z.number().default(0).nullable(),
  releaseDate: z.date().nullable(),
});

export type Album = z.infer<typeof albumSchema>;

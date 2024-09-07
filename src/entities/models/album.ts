import { z } from "zod";
import { ratingSchema } from "./stat";

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

export const albumWithStatsSchema = albumSchema.extend({
  stats: ratingSchema.nullable(),
});

export type AlbumWithStats = z.infer<typeof albumWithStatsSchema>;

export const albumWithRatingAvg = albumSchema.extend({
  ratingAvg: z.number().nullable(),
});

export type AlbumWithRatingAvg = z.infer<typeof albumWithRatingAvg>;

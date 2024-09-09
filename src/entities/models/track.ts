import { z } from "zod";
import { albumSchema, albumSelectSchema } from "./album";

export const trackSchema = z.object({
  id: z.string(),
  artistsCredits: z.string(),
  albumId: z.string(),
  position: z.number(),
  title: z.string(),
  image: z.string().default("").nullable(),
  length: z.number().default(0).nullable(),
});

export type Track = z.infer<typeof trackSchema>;

export const trackSelectSchema = trackSchema.extend({
  artistsCredits: z.string().nullish(),
  length: z.number().nullish(),
  image: z.string().nullish(),
});

export const trackWithStatsSchema = trackSchema.extend({});

export const trackWithAlbumSchema = trackSchema.extend({
  album: albumSchema,
});

export type TrackWithAlbum = z.infer<typeof trackWithAlbumSchema>;

export const trackWithRatingAvg = trackSelectSchema.extend({
  ratingAvg: z.number().nullable(),
});

export const trackWithAlbumAndRatingAvgSchema = trackWithRatingAvg.extend({
  album: albumSelectSchema,
});

export type TrackWithAlbumAndRatingAvg = z.infer<
  typeof trackWithAlbumAndRatingAvgSchema
>;

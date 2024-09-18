import { z } from "zod";
import { albumSchema, albumSelectSchema } from "./album";
import { artistSelectSchema } from "./artist";
import { artistCreditSchema } from "./artistCredit";
import { artistCreditNameSchema } from "./artistCreditName";

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

export const trackWithStatsSchema = trackSchema.extend({
  stats: z.object({
    ratingAvg: z.number().nullable(),
    ratingCount: z.number().nullable(),
    ratingSum: z.number().nullable(),
  }),
});

export const trackWithAlbumSchema = trackSchema.extend({
  album: albumSchema,
});

export type TrackWithAlbum = z.infer<typeof trackWithAlbumSchema>;

export const trackWithAlbumAndStatsSchema = trackWithAlbumSchema.extend({
  stats: z
    .object({
      ratingAvg: z.number().nullable(),
      ratingCount: z.number().nullable(),
    })
    .nullable(),
  defaultRate: z.number().nullish(),
  isLiked: z.boolean().nullish(),
});

export type TrackWithAlbumAndStats = z.infer<
  typeof trackWithAlbumAndStatsSchema
>;

export const trackWithRatingAvg = trackSelectSchema.extend({
  ratingAvg: z.number().nullable(),
});

export const trackWithAlbumAndRatingAvgSchema = trackWithRatingAvg.extend({
  album: albumSelectSchema,
});

export type TrackWithAlbumAndRatingAvg = z.infer<
  typeof trackWithAlbumAndRatingAvgSchema
>;

const trackWithRelationsSchema = trackSchema.extend({
  album: albumSchema.extend({
    artist: artistSelectSchema,
  }),
  stats: z.object({
    ratingAvg: z.number().nullable(),
    ratingCount: z.number().nullable(),
    ratingSum: z.number().nullable(),
  }),
  artistCredit: z.object({
    id: z.string(),
    name: z.string().nullable(),
    artistsCreditsNames: artistCreditNameSchema
      .extend({ artist: artistSelectSchema })
      .array(),
  }),
  defaultRate: z.number().optional(),
  isLiked: z.boolean().optional(),
});

export type TrackWithRelations = z.infer<typeof trackWithRelationsSchema>;

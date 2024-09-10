import { z } from "zod";
import { ratingSchema } from "./stat";
import { artistSchema } from "./artist";

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
  defaultRate: z.number().nullish(),
  isLiked: z.boolean().nullish(),
});

export type AlbumWithStats = z.infer<typeof albumWithStatsSchema>;

export const albumSelectSchema = albumSchema.extend({
  typeId: z.number().nullish(),
  length: z.number().nullish(),
  releaseDate: z.number().nullish(),
});

export type AlbumSelect = z.infer<typeof albumSelectSchema>;

export const albumWithRatingAvg = albumSchema.extend({
  ratingAvg: z.number().nullable(),
});

export const albumWithTracksSchema = albumWithStatsSchema.extend({
  tracks: z
    .object({
      id: z.string(),
      artistsCredits: z.string(),
      albumId: z.string(),
      position: z.number(),
      title: z.string(),
      image: z.string().default("").nullable(),
      length: z.number().default(0).nullable(),
      stats: z.object({
        ratingAvg: z.number().nullable(),
        ratingSum: z.number().nullable(),
        ratingCount: z.number().nullable(),
      }),
    })
    .array(),
  albumType: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export const albumWithRelationsSchema = albumWithTracksSchema.extend({
  artist: artistSchema,
});

export type AlbumWithRatingAvg = z.infer<typeof albumWithRatingAvg>;

export type AlbumWithTracks = z.infer<typeof albumWithTracksSchema>;

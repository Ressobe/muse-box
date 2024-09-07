import { z } from "zod";

export const artistSchema = z.object({
  id: z.string(),
  name: z.string(),

  type: z.number(),
  country: z.string(),
  gender: z.number(),

  image: z.string().default("").optional().nullable(),
  bio: z.string().default("").nullable(),
  beginDateYear: z.number().nullable().optional(),
  beginDateMonth: z.number().nullable().optional(),
  beginDateDay: z.number().nullable().optional(),

  endDateYear: z.number().nullable().optional(),
  endDateMonth: z.number().nullable().optional(),
  endDateDay: z.number().nullable().optional(),
});

export type Artist = z.infer<typeof artistSchema>;

export const artistSelectSchema = artistSchema.extend({
  type: artistSchema.shape.type.nullable(),
  country: artistSchema.shape.country.nullable(),
  gender: artistSchema.shape.gender.nullable(),
});

export type ArtistSelect = z.infer<typeof artistSelectSchema>;

const artistWithRatingAvgSchema = artistSelectSchema.extend({
  ratingAvg: z.number().nullable(),
});

export type ArtistWithRatingAvg = z.infer<typeof artistWithRatingAvgSchema>;

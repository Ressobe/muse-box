import { z } from "zod";
import { artistSelectSchema } from "./artist";
import { albumSchema } from "./album";
import { trackSchema } from "./track";
import { userSchema } from "./user";

export const reviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  entityId: z.string(),
  rating: z.number(),
  comment: z.string().nullable(),
  createdAt: z.date().nullable(),
  entityType: z.string(),
});

export const reviewSelectSchema = reviewSchema.extend({
  entityType: z.string().nullish(),
  entityId: z.string().nullish(),
});

export type Review = z.infer<typeof reviewSchema>;

export const reviewWithArtistSchema = reviewSchema.extend({
  artist: artistSelectSchema,
});

export const reviewWithAlbumSchema = reviewSchema.extend({
  album: albumSchema,
});

export const reviewWithTrackSchema = reviewSchema.extend({
  track: trackSchema,
});

export const reviewWithUserSchema = reviewSelectSchema.extend({
  user: userSchema,
});

export const reviewWithTrackAndUserSchema = reviewSchema.extend({
  track: trackSchema,
  user: userSchema,
});

export const reviewWithAlbumAndUserSchema = reviewSchema.extend({
  album: albumSchema,
  user: userSchema,
});

export type ReviewWithArtist = z.infer<typeof reviewWithArtistSchema>;
export type ReviewWithAlbum = z.infer<typeof reviewWithAlbumSchema>;
export type ReviewWithTrack = z.infer<typeof reviewWithTrackSchema>;
export type ReviewWithUser = z.infer<typeof reviewWithUserSchema>;

export type ReviewWithTrackAndUser = z.infer<
  typeof reviewWithTrackAndUserSchema
>;

export type ReviewWithAlbumAndUser = z.infer<
  typeof reviewWithAlbumAndUserSchema
>;

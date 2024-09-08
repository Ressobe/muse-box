import { z } from "zod";
import { artistSelectSchema } from "./artist";
import { albumSchema } from "./album";
import { trackSchema } from "./track";

export const reviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  entityId: z.string(),
  rating: z.number(),
  comment: z.string().nullable(),
  createdAt: z.date().nullable(),
  entityType: z.string(),
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

export type ReviewWithArtist = z.infer<typeof reviewWithArtistSchema>;
export type ReviewWithAlbum = z.infer<typeof reviewWithAlbumSchema>;
export type ReviewWithTrack = z.infer<typeof reviewWithTrackSchema>;

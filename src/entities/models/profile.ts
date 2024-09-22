import { z } from "zod";

export const profileSchema = z.object({
  userId: z.string(),
  favouriteArtistId: z.string().nullable(),
  favouriteAlbumId: z.string().nullable(),
  favouriteTrackId: z.string().nullable(),
});

export const profileWithRelationsSchema = profileSchema.extend({
  user: z.object({
    image: z.string().nullable(),
    id: z.string(),
    name: z.string(),
  }),

  amountOfFollowers: z.number(),
  amountOfFollowing: z.number(),
});

export type Profile = z.infer<typeof profileSchema>;

export type ProfileWithRelations = z.infer<typeof profileWithRelationsSchema>;

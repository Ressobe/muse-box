import { z } from "zod";

export const profileSchema = z.object({
  userId: z.string(),
  favoriteArtistId: z.string().nullable(),
  favoriteAlbumId: z.string().nullable(),
  favoriteTrackId: z.string().nullable(),
});

export type Profile = z.infer<typeof profileSchema>;

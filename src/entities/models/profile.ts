import { z } from "zod";

export const profileSchema = z.object({
  userId: z.string(),
  favoriteArtistId: z.string(),
  favoriteAlbumId: z.string(),
  favoriteTrackId: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;

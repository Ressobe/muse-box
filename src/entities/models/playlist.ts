import { z } from "zod";

export const playlistSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
});

export type Playlist = z.infer<typeof playlistSchema>;

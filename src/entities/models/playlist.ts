import { z } from "zod";
import { contentSchema } from "@/src/entities/models/content";

export const playlistSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
});

export const playlistItemSchema = z.object({
  id: z.string(),
  playlistId: z.string(),
  itemType: contentSchema,
  itemId: z.string(),
});

export type Playlist = z.infer<typeof playlistSchema>;
export type PlaylistItem = z.infer<typeof playlistItemSchema>;

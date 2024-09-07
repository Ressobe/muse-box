import { z } from "zod";

export const playlistSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
});

export const playlistItemSchema = z.object({
  id: z.string(),
  playlistId: z.string(),
  itemType: z.string(),
  itemId: z.string(),
});

export type Playlist = z.infer<typeof playlistSchema>;
export type PlaylistItem = z.infer<typeof playlistItemSchema>;

export const playlistWithItemsSchema = playlistSchema.extend({
  items: playlistItemSchema.array(),
});

export type PlaylistWithItems = z.infer<typeof playlistWithItemsSchema>;

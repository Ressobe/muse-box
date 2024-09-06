import { z } from "zod";

export const notificationTypes = z.enum([
  "follow",
  "favourite",
  "artist_review",
  "album_review",
  "track_review",
]);

export type NotificationType = z.infer<typeof notificationTypes>;

export const notificationSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  resourceId: z.string(),
  message: z.string(),
  createdAt: z.date(),
  type: notificationTypes,
});

export type Notification = z.infer<typeof notificationSchema>;

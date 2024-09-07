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
  createdAt: z.date().nullable(),
  type: notificationTypes,
});

export type Notification = z.infer<typeof notificationSchema>;

export const notificationRecipientsSchema = z.object({
  notificationId: z.string(),
  ownerId: z.string(),
  isRead: z.boolean().default(false).nullable(),
});

export type NotificationRecipients = z.infer<
  typeof notificationRecipientsSchema
>;

export const notificationRecipientsWithNotificationSchema =
  notificationRecipientsSchema.extend({
    notification: notificationSchema,
  });

export type NotificationRecipientsWithNotification = z.infer<
  typeof notificationRecipientsWithNotificationSchema
>;

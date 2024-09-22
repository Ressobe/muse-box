import { z } from "zod";
import { userSelectSchema } from "./user";
import {
  reviewWithAlbumSchema,
  reviewWithArtistSchema,
  reviewWithTrackSchema,
} from "./review";

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

export const notificationBaseSchema = z.object({
  id: z.string(),
  type: notificationTypes,
  createdAt: z.date().nullable(),
  senderId: z.string(),
  resourceId: z.string(),
  message: z.string(),
  isRead: z.boolean().nullable(),
});

export const followNotificationSchema = notificationBaseSchema.extend({
  type: notificationTypes.extract(["follow"]),
  sender: userSelectSchema,
});

export const artistReviewNotificationSchema = notificationBaseSchema.extend({
  type: notificationTypes.extract(["artist_review"]),
  artistReview: reviewWithArtistSchema.extend({
    user: userSelectSchema,
  }),
});

export const albumReviewNotificationSchema = notificationBaseSchema.extend({
  type: notificationTypes.extract(["album_review"]),
  albumReview: reviewWithAlbumSchema.extend({
    user: userSelectSchema,
  }),
});

export const trackReviewNotificationSchema = notificationBaseSchema.extend({
  type: notificationTypes.extract(["track_review"]),
  trackReview: reviewWithTrackSchema.extend({
    user: userSelectSchema,
  }),
});

export type FollowNotification = z.infer<typeof followNotificationSchema>;
export type ArtistReviewNotification = z.infer<
  typeof artistReviewNotificationSchema
>;
export type AlbumReviewNotification = z.infer<
  typeof albumReviewNotificationSchema
>;
export type TrackReviewNotification = z.infer<
  typeof trackReviewNotificationSchema
>;

export type Notifications =
  | FollowNotification
  | ArtistReviewNotification
  | AlbumReviewNotification
  | TrackReviewNotification;

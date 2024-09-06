import { Album } from "@/schemas/album";
import { Artist } from "@/schemas/artist";
import { Track } from "@/schemas/track";

export const notificationTypes = {
  FOLLOW: "follow",
  FAVOURITE: "favourite",
  ARTIST_REVIEW: "artist_review",
  ALBUM_REVIEW: "album_review",
  TRACK_REVIEW: "track_review",
} as const;

export type NotificationType =
  (typeof notificationTypes)[keyof typeof notificationTypes];

export interface NotificationBase {
  id: string;
  type: NotificationType;
  createdAt: Date | null;
  senderId: string;
  resourceId: string;
  message: string;
  isRead: boolean | null;
}

interface Sender {
  id: string;
  name: string | null;
  email: string;
  image: string;
}

export interface FollowNotification extends NotificationBase {
  type: typeof notificationTypes.FOLLOW;
  sender: Sender;
}

interface ArtistReview {
  id: string;
  userId: string;
  entityId: string;
  rating: number;
  comment: string | null;
  createdAt: Date | null;
  user: Sender;
  artist: Artist;
}

export interface ArtistReviewNotification extends NotificationBase {
  type: typeof notificationTypes.ARTIST_REVIEW;
  artistReview: ArtistReview;
}

interface AlbumReview {
  id: string;
  userId: string;
  entityId: string;
  rating: number;
  comment: string | null;
  createdAt: Date | null;
  album: Album;
  user: Sender;
}

export interface AlbumReviewNotification extends NotificationBase {
  type: typeof notificationTypes.ALBUM_REVIEW;
  albumReview: AlbumReview;
}

interface TrackReview {
  id: string;
  userId: string;
  entityId: string;
  rating: number;
  comment: string | null;
  createdAt: Date | null;
  user: Sender;
  track: Track;
}

export interface TrackReviewNotification extends NotificationBase {
  type: typeof notificationTypes.TRACK_REVIEW;
  trackReview: TrackReview;
}

export type NotificationT =
  | FollowNotification
  | ArtistReviewNotification
  | AlbumReviewNotification
  | TrackReviewNotification;

export type OptimisticActionNotification =
  | { type: "add"; notification: NotificationT }
  | { type: "delete"; notificationId: string };

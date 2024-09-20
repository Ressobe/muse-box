import { getAlbumUseCase } from "@/src/application/use-cases/album/get-album.use-case";
import { getArtistUseCase } from "@/src/application/use-cases/artist/get-artist.use-case";
import { getNotificationsForUserUseCase } from "@/src/application/use-cases/notification/get-notifications-for-user.use-case";
import { getReviewForAlbumOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-album-owned-by-user.use-case";
import { getReviewForArtistOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-artist-owned-by-user.use-case";
import { getReviewForTrackOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-track-owned-by-user.use-case";
import { getTrackUseCase } from "@/src/application/use-cases/track/get-track.use-case";
import { getUserByIdUseCase } from "@/src/application/use-cases/user/get-user-by-id.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import {
  AlbumReviewNotification,
  ArtistReviewNotification,
  FollowNotification,
  Notifications,
  TrackReviewNotification,
} from "@/src/entities/models/notification";
import { z } from "zod";

const inputSchema = z.object({
  userId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getNotificationsForUserController(
  input: ControllerInput,
): Promise<Notifications[]> {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError(
      "Invalid input in getNotificationsForUserController",
    );
  }

  const { userId } = data;

  const notifications = await getNotificationsForUserUseCase(userId);

  const notificationsWithResource = await Promise.all(
    notifications.map(async ({ notification }) => {
      switch (notification.type) {
        case "follow": {
          const sender = await getUserByIdUseCase(notification.senderId);

          if (!sender) {
            throw new Error("Sender doesn't exist!");
          }

          return {
            ...notification,
            sender: {
              id: sender.id,
              name: sender.name,
              email: sender.email,
              image: sender.image,
            },
          } as FollowNotification;
        }
        case "artist_review": {
          const artistReview = await getReviewForArtistOwnedByUserUseCase(
            notification.resourceId,
            notification.senderId,
          );
          const artist = await getArtistUseCase(notification.resourceId);

          if (!artist || !artistReview) {
            throw new Error(" doesn't exist!");
          }
          return {
            ...notification,
            artistReview,
          } as ArtistReviewNotification;
        }
        case "album_review": {
          const albumReview = await getReviewForAlbumOwnedByUserUseCase(
            notification.resourceId,
            notification.senderId,
          );
          const album = await getAlbumUseCase(notification.resourceId);
          if (!album || !albumReview) {
            throw new Error("Album doesn't exist!");
          }

          return {
            ...notification,
            albumReview,
          } as AlbumReviewNotification;
        }
        case "track_review": {
          const trackReview = await getReviewForTrackOwnedByUserUseCase(
            notification.resourceId,
            notification.senderId,
          );
          const track = await getTrackUseCase(notification.resourceId);
          if (!track || !trackReview) {
            throw new Error("Track doesn't exist!");
          }
          return {
            ...notification,
            trackReview,
          } as TrackReviewNotification;
        }
        default: {
          throw new Error("Something went wrong!");
        }
      }
    }),
  );

  return notificationsWithResource;
}

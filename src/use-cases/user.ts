import { getAlbum, getAlbumById } from "@/data-access/album";
import { getArtist, getArtistById } from "@/data-access/artist";
import { getFollow } from "@/data-access/follow";
import { getPlaylistByUserIdAndNameWithItems } from "@/data-access/playlist";
import { createProfile } from "@/data-access/profile";
import { getTrack, getTrackById } from "@/data-access/track";
import {
  createUser,
  getUserAlbumReview,
  getUserArtistReview,
  getUserArtistReview2,
  getUserById,
  getUserFavourite,
  getUserNotifications,
  getUserPlaylists,
  getUserTrackReview,
  removeFavourite,
  updateFavourite,
} from "@/data-access/user";
import { Entity, entityToPlaylists } from "@/types";
import {
  AlbumReviewNotification,
  ArtistReviewNotification,
  FollowNotification,
  NotificationT,
  notificationTypes,
  TrackReviewNotification,
} from "@/types/notification";

export async function createUserUseCase(
  email: string,
  name: string,
  password: string,
) {
  const user = await createUser(email, name, password);
  await createProfile(user.id);
  return user;
}

export async function getUserPlaylistsUseCase(userId: string) {
  return await getUserPlaylists(userId);
}

export async function getUserArtistReviewUseCase(
  userId: string,
  artistId: string,
) {
  return await getUserArtistReview(userId, artistId);
}

export async function getUserFavourtiesUseCase(userId: string) {
  const fav = await getUserFavourite(userId);
  if (!fav) {
    return null;
  }

  const artist = fav.favoriteArtistId
    ? await getArtistById(fav.favoriteArtistId)
    : null;

  const album = fav.favoriteAlbumId
    ? await getAlbumById(fav.favoriteAlbumId)
    : null;

  const track = fav.favoriteTrackId
    ? await getTrackById(fav.favoriteTrackId)
    : null;

  return {
    artist,
    album,
    track,
  };
}

export async function getUserLikedArtistsUseCase(userId: string) {
  const playlistName = entityToPlaylists["artist"];
  const playlist = await getPlaylistByUserIdAndNameWithItems(
    userId,
    playlistName,
  );
  if (!playlist) {
    return null;
  }

  const artists = await Promise.all(
    playlist.items.map(async (item) => {
      const artist = await getArtist(item.itemId);

      if (!artist) {
        throw new Error("Invalid artist id");
      }
      return {
        ...artist,
      };
    }),
  );

  return artists;
}

export async function getUserLikedAlbumsUseCase(userId: string) {
  const playlistName = entityToPlaylists["album"];
  const playlist = await getPlaylistByUserIdAndNameWithItems(
    userId,
    playlistName,
  );
  if (!playlist) {
    return null;
  }

  const albums = await Promise.all(
    playlist.items.map(async (item) => {
      const album = await getAlbum(item.itemId);
      if (!album) {
        throw new Error("Invalid album id");
      }
      return {
        ...album,
      };
    }),
  );

  return albums;
}

export async function getUserLikedTracksUseCase(userId: string) {
  const playlistName = entityToPlaylists["track"];
  const playlist = await getPlaylistByUserIdAndNameWithItems(
    userId,
    playlistName,
  );
  if (!playlist) {
    return null;
  }

  const tracks = await Promise.all(
    playlist.items.map(async (item) => {
      const track = await getTrack(item.itemId);
      if (!track) {
        throw new Error("Invalid track id");
      }
      return {
        ...track,
      };
    }),
  );

  return tracks;
}

export async function selectFavouriteUseCase(
  entityId: string,
  type: Entity,
  userId: string,
) {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("User not found!");
  }

  return await updateFavourite(userId, entityId, type);
}

export async function removeFavouriteUseCase(type: Entity, userId: string) {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("User not found!");
  }

  return await removeFavourite(userId, type);
}

export async function isUserFollowingProfileUseCase(
  userId: string,
  profileId: string,
) {
  const follow = await getFollow(userId, profileId);
  return !!follow;
}

export async function getUserNotificationsUseCase(
  userId: string,
): Promise<NotificationT[]> {
  const notifications = await getUserNotifications(userId);

  let notificationsWithResource = await Promise.all(
    notifications.map(async (item) => {
      switch (item.type) {
        case notificationTypes.FOLLOW: {
          const sender = await getUserById(item.senderId);

          if (!sender) {
            throw new Error("Sender doesn't exist!");
          }

          return {
            ...item,
            sender: {
              id: sender.id,
              name: sender.name,
              email: sender.email,
              image: sender.image,
            },
          } as FollowNotification;
        }
        case notificationTypes.ARTIST_REVIEW: {
          const artistReview = await getUserArtistReview2(
            item.senderId,
            item.resourceId,
          );
          if (!artistReview) {
            throw new Error("Artist doesn't exist!");
          }
          return {
            ...item,
            artistReview,
          } as ArtistReviewNotification;
        }
        case notificationTypes.ALBUM_REVIEW: {
          const albumReview = await getUserAlbumReview(
            item.senderId,
            item.resourceId,
          );
          if (!albumReview) {
            throw new Error("Album doesn't exist!");
          }
          return {
            ...item,
            albumReview,
          } as AlbumReviewNotification;
        }
        case notificationTypes.TRACK_REVIEW: {
          const trackReview = await getUserTrackReview(
            item.senderId,
            item.resourceId,
          );
          if (!trackReview) {
            throw new Error("Track doesn't exist!");
          }
          return {
            ...item,
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

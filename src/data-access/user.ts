import { db } from "@/database/db";
import * as z from "zod";
import { SettingsSchema } from "@/schemas/auth";
import {
  notificationRecipients,
  playlists,
  reviewsAlbums,
  reviewsArtists,
  reviewsTracks,
  userProfiles,
  users,
} from "@/database/schema";
import { and, desc, eq, not } from "drizzle-orm";
import { Entity } from "@/types";
import { TAlbumReview, TArtistReview, TTrackReview } from "@/types/review";

const LIMIT = 5;

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

export async function getUserById(userId: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
}

export async function createUser(
  email: string,
  name: string,
  password: string,
) {
  const [user] = await db
    .insert(users)
    .values({
      email: email,
      name: name,
      password: password,
    })
    .returning();
  return user;
}

export async function verifyUser(userId: string, email: string) {
  await db
    .update(users)
    .set({
      email: email,
      emailVerified: new Date(),
    })
    .where(eq(users.id, userId));
}

export async function updateUserPassword(userId: string, newPassword: string) {
  await db
    .update(users)
    .set({ password: newPassword })
    .where(eq(users.id, userId));
}

export async function updateUserImage(userId: string, newImage: string) {
  return await db
    .update(users)
    .set({ image: newImage })
    .where(eq(users.id, userId));
}

export async function getUserImage(userId: string) {
  const [img] = await db
    .select({ image: users.image })
    .from(users)
    .where(eq(users.id, userId));
  return img;
}

export async function updateUser(
  userId: string,
  values: z.infer<typeof SettingsSchema>,
) {
  await db
    .update(users)
    .set({
      ...values,
    })
    .where(eq(users.id, userId));
}

export async function getUserArtistReview(userId: string, artistId: string) {
  return await db.query.reviewsArtists.findFirst({
    where: and(
      eq(reviewsArtists.userId, userId),
      eq(reviewsArtists.entityId, artistId),
    ),
    with: {
      user: true,
    },
  });
}

export async function getUserArtistReview2(userId: string, artistId: string) {
  return await db.query.reviewsArtists.findFirst({
    where: and(
      eq(reviewsArtists.userId, userId),
      eq(reviewsArtists.entityId, artistId),
    ),
    with: {
      artist: true,
      user: true,
    },
  });
}

export async function getUserAlbumReview(userId: string, albumId: string) {
  return await db.query.reviewsAlbums.findFirst({
    where: and(
      eq(reviewsAlbums.userId, userId),
      eq(reviewsAlbums.entityId, albumId),
    ),
    with: {
      album: true,
      user: true,
    },
  });
}

export async function getUserTrackReview(userId: string, trackId: string) {
  return await db.query.reviewsTracks.findFirst({
    where: and(
      eq(reviewsTracks.userId, userId),
      eq(reviewsTracks.entityId, trackId),
    ),
    with: {
      track: true,
      user: true,
    },
  });
}

export async function getUserPlaylists(userId: string) {
  return await db.query.playlists.findMany({
    where: eq(playlists.userId, userId),
    with: {
      items: true,
    },
  });
}

export async function getUserFavourite(userId: string) {
  return await db.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, userId),
  });
}

export async function updateFavourite(
  userId: string,
  entityId: string,
  type: Entity,
) {
  switch (type) {
    case "artist":
      return await db
        .update(userProfiles)
        .set({
          favoriteArtistId: entityId,
        })
        .where(eq(userProfiles.userId, userId));
    case "album":
      return await db
        .update(userProfiles)
        .set({
          favoriteAlbumId: entityId,
        })
        .where(eq(userProfiles.userId, userId));
    case "track":
      return await db
        .update(userProfiles)
        .set({
          favoriteTrackId: entityId,
        })
        .where(eq(userProfiles.userId, userId));

    default:
      throw new Error(`Unknown item type: ${type}`);
  }
}

export async function removeFavourite(userId: string, type: Entity) {
  switch (type) {
    case "artist":
      return await db
        .update(userProfiles)
        .set({
          favoriteArtistId: null,
        })
        .where(eq(userProfiles.userId, userId));
    case "album":
      return await db
        .update(userProfiles)
        .set({
          favoriteAlbumId: null,
        })
        .where(eq(userProfiles.userId, userId));
    case "track":
      return await db
        .update(userProfiles)
        .set({
          favoriteTrackId: null,
        })
        .where(eq(userProfiles.userId, userId));

    default:
      throw new Error(`Unknown item type: ${type}`);
  }
}

export async function getUserNotifications(userId: string) {
  const notifications = await db.query.notificationRecipients.findMany({
    where: eq(notificationRecipients.ownerId, userId),
    with: {
      notification: true,
    },
  });
  return notifications.map((item) => {
    return {
      ...item.notification,
      isRead: item.isRead,
    };
  });
}

export async function getUserLatestReviews(
  userId: string,
): Promise<(TArtistReview | TAlbumReview | TTrackReview)[]> {
  const artistReviews = await db.query.reviewsArtists.findMany({
    where: eq(reviewsArtists.userId, userId),
    with: {
      artist: true,
    },
    limit: LIMIT,
  });

  const albumsReviews = await db.query.reviewsAlbums.findMany({
    where: eq(reviewsAlbums.userId, userId),
    with: {
      album: true,
    },
    limit: LIMIT,
  });

  const trackReviews = await db.query.reviewsTracks.findMany({
    where: eq(reviewsTracks.userId, userId),
    with: {
      track: true,
    },
    limit: LIMIT,
  });

  const allReviews = [...artistReviews, ...albumsReviews, ...trackReviews];

  return allReviews
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return dateB - dateA;
    })
    .slice(0, 5);
}

export async function getArtistReviewsWhereUserIsNotOwner(
  artistId: string,
  userId: string,
  limit?: number,
) {
  return db.query.reviewsArtists.findMany({
    where: and(
      eq(reviewsArtists.entityId, artistId),
      not(eq(reviewsArtists.userId, userId)),
    ),
    with: {
      user: true,
    },
    limit,
    orderBy: desc(reviewsArtists.createdAt),
  });
}

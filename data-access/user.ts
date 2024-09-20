import { db } from "@/drizzle/database/db";
import {
  playlists,
  reviewsAlbums,
  reviewsArtists,
  reviewsTracks,
  userProfiles,
  users,
} from "@/drizzle/database/schemas";
import { and, eq } from "drizzle-orm";
import { TAlbumReview, TArtistReview, TTrackReview } from "@/types/review";

const LIMIT = 5;

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

export async function getUserByName(name: string) {
  return await db.query.users.findFirst({
    where: eq(users.name, name),
  });
}

export async function getUserById(userId: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
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
  return img.image ?? "";
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

// getReviewForTrackOwnedByUser
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

// getPlaylistsForUser
export async function getUserPlaylists(userId: string) {
  return await db.query.playlists.findMany({
    where: eq(playlists.userId, userId),
    with: {
      items: true,
    },
  });
}

// getFavouriteContentForUser
export async function getUserFavourite(userId: string) {
  return await db.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, userId),
  });
}

// getLatestReviewsForUser
export async function getUserLatestReviews(
  userId: string,
  limit?: number,
): Promise<(TArtistReview | TAlbumReview | TTrackReview)[]> {
  const artistReviews = await db.query.reviewsArtists.findMany({
    where: eq(reviewsArtists.userId, userId),
    with: {
      artist: true,
    },
    limit: limit,
  });

  const albumsReviews = await db.query.reviewsAlbums.findMany({
    where: eq(reviewsAlbums.userId, userId),
    with: {
      album: {
        with: {
          artist: true,
        },
      },
    },
    limit: limit,
  });

  const trackReviews = await db.query.reviewsTracks.findMany({
    where: eq(reviewsTracks.userId, userId),
    with: {
      track: {
        with: {
          album: {
            with: {
              artist: true,
            },
          },
        },
      },
    },
    limit: limit,
  });

  const allReviews = [...artistReviews, ...albumsReviews, ...trackReviews];

  if (limit) {
    return allReviews
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return dateB - dateA;
      })
      .slice(0, limit);
  }

  return allReviews.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    return dateB - dateA;
  });
}

import {
  getAlbumById,
  getAlbumReviews,
  getAlbumReviewsCount,
} from "@/data-access/album";
import {
  getArtist,
  getArtistReviews,
  getArtistReviewsCount,
} from "@/data-access/artist";
import {
  createNotification,
  sendNotificationToFollowers,
} from "@/data-access/notification";
import { deleteReview, insertReview, updateReview } from "@/data-access/review";
import {
  getTrackById,
  getTrackReviews,
  getTrackReviewsCount,
} from "@/data-access/track";
import {
  getUserAlbumReview,
  getUserArtistReview,
  getUserTrackReview,
} from "@/data-access/user";
import { currentUser } from "@/lib/auth";
import { Entity } from "@/types";
import { notificationTypes } from "@/types/notification";

export async function createReviewUseCase(
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Entity,
) {
  const review = await insertReview(entityId, userId, comment, rating, type);
  if (!review) {
    return null;
  }

  let notiType = null;

  switch (type) {
    case "artist": {
      notiType = notificationTypes.ARTIST_REVIEW;
      break;
    }
    case "album": {
      notiType = notificationTypes.ALBUM_REVIEW;
      break;
    }
    case "track": {
      notiType = notificationTypes.TRACK_REVIEW;
      break;
    }
  }

  if (notiType) {
    const notification = await createNotification(
      userId,
      entityId,
      notiType,
      "New review",
    );
    sendNotificationToFollowers(notification.id, userId);
  }

  return review;
}

export async function removeReviewUseCase(
  entityId: string,
  type: Entity,
  reviewId: string,
) {
  const review = await deleteReview(entityId, type, reviewId);
  if (!review) {
    return null;
  }
  return review;
}

export async function editReviewUseCase(
  reviewId: string,
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Entity,
) {
  const review = await updateReview(
    reviewId,
    entityId,
    userId,
    comment,
    rating,
    type,
  );
  if (!review) {
    return null;
  }
  return review;
}

export async function getReviewsUseCase(
  entityId: string,
  entityType: string,
  currentPage: number,
  totalItemsOnPage: number,
) {
  const offset = (currentPage - 1) * totalItemsOnPage;
  const limit = totalItemsOnPage;

  let reviews = null;
  let totalCount = 0;

  switch (entityType) {
    case "artist": {
      reviews = await getArtistReviews(entityId, limit, offset);
      const c = await getArtistReviewsCount(entityId);
      totalCount = c.count;
      break;
    }
    case "album": {
      reviews = await getAlbumReviews(entityId, limit, offset);
      const c = await getAlbumReviewsCount(entityId);
      totalCount = c.count;
      break;
    }
    case "track": {
      reviews = await getTrackReviews(entityId, limit, offset);
      const c = await getTrackReviewsCount(entityId);
      totalCount = c.count;
      break;
    }
  }

  const totalPages = Math.ceil(totalCount / limit);

  return {
    reviews,
    totalPages,
  };
}

export async function isEntityExist(entityId: string) {
  const artist = await getArtist(entityId);
  if (artist) return true;

  const album = await getAlbumById(entityId);
  if (album) return true;

  const track = await getTrackById(entityId);
  if (track) return true;

  return false;
}

export async function shouldShowAddReviewUseCase(
  entityId: string,
  type: string,
): Promise<boolean> {
  const user = await currentUser();
  if (!user) {
    return false;
  }

  let review = null;

  switch (type) {
    case "artist": {
      review = await getUserArtistReview(user.id, entityId);
      break;
    }
    case "album": {
      review = await getUserAlbumReview(user.id, entityId);
      break;
    }
    case "track": {
      review = await getUserTrackReview(user.id, entityId);
      break;
    }
  }

  // Two times negation because I want to change type to boolean
  // And last because i show review when user don't have review already
  return !!!review;
}

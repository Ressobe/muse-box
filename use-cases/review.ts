import {
  createNotification,
  sendNotificationToFollowers,
} from "@/data-access/notification";
import {
  deleteReview,
  findReview,
  insertReview,
  updateReview,
} from "@/data-access/review";
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

export async function changeReviewRateUseCase(
  entityId: string,
  userId: string,
  rating: number,
  type: Entity,
) {
  let existingReview = await findReview(userId, entityId, type);
  if (!existingReview) {
    return await insertReview(entityId, userId, "", rating, type);
  }

  return await updateReview(
    existingReview.id,
    existingReview.entityId,
    existingReview.userId,
    existingReview.comment ?? "",
    rating,
    type,
  );
}

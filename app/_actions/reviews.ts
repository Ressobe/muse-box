"use server";

import { getReviewForArtistOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-artist-owned-by-user.use-case";
import { Content } from "@/src/entities/models/content";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";
import { changeReviewRateController } from "@/src/interface-adapters/controllers/review/change-review-rate.controller";
import { createReviewController } from "@/src/interface-adapters/controllers/review/create-review.controller";
import { editReviewController } from "@/src/interface-adapters/controllers/review/edit-review.controller";
import { getLatestReviewsForUserController } from "@/src/interface-adapters/controllers/review/get-latest-reviews-for-user.controller";
import { removeReviewController } from "@/src/interface-adapters/controllers/review/remove-review.controller";
import { revalidatePath } from "next/cache";

export async function addReviewAction(
  entityId: string,
  comment: string,
  rating: number,
  type: Content,
) {
  const authUserId = await getAuthUserIdController();
  if (!authUserId) {
    return { error: "Not authorized access!" };
  }

  if (type === "artist") {
    const review = await getReviewForArtistOwnedByUserUseCase(
      entityId,
      authUserId,
    );
    if (review) {
      return { error: "Your review for this artist, already exist!" };
    }
  }

  const review = await createReviewController({
    entityId,
    comment,
    rating,
    type,
  });

  revalidatePath(`/${type}s/${entityId}`);

  if (review) {
    return { sucess: "review created!" };
  }
  return { error: "review not created!" };
}

export async function removeReviewAction(
  entityId: string,
  type: Content,
  ownerId: string,
  commentId: string,
) {
  const authUserId = await getAuthUserIdController();
  if (!authUserId || authUserId !== ownerId) {
    return { error: "Not authorized access!" };
  }

  await removeReviewController({ entityId, type, reviewId: commentId });
  revalidatePath(`/${type}s/${entityId}`);
}

export async function editReviewAction(
  commentId: string,
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Content,
) {
  const authUserId = await getAuthUserIdController();
  if (!authUserId || authUserId !== userId) {
    return { error: "Not authorized access!" };
  }

  const review = await editReviewController({
    entityId,
    userId,
    comment,
    rating,
    type,
    reviewId: commentId,
  });

  revalidatePath(`/${type}s/${entityId}`);

  if (review) {
    return { sucess: "review updated!" };
  }

  return { error: "review not updated!" };
}

export async function changeReviewRateAction(
  pathname: string,
  entityId: string,
  userId: string,
  rating: number,
  comment: string,
  type: Content,
) {
  const authUserId = await getAuthUserIdController();
  if (!authUserId || authUserId !== userId) {
    return { error: "Not authorized access!" };
  }

  const review = await changeReviewRateController({
    entityId,
    userId,
    rating,
    comment,
    type,
  });

  revalidatePath(pathname);

  if (review) {
    return { sucess: "review updated!" };
  }

  return { error: "review not updated!" };
}

export async function getUserLatestReviewsAction(profileId: string) {
  const reviews = await getLatestReviewsForUserController({
    userId: profileId,
  });

  return reviews;
}

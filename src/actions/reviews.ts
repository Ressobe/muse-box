"use server";

import { getUserArtistReview } from "@/data-access/user";
import { currentUser } from "@/lib/auth";
import { Entity } from "@/types";
import {
  changeReviewRateUseCase,
  createReviewUseCase,
  editReviewUseCase,
  removeReviewUseCase,
} from "@/use-cases/review";
import { revalidatePath } from "next/cache";

export async function addReviewAction(
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Entity,
) {
  const user = await currentUser();
  if (!user) {
    return { error: "Not authorized access!" };
  }

  if (type === "artist") {
    const review = await getUserArtistReview(user.id, entityId);
    if (review) {
      return { error: "Your review for this artist, already exist!" };
    }
  }

  const review = await createReviewUseCase(
    entityId,
    userId,
    comment,
    rating,
    type,
  );

  revalidatePath(`/${type}s/${entityId}`);

  if (review) {
    return { sucess: "review created!" };
  }
  return { error: "review not created!" };
}

export async function removeReviewAction(
  entityId: string,
  type: Entity,
  ownerId: string,
  commentId: string,
) {
  const user = await currentUser();
  if (!user) {
    return { error: "Not authorized access!" };
  }

  if (ownerId !== user.id) {
    return { error: "Not authorized access!" };
  }

  await removeReviewUseCase(entityId, type, commentId);
  revalidatePath(`/${type}s/${entityId}`);
}

export async function editReviewAction(
  commentId: string,
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Entity,
) {
  const user = await currentUser();
  if (!user || user.id !== userId) {
    return { error: "Not authorized access!" };
  }

  const review = await editReviewUseCase(
    commentId,
    entityId,
    userId,
    comment,
    rating,
    type,
  );

  revalidatePath(`/${type}s/${entityId}`);

  if (review) {
    return { sucess: "review updated!" };
  }

  return { error: "review not updated!" };
}

export async function changeReviewRateAction(
  commentId: string,
  entityId: string,
  userId: string,
  rating: number,
  type: Entity,
) {
  const user = await currentUser();
  if (!user || user.id !== userId) {
    return { error: "Not authorized access!" };
  }

  const review = await changeReviewRateUseCase(
    commentId,
    entityId,
    userId,
    rating,
    type,
  );

  if (review) {
    return { sucess: "review updated!" };
  }

  return { error: "review not updated!" };
}

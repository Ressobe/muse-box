"use server";

import { auth } from "@/auth";
import { getUserArtistReview } from "@/data-access/user";
import { Entity } from "@/types";
import { createReviewUseCase } from "@/use-cases/review";
import { revalidatePath } from "next/cache";

export async function addReviewAction(
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Entity,
) {
  const session = await auth();
  if (!session) {
    return { error: "Not authorized access!" };
  }

  if (!session.user.id) {
    return { error: "Not authorized access!" };
  }

  if (type === "artist") {
    const review = await getUserArtistReview(session.user.id, entityId);
    if (review) {
      return { error: "Your review for this artist, already exist!" };
    }
  }

  await createReviewUseCase(entityId, userId, comment, rating, type);
  revalidatePath(`/artists/${entityId}`);
}

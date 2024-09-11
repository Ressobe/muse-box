import { getReviewForTrackOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-track-owned-by-user.use-case";

export async function getTrackRatingOwnedByUserController(
  trackId: string,
  userId: string,
): Promise<number> {
  const review = await getReviewForTrackOwnedByUserUseCase(trackId, userId);
  const defaultRate = review?.rating ?? 0;
  return defaultRate;
}

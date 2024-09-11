import { getReviewForArtistOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-artist-owned-by-user.use-case";

export async function getArtistRatingOwnedByUserController(
  artistId: string,
  userId: string,
): Promise<number> {
  const review = await getReviewForArtistOwnedByUserUseCase(artistId, userId);
  const defaultRate = review?.rating ?? 0;

  return defaultRate;
}

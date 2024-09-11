import { getReviewForAlbumOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-album-owned-by-user.use-case";

export async function getAlbumRatingOwnedByUserController(
  albumId: string,
  userId: string,
): Promise<number> {
  const review = await getReviewForAlbumOwnedByUserUseCase(albumId, userId);

  const defaultRate = review?.rating ?? 0;

  return defaultRate;
}

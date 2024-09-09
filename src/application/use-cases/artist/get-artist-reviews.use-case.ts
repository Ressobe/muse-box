import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";

export async function getArtistReviewsUseCase(
  artistId: string,
  userId: string,
) {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const otherUsersReviews =
    await reviewsRepository.getReviewsForArtistNotOwnedByUser(
      artistId,
      userId,
      10,
    );

  const userReview = await reviewsRepository.getReviewForArtistOwnedByUser(
    artistId,
    userId,
  );

  if (userReview) {
    return [userReview, ...otherUsersReviews];
  }
  return otherUsersReviews;
}

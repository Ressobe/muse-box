import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";

export async function getArtistsReviewsOwnedByUserUseCase(
  userId: string,
  limit?: number,
) {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const artistReviews = await reviewsRepository.getArtistsReviewsOwnedByUser(
    userId,
    limit,
  );

  return artistReviews;
}

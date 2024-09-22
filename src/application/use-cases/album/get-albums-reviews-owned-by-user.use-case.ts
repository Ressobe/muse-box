import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";

export async function getAlbumsReviewsOwnedByUserUseCase(
  userId: string,
  limit?: number,
) {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const albumsReviews = await reviewsRepository.getAlbumsReviewsOwnedByUser(
    userId,
    limit,
  );

  return albumsReviews;
}

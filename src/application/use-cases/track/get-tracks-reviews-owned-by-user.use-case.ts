import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";

export async function getTracksReviewsOwnedByUserUseCase(
  userId: string,
  limit?: number,
) {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const tracksReviews = await reviewsRepository.getTracksReviewsOwnedByUser(
    userId,
    limit,
  );

  return tracksReviews;
}

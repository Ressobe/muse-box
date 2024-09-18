import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";
import { ReviewWithUser } from "@/src/entities/models/review";

export async function getTrackReviewsUseCase(
  trackId: string,
): Promise<ReviewWithUser[]> {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const tracksReviews = await reviewsRepository.getReviewsForTrack(trackId, 0);

  return tracksReviews;
}

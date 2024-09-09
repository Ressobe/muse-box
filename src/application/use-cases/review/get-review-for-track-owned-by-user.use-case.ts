import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";
import { ReviewWithTrackAndUser } from "@/src/entities/models/review";

export async function getReviewForTrackOwnedByUserUseCase(
  trackId: string,
  userId: string,
): Promise<ReviewWithTrackAndUser | undefined> {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const review = await reviewsRepository.getReviewForTrackOwnedByUser(
    trackId,
    userId,
  );

  return review;
}

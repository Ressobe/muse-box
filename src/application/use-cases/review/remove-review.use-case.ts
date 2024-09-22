import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";
import { Content } from "@/src/entities/models/content";

export async function removeReviewUseCase(
  entityId: string,
  type: Content,
  reviewId: string,
) {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const review = await reviewsRepository.deleteReview(entityId, type, reviewId);

  return review;
}

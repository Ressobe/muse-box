import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";
import { Content } from "@/src/entities/models/content";

export async function editReviewUseCase(
  reviewId: string,
  entityId: string,
  userId: string,
  comment: string,
  rating: number,
  type: Content,
) {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const review = await reviewsRepository.updateReview(
    reviewId,
    entityId,
    userId,
    comment,
    rating,
    type,
  );

  return review;
}

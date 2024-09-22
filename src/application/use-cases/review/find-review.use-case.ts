import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";
import { Content } from "@/src/entities/models/content";
import { Review } from "@/src/entities/models/review";

export async function findReviewUseCase(
  userId: string,
  entityId: string,
  type: Content,
): Promise<Review | undefined> {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const review = await reviewsRepository.findReviewForUser(
    userId,
    entityId,
    type,
  );

  return review;
}

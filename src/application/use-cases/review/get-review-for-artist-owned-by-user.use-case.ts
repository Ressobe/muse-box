import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";
import { ReviewWithUser } from "@/src/entities/models/review";

export async function getReviewForArtistOwnedByUserUseCase(
  artistId: string,
  userId: string,
): Promise<ReviewWithUser | undefined> {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const review = await reviewsRepository.getReviewForArtistOwnedByUser(
    artistId,
    userId,
  );

  return review;
}

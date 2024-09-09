import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";
import { ReviewWithUser } from "@/src/entities/models/review";

export async function getReviewsForArtistNotOwnedByUserUseCase(
  artistId: string,
  userId: string,
): Promise<ReviewWithUser[]> {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const reviews = await reviewsRepository.getReviewsForArtistNotOwnedByUser(
    artistId,
    userId,
    10,
  );

  return reviews;
}

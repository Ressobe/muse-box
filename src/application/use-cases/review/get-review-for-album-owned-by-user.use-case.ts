import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";
import { ReviewWithAlbumAndUser } from "@/src/entities/models/review";

export async function getReviewForAlbumOwnedByUserUseCase(
  albumId: string,
  userId: string,
): Promise<ReviewWithAlbumAndUser | undefined> {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const review = await reviewsRepository.getReviewForAlbumOwnedByUser(
    albumId,
    userId,
  );

  return review;
}

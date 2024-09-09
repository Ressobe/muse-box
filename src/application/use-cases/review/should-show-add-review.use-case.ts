import { container } from "@/di/container";
import { Content } from "@/src/entities/models/content";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";

export async function shouldShowAddReviewUseCase(
  entityId: string,
  userId: string,
  type: Content,
): Promise<boolean> {
  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  let review = null;

  switch (type) {
    case "artist": {
      review = await reviewsRepository.getReviewForArtistOwnedByUser(
        entityId,
        userId,
      );
      break;
    }
    case "album": {
      review = await reviewsRepository.getReviewForAlbumOwnedByUser(
        entityId,
        userId,
      );
      break;
    }
    case "track": {
      review = await reviewsRepository.getReviewForTrackOwnedByUser(
        entityId,
        userId,
      );
      break;
    }
  }

  // Two times negation because I want to change type to boolean
  // And last because i show review when user don't have review already
  return !!!review;
}

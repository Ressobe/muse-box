import { container } from "@/di/container";
import { Content } from "@/src/entities/models/content";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";

export async function getReviewsUseCase(
  entityId: string,
  entityType: Content,
  currentPage: number,
  totalItemsOnPage: number,
) {
  const offset = (currentPage - 1) * totalItemsOnPage;
  const limit = totalItemsOnPage;

  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  let reviews = null;
  let totalCount = 0;

  switch (entityType) {
    case "artist": {
      reviews = await reviewsRepository.getReviewsForArtist(
        entityId,
        offset,
        limit,
      );
      totalCount = await reviewsRepository.getReviewsCountForArtist(entityId);
      break;
    }
    case "album": {
      reviews = await reviewsRepository.getReviewsForAlbum(
        entityId,
        offset,
        limit,
      );
      totalCount = await reviewsRepository.getReviewsCountForAlbum(entityId);
      break;
    }
    case "track": {
      reviews = await reviewsRepository.getReviewsForTrack(
        entityId,
        offset,
        limit,
      );
      totalCount = await reviewsRepository.getReviewsCountForTrack(entityId);
      break;
    }
  }

  const totalPages = Math.ceil(totalCount / limit);

  return {
    reviews,
    totalPages,
  };
}

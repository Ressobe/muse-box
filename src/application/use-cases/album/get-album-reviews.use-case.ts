import { container } from "@/di/container";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";
import { NotFoundError } from "@/src/entities/errors/common";

export async function getAlbumReviewsUseCase(albumId: string) {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const album = await albumsRepository.getAlbum(albumId);
  if (!album) {
    throw new NotFoundError("Album with this id does not exist");
  }

  const reviewsRepository =
    container.get<IReviewsRepository>("IReviewsRepository");

  const reviews = reviewsRepository.getReviewsForAlbum(albumId, 0, 10);

  return reviews;
}

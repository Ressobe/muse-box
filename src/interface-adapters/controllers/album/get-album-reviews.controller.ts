import { getAlbumReviewsUseCase } from "@/src/application/use-cases/album/get-album-reviews.use-case";
import { InputParseError } from "@/src/entities/errors/common";

export async function getAlbumReviewsController(albumId: string | undefined) {
  if (!albumId) {
    throw new InputParseError("Album id not provided");
  }

  const reviews = await getAlbumReviewsUseCase(albumId);

  return reviews;
}

import { getAlbumById, getAlbumReviews } from "@/data-access/album";

const LIMIT = 10;

export async function getAlbumUseCase(albumId: string) {
  const album = await getAlbumById(albumId);
  return album;
}

export async function getAlbumReviewsUseCase(albumId: string) {
  const reviews = await getAlbumReviews(albumId, LIMIT);
  return reviews;
}

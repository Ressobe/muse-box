import {
  getAlbumById,
  getAlbumReviews,
  getAlbums,
  getFilteredAlbums,
} from "@/data-access/album";

const LIMIT = 10;

export async function getTopAlbumsUseCase() {
  const albums = await getAlbums(LIMIT);
  return albums;
}

export async function getPopularAlbumsUseCase() {
  const albums = await getAlbums(LIMIT);
  return albums;
}

export async function getNewAlbumsUseCase() {
  const albums = await getAlbums(LIMIT);
  return albums;
}

export async function getAlbumUseCase(albumId: string) {
  const album = await getAlbumById(albumId);
  return album;
}

export async function getAlbumReviewsUseCase(albumId: string) {
  const reviews = await getAlbumReviews(albumId, LIMIT);
  return reviews;
}

export async function getFilteredAlbumsUseCase(query: string) {
  const lowerCaseQuery = query.toLowerCase();
  if (lowerCaseQuery === "") {
    return [];
  }

  return getFilteredAlbums(lowerCaseQuery);
}

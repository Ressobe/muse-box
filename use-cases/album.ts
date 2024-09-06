import { SortType } from "@/app/(protected)/albums/search/page";
import {
  getAlbumById,
  getAlbumReviews,
  getAlbumsCount,
  getAlbumsSearch,
  getAlbumsSortedAlphabetically,
  getAlbumsSortedByHighestRating,
  getAlbumsSortedByLowestRating,
  getAlbumsSortedInReverseAlphabetical,
  getFilteredAlbums,
  getNewAlbums,
  getPopularAlbums,
  getTopAlbums,
} from "@/data-access/album";

const LIMIT = 10;

export async function getTopAlbumsUseCase() {
  const albums = await getTopAlbums(5);
  return albums;
}

export async function getPopularAlbumsUseCase() {
  const albums = await getPopularAlbums(LIMIT);
  return albums;
}

export async function getNewAlbumsUseCase() {
  const albums = await getNewAlbums(LIMIT);
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

  return getFilteredAlbums(lowerCaseQuery, LIMIT);
}

export async function getAlbumsSearchUseCase(
  currentPage: number,
  totalItemsOnPage: number,
  sort: SortType,
) {
  const offset = (currentPage - 1) * totalItemsOnPage;
  const limit = totalItemsOnPage;

  let albums;
  if (sort === "highestRating") {
    albums = await getAlbumsSortedByHighestRating(limit, offset);
  }
  if (sort === "lowestRating") {
    albums = await getAlbumsSortedByLowestRating(limit, offset);
  }
  if (sort === "alphabetical") {
    albums = await getAlbumsSortedAlphabetically(limit, offset);
  }
  if (sort === "alphabeticalReverse") {
    albums = await getAlbumsSortedInReverseAlphabetical(limit, offset);
  }
  if (sort === "default") {
    albums = await getAlbumsSearch(limit, offset);
  }

  const totalCount = await getAlbumsCount();

  const totalPages = Math.ceil(totalCount / limit);

  return {
    albums,
    totalPages,
  };
}

import {
  getFilteredTracks,
  getNewTracks,
  getPopularTracks,
  getTopTracksCards,
  getTrackById,
  getTrackReviews,
  getTracksCount,
  getTracksSearch,
} from "@/data-access/track";

const LIMIT = 10;

export async function getTopTracksUseCase() {
  const tracks = await getTopTracksCards(5);
  return tracks;
}

export async function getPopularTracksUseCase() {
  const tracks = await getPopularTracks(LIMIT);
  return tracks;
}

export async function getNewTracksUseCase() {
  const tracks = await getNewTracks(LIMIT);
  return tracks;
}

export async function getTrackUseCase(trackId: string) {
  const track = await getTrackById(trackId);
  return track;
}

export async function getTrackReviewsUseCase(trackId: string) {
  const reviews = await getTrackReviews(trackId);
  return reviews;
}

export async function getFilteredTracksUseCase(query: string) {
  const lowerCaseQuery = query.toLowerCase();
  if (lowerCaseQuery === "") {
    return [];
  }
  return await getFilteredTracks(lowerCaseQuery, LIMIT);
}

export async function getTracksSearchUseCase(
  currentPage: number,
  totalItemsOnPage: number,
) {
  const offset = (currentPage - 1) * totalItemsOnPage;
  const limit = totalItemsOnPage;

  const tracks = await getTracksSearch(limit, offset);
  const { count: totalCount } = await getTracksCount();

  const totalPages = Math.ceil(totalCount / limit);

  return {
    tracks,
    totalPages,
  };
}

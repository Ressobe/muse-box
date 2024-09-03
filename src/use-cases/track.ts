import {
  getFilteredTracks,
  getTopTracksCards,
  getTrackById,
  getTrackReviews,
  getTracks,
} from "@/data-access/track";

const LIMIT = 10;

export async function getTopTracksUseCase() {
  const tracks = await getTopTracksCards(LIMIT);
  return tracks;
}

export async function getPopularTracksUseCase() {
  const tracks = await getTracks(LIMIT);
  return tracks;
}

export async function getNewTracksUseCase() {
  const tracks = await getTracks(LIMIT);
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

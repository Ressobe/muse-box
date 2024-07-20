import { getTrackById, getTrackReviews, getTracks } from "@/data-access/track";

export async function getTopTracksUseCase() {
  const tracks = await getTracks();
  return tracks;
}

export async function getPopularTracksUseCase() {
  const tracks = await getTracks();
  return tracks;
}

export async function getNewTracksUseCase() {
  const tracks = await getTracks();
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

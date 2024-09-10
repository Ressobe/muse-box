import { getTrackById, getTrackReviews } from "@/data-access/track";

export async function getTrackUseCase(trackId: string) {
  const track = await getTrackById(trackId);
  return track;
}

export async function getTrackReviewsUseCase(trackId: string) {
  const reviews = await getTrackReviews(trackId);
  return reviews;
}

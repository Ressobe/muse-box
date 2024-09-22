import { getPopularTracksUseCase } from "@/src/application/use-cases/track/get-popular-tracks.use-case";

export async function getPopularTracksController() {
  const tracks = await getPopularTracksUseCase();
  return tracks;
}

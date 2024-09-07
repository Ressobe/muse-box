import { getTopTracksUseCase } from "@/src/application/use-cases/track/get-top-tracks.use-case";

export async function getTopTracksController() {
  const tracks = await getTopTracksUseCase();

  return tracks;
}

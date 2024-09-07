// function presenter() {}

import { getNewTracksUseCase } from "@/src/application/use-cases/track/get-new-tracks.use-case";

export async function getNewTracksController() {
  const tracks = await getNewTracksUseCase();

  return tracks;
}

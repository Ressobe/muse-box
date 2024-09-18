import { getTopTracksCardsUseCase } from "@/src/application/use-cases/track/get-top-tracks-cards.use-case";

export async function getTopTracksController() {
  const tracks = await getTopTracksCardsUseCase();
  return tracks;
}

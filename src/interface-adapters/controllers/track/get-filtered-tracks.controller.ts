import { getFilteredTracksUseCase } from "@/src/application/use-cases/track/get-filtered-tracks.use-case";
import { InputParseError } from "@/src/entities/errors/common";

export async function getFilteredTracksController(query: string | undefined) {
  if (!query) {
    throw new InputParseError("Query not provied");
  }

  return await getFilteredTracksUseCase(query);
}

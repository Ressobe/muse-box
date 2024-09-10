import { getFilteredAlbumsUseCase } from "@/src/application/use-cases/album/get-filtered-albums.use-case";
import { InputParseError } from "@/src/entities/errors/common";

export async function getFilteredAlbumsController(query: string | undefined) {
  if (!query) {
    throw new InputParseError("Query not provided");
  }

  const albums = await getFilteredAlbumsUseCase(query);

  return albums;
}

import { getFilteredAlbumsUseCase } from "@/src/application/use-cases/album/get-filtered-albums.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { Album } from "@/src/entities/models/album";

export async function getFilteredAlbumsController(
  query: string | undefined,
): Promise<Album[]> {
  if (!query) {
    throw new InputParseError("Query not provided");
  }

  const albums = await getFilteredAlbumsUseCase(query);

  return albums;
}

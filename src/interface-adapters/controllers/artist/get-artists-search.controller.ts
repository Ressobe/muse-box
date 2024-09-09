import { getArtistsSearchUseCase } from "@/src/application/use-cases/artist/get-artists-search.use-case";

export async function getArtistsSearchController(
  page: number,
  perPage: number,
) {
  return await getArtistsSearchUseCase(page, perPage);
}

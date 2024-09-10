import { getArtistsSearchUseCase } from "@/src/application/use-cases/artist/get-artists-search.use-case";
import { SortType } from "@/src/entities/types";

export async function getArtistsSearchController(
  page: number,
  perPage: number,
  sort?: SortType,
) {
  return await getArtistsSearchUseCase(page, perPage, sort ?? "default");
}

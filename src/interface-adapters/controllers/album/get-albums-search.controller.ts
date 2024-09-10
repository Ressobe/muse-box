import { getAlbumsSearchUseCase } from "@/src/application/use-cases/album/get-albums-search.use-case";
import { SortType } from "@/src/entities/types";

export async function getAlbumsSearchController(
  page: number,
  perPage: number,
  sort?: SortType,
) {
  return await getAlbumsSearchUseCase(page, perPage, (sort = "default"));
}

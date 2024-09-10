import { getTracksSearchUseCase } from "@/src/application/use-cases/track/get-tracks-search.use-case";
import { SortType } from "@/src/entities/types";

export async function getTracksSearchController(
  page: number,
  perPage: number,
  sort?: SortType,
) {
  return await getTracksSearchUseCase(page, perPage, sort ?? "default");
}

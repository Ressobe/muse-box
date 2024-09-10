// function presenter() {}

import { getTopAlbumsUseCase } from "@/src/application/use-cases/album/get-top-albums.use-case";

export async function getTopAlbumsController() {
  const albums = await getTopAlbumsUseCase();

  return albums;
}

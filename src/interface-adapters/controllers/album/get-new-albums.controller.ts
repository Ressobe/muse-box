import { getNewAlbumsUseCase } from "@/src/application/use-cases/album/get-new-albums.use-case";

// function presenter() {}

export async function getNewAlbumsController() {
  const albums = await getNewAlbumsUseCase();

  return albums;
}

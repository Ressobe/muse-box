import { getPopularAlbumsUseCase } from "@/src/application/use-cases/album/get-popular-albums.use-case";

// function presenter() {}

export async function getPopularAlbumsController() {
  const albums = await getPopularAlbumsUseCase();

  return albums;
}

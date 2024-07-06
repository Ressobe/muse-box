import { getAlbums } from "@/data-access/album";

export async function getTopAlbumsUseCase() {
  const albums = getAlbums();
  return albums;
}

export async function getPopularAlbumsUseCase() {
  const albums = getAlbums();
  return albums;
}

export async function getNewAlbumsUseCase() {
  const albums = getAlbums();
  return albums;
}

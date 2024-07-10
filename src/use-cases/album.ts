import { getAlbumById, getAlbums } from "@/data-access/album";

export async function getTopAlbumsUseCase() {
  const albums = await getAlbums();
  return albums;
}

export async function getPopularAlbumsUseCase() {
  const albums = await getAlbums();
  return albums;
}

export async function getNewAlbumsUseCase() {
  const albums = await getAlbums();
  return albums;
}

export async function getAlbumUseCase(albumId: string) {
  const album = await getAlbumById(albumId);
  return album;
}

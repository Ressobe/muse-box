import { getTopAlbumsUseCase } from "@/src/application/use-cases/album/get-top-albums.use-case";
import { AlbumWithStats } from "@/src/entities/models/album";

export async function getTopAlbumsController(): Promise<AlbumWithStats[]> {
  const albums = await getTopAlbumsUseCase();

  return albums;
}

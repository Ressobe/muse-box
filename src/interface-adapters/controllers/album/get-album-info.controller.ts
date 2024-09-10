import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getAlbumWithTracksUseCase } from "@/src/application/use-cases/album/get-album-with-tracks.use-case";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";

export async function getAlbumInfoController(albumId: string | undefined) {
  if (!albumId) {
    throw new InputParseError("Album id not provided");
  }

  const album = await getAlbumWithTracksUseCase(albumId);
  if (!album) {
    throw new NotFoundError("Album not founded");
  }

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const userId = await authenticationService.getUserId();

  let isAlbumLiked: boolean | undefined = undefined;
  if (userId) {
    isAlbumLiked = await isItemLikedByUserUseCase(userId, album.id, "album");
  }

  return album;
}

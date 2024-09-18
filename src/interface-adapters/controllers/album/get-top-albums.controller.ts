import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getTopAlbumsUseCase } from "@/src/application/use-cases/album/get-top-albums.use-case";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { AlbumWithStats } from "@/src/entities/models/album";
import { getAlbumRatingOwnedByUserController } from "@/src/interface-adapters/controllers/album/get-album-rating-owned-by-user-controller";

export async function getTopAlbumsController(): Promise<AlbumWithStats[]> {
  let albums = await getTopAlbumsUseCase();

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const userId = await authenticationService.getUserId();

  if (userId) {
    albums = await Promise.all(
      albums.map(async (item) => {
        const isLiked = await isItemLikedByUserUseCase(
          userId,
          item.id,
          "album",
        );

        const defaultRate = await getAlbumRatingOwnedByUserController(
          item.id,
          userId,
        );
        return {
          ...item,
          defaultRate,
          isLiked,
        };
      }),
    );
  }

  return albums;
}

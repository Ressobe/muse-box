import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getTopAlbumsUseCase } from "@/src/application/use-cases/album/get-top-albums.use-case";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { getReviewForAlbumOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-album-owned-by-user.use-case";

export async function getTopAlbumsController() {
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

        const review = await getReviewForAlbumOwnedByUserUseCase(
          item.id,
          userId,
        );

        const defaultRate = review?.rating ?? 0;
        const defaultReview = review?.comment ?? "";

        return {
          ...item,
          defaultRate,
          defaultReview,
          isLiked,
        };
      }),
    );
  }

  return albums;
}

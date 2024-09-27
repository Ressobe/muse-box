import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getTopAlbumsUseCase } from "@/src/application/use-cases/album/get-top-albums.use-case";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { getReviewForAlbumOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-album-owned-by-user.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { AlbumWithStats } from "@/src/entities/models/album";
import { z } from "zod";

const inputSchema = z.object({
  withAuthUserInfo: z.boolean().optional().default(true),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getTopAlbumsController(
  input: ControllerInput,
): Promise<AlbumWithStats[]> {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in getTopArtistsController");
  }

  const albums = await getTopAlbumsUseCase();

  const { withAuthUserInfo } = data;
  if (!withAuthUserInfo) return albums;

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const authUserId = await authenticationService.getUserId();
  if (!authUserId) {
    return albums;
  }

  const albumsWithUserInfo = await Promise.all(
    albums.map(async (album) => {
      const review = await getReviewForAlbumOwnedByUserUseCase(
        album.id,
        authUserId,
      );
      const isLiked = await isItemLikedByUserUseCase(
        authUserId,
        album.id,
        "album",
      );

      const defaultRate = review?.rating ?? 0;
      const defaultReview = review?.comment ?? "";

      return {
        ...album,
        isLiked,
        defaultRate,
        defaultReview,
      };
    }),
  );

  return albumsWithUserInfo;
}

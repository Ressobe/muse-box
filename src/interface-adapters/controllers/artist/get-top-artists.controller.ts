import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getTopArtistsUseCase } from "@/src/application/use-cases/artist/get-top-artists.use-case";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { getReviewForArtistOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-artist-owned-by-user.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  withAuthUserInfo: z.boolean().optional().default(true),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getTopArtistsController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in getTopArtistsController");
  }

  const { withAuthUserInfo } = data;

  const artists = await getTopArtistsUseCase();
  if (!withAuthUserInfo) return artists;

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const authUserId = await authenticationService.getUserId();
  if (!authUserId) {
    return artists;
  }

  const artistsWithUserInfo = await Promise.all(
    artists.map(async (artist) => {
      const review = await getReviewForArtistOwnedByUserUseCase(
        artist.id,
        authUserId,
      );
      const isLiked = await isItemLikedByUserUseCase(
        authUserId,
        artist.id,
        "artist",
      );

      const defaultRate = review?.rating ?? 0;
      const defaultReview = review?.comment ?? "";

      return {
        ...artist,
        defaultRate,
        defaultReview,
        isLiked,
      };
    }),
  );

  return artistsWithUserInfo;
}

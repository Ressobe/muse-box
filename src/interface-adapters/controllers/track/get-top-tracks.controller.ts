import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { getTopTracksCardsUseCase } from "@/src/application/use-cases/track/get-top-tracks-cards.use-case";
import { getTrackRatingOwnedByUserController } from "@/src/interface-adapters/controllers/track/get-track-rating-owned-by-user-controller";

export async function getTopTracksController() {
  let tracks = await getTopTracksCardsUseCase();

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const userId = await authenticationService.getUserId();

  if (userId) {
    tracks = await Promise.all(
      tracks.map(async (item) => {
        const isLiked = await isItemLikedByUserUseCase(
          userId,
          item.id,
          "track",
        );

        const defaultRate = await getTrackRatingOwnedByUserController(
          item.id,
          userId,
        );

        return {
          ...item,
          isLiked,
          defaultRate,
        };
      }),
    );
  }

  return tracks;
}

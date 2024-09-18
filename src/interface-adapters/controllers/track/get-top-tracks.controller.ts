import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { getReviewForTrackOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-track-owned-by-user.use-case";
import { getTopTracksCardsUseCase } from "@/src/application/use-cases/track/get-top-tracks-cards.use-case";

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

        const review = await getReviewForTrackOwnedByUserUseCase(
          item.id,
          userId,
        );
        const defaultRate = review?.rating ?? 0;
        const defaultReview = review?.comment ?? "";

        return {
          ...item,
          isLiked,
          defaultRate,
          defaultReview,
        };
      }),
    );
  }

  return tracks;
}

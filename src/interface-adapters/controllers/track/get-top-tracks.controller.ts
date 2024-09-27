import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { getReviewForTrackOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-track-owned-by-user.use-case";
import { getTopTracksCardsUseCase } from "@/src/application/use-cases/track/get-top-tracks-cards.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  withAuthUserInfo: z.boolean().optional().default(true),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getTopTracksController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in getTopTracksController");
  }
  const { withAuthUserInfo } = data;

  const tracks = await getTopTracksCardsUseCase();

  if (!withAuthUserInfo) return tracks;

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const authUserId = await authenticationService.getUserId();
  if (!authUserId) {
    return tracks;
  }

  const tracksWithUserInfo = await Promise.all(
    tracks.map(async (track) => {
      const review = await getReviewForTrackOwnedByUserUseCase(
        track.id,
        authUserId,
      );
      const isLiked = await isItemLikedByUserUseCase(
        authUserId,
        track.id,
        "track",
      );
      const defaultRate = review?.rating ?? 0;
      const defaultReview = review?.comment ?? "";

      return {
        ...track,
        isLiked,
        defaultRate,
        defaultReview,
      };
    }),
  );

  return tracksWithUserInfo;
}

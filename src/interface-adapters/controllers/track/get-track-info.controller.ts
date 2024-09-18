import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { getReviewForTrackOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-track-owned-by-user.use-case";
import { getTrackInfoUseCase } from "@/src/application/use-cases/track/get-track-info.use-case";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  trackId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getTrackInfoController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Track id not provided");
  }

  const track = await getTrackInfoUseCase(data.trackId);
  if (!track) {
    throw new NotFoundError("Track not founded");
  }

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const userId = await authenticationService.getUserId();
  if (userId) {
    const isLiked = await isItemLikedByUserUseCase(userId, track.id, "track");
    const review = await getReviewForTrackOwnedByUserUseCase(track.id, userId);
    const defaultRate = review?.rating ?? 0;

    return {
      ...track,
      isLiked,
      defaultRate,
    };
  }

  return track;
}

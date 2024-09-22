import { getAlbumsReviewsOwnedByUserUseCase } from "@/src/application/use-cases/album/get-albums-reviews-owned-by-user.use-case";
import { getArtistsReviewsOwnedByUserUseCase } from "@/src/application/use-cases/artist/get-artists-reviews-owned-by-user.use-case";
import { getTracksReviewsOwnedByUserUseCase } from "@/src/application/use-cases/track/get-tracks-reviews-owned-by-user.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  userId: z.string(),
  limit: z.number().optional(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getLatestReviewsForUserController(
  input: ControllerInput,
) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError(
      "Invalid input in getLatestReviewsForUserController",
    );
  }

  const { userId, limit } = data;

  const artistsReviews = await getArtistsReviewsOwnedByUserUseCase(
    userId,
    limit,
  );
  const albumsReviews = await getAlbumsReviewsOwnedByUserUseCase(userId, limit);
  const trackReviews = await getTracksReviewsOwnedByUserUseCase(userId, limit);

  const allReviews = [...artistsReviews, ...albumsReviews, ...trackReviews];

  if (limit) {
    return allReviews
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return dateB - dateA;
      })
      .slice(0, limit);
  }

  return allReviews.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    return dateB - dateA;
  });
}

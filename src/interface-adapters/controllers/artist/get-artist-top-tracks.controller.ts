import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { getReviewForArtistOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-artist-owned-by-user.use-case";
import { getTopTracksUseCase } from "@/src/application/use-cases/track/get-top-tracks.use-case";
import { albumSchema } from "@/src/entities/models/album";
import { z } from "zod";
import {
  trackSelectSchema,
  trackWithAlbumAndRatingAvgSchema,
} from "@/src/entities/models/track";
import { getReviewForTrackOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-track-owned-by-user.use-case";

// use cases are invidual operations
// that accept prevalidate data
// and do only one thing
//
//

const topTrackSchema = trackWithAlbumAndRatingAvgSchema.extend({
  isLiked: z.boolean().optional(),
  defaultRate: z.number().optional(),
  defaultReview: z.string().optional(),
});

type TopTrack = z.infer<typeof topTrackSchema>;

function presenter(tracks: TopTrack[]) {
  return tracks.map((item) => ({
    id: item.id,
    title: item.title,
    ratingAvg: item.ratingAvg,
    album: {
      id: item.album.id,
      image: item.album.image,
      title: item.album.title,
    },
    isLiked: item?.isLiked,
    defaultRate: item?.defaultRate,
    defaultReview: item?.defaultReview,
  }));
}

export async function getArtistTopTracksController(artistId: string) {
  const topTracks = await getTopTracksUseCase(artistId);

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  // Authentication check in controller
  // Input validation in controller
  // Authorization check in use case

  const authUser = await authenticationService.validateSession();

  if (!authUser) {
    return presenter(topTracks);
  }

  const tracks = await Promise.all(
    topTracks.map(async (track) => {
      const review = await getReviewForTrackOwnedByUserUseCase(
        track.id,
        authUser.id,
      );
      const defaultRate = review?.rating ?? 0;
      const defaultReview = review?.comment ?? "";

      return {
        ...track,
        defaultRate,
        defaultReview,
        isLiked: await isItemLikedByUserUseCase(authUser.id, track.id, "track"),
      };
    }),
  );

  return presenter(tracks);
}

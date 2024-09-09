import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getArtistDiscographyUseCase } from "@/src/application/use-cases/artist/get-artist-discography.use-case";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { getReviewForAlbumOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-album-owned-by-user.use-case";
import { getReviewForTrackOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-track-owned-by-user.use-case";
import { albumWithTracksSchema } from "@/src/entities/models/album";
import { trackWithStatsSchema } from "@/src/entities/models/track";
import { z } from "zod";

const discographyWithUserInfoSchema = albumWithTracksSchema.extend({
  tracks: trackWithStatsSchema
    .extend({
      defaultRate: z.number().optional(),
      isLiked: z.boolean().optional(),
    })
    .array(),
  defaultRate: z.number().optional(),
  isLiked: z.boolean().optional(),
});

type DiscographyWithUserInfo = z.infer<typeof discographyWithUserInfoSchema>;

export async function getArtistDiscographyController(
  artistId: string,
): Promise<DiscographyWithUserInfo[]> {
  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const discography = await getArtistDiscographyUseCase(artistId);

  const userId = await authenticationService.getUserId();
  if (!userId) {
    return discography;
  }

  const discographyWithUserInfo = await Promise.all(
    discography.map(async (album) => {
      const tracksWithUserInfo = await Promise.all(
        album.tracks.map(async (track) => {
          return {
            ...track,
            defaultRate:
              (await getReviewForTrackOwnedByUserUseCase(track.id, userId))
                ?.rating ?? 0,
            isLiked: await isItemLikedByUserUseCase(userId, track.id, "track"),
          };
        }),
      );

      return {
        ...album,
        tracks: tracksWithUserInfo,
        defaultRate:
          (await getReviewForAlbumOwnedByUserUseCase(album.id, userId))
            ?.rating ?? 0,
        isLiked: await isItemLikedByUserUseCase(userId, album.id, "album"),
      };
    }),
  );

  return discographyWithUserInfo;
}

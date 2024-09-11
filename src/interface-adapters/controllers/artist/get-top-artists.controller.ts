import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getTopArtistsUseCase } from "@/src/application/use-cases/artist/get-top-artists.use-case";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { ArtistWithStats } from "@/src/entities/models/artist";
import { getArtistRatingOwnedByUserController } from "./get-artist-rating-owned-by-user.controller";

function presenter(artists: ArtistWithStats[]) {
  return artists.map((item) => ({
    id: item.id,
    name: item.name,
    bio: item.bio,
    gender: item.gender,
    type: item.type,
    country: item.country,
    image: item.image ?? "",
    stats: {
      ratingAvg: item.stats?.ratingAvg ?? null,
      ratingCount: item.stats?.ratingCount ?? null,
      ratingSum: item.stats?.ratingSum ?? null,
    },
    defaultRate: item.defaultRate ?? undefined,
    isLiked: item.isLiked ?? undefined,
  }));
}

export async function getTopArtistsController() {
  let artists = await getTopArtistsUseCase();

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const userId = await authenticationService.getUserId();

  if (userId) {
    artists = await Promise.all(
      artists.map(async (item) => {
        const isLiked = await isItemLikedByUserUseCase(
          userId,
          item.id,
          "artist",
        );

        const defaultRate = await getArtistRatingOwnedByUserController(
          item.id,
          userId,
        );

        return {
          ...item,
          defaultRate,
          isLiked,
        };
      }),
    );
  }

  return presenter(artists);
}

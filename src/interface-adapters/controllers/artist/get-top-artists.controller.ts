import { getTopArtistsUseCase } from "@/src/application/use-cases/artist/get-top-artists.use-case";
import { ArtistWithStats } from "@/src/entities/models/artist";

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
  }));
}

export async function getTopArtistsController() {
  const artists = await getTopArtistsUseCase();

  return presenter(artists);
}

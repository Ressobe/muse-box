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
      ratingAvg: item.stats.ratingAvg,
      ratingCount: item.stats.ratingCount,
      ratingSum: item.stats.ratingSum,
    },
  }));
}

export async function getTopArtistsController() {
  const artists = await getTopArtistsUseCase();

  return presenter(artists);
}

import { getTopArtistsUseCase } from "@/src/application/use-cases/artist/get-top-artists.use-case";
import { ArtistWithRatingAvg } from "@/src/entities/models/artist";

function presenter(artists: ArtistWithRatingAvg[]) {
  return artists.map((item) => ({
    id: item.id,
    name: item.name,
    bio: item.bio,
    country: item.country,
    image: item.image ?? "",
    ratingAvg: item.ratingAvg,
  }));
}

export async function getTopArtistsController() {
  const artists = await getTopArtistsUseCase();

  return presenter(artists);
}

import { getPopularArtistsUseCase } from "@/src/application/use-cases/artist/get-popular-artists.use-case";
import { ArtistSelect } from "@/src/entities/models/artist";

function presenter(artists: ArtistSelect[]) {
  return artists.map((item) => ({
    id: item.id,
    name: item.name,
    bio: item.bio,
    country: item.country,
    image: item.image ?? "",
    type: null,
    gender: null,
  }));
}

export async function getPopularArtistsController() {
  const artists = await getPopularArtistsUseCase();

  return presenter(artists);
}

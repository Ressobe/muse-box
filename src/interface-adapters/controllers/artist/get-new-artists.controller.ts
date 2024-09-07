import { getNewArtistsUseCase } from "@/src/application/use-cases/artist/get-new-artists.use-case";
import { ArtistSelect } from "@/src/entities/models/artist";

function presenter(artists: ArtistSelect[]) {
  return artists.map((item) => ({
    id: item.id,
    name: item.name,
    bio: item.bio,
    country: item.country,
    image: item.image ?? "",
  }));
}

export async function getNewArtistsController() {
  const artists = await getNewArtistsUseCase();

  return presenter(artists);
}

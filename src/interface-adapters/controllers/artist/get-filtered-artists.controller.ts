import { getFilteredArtistsUseCase } from "@/src/application/use-cases/artist/get-filtered-artists.use-case";
import { InputParseError } from "@/src/entities/errors/common";
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

export async function getFilteredArtistsController(query: string | undefined) {
  if (!query) {
    throw new InputParseError("Query not provided");
  }

  const artists = await getFilteredArtistsUseCase(query);

  return presenter(artists);
}

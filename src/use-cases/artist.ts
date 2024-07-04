import { getArtistById } from "@/data-access/artist";

export async function getArtistUseCase(artistId: string) {
  const artist = await getArtistById(artistId);
  if (!artist) {
    throw "Artist not found";
  }
  return artist;
}

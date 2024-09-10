import {
  getArtistAlbums,
  getArtistByAlbumId,
  getArtistById,
  getTopArtists,
} from "@/data-access/artist";

const LIMIT = 5;

export async function getArtistUseCase(artistId: string) {
  const artist = await getArtistById(artistId);
  return artist;
}

export async function getArtistAlbumsUseCase(artistId: string) {
  const albums = await getArtistAlbums(artistId, LIMIT);
  if (!albums) {
    throw "Albums not found";
  }
  return albums;
}

export async function getTopArtistsUseCase() {
  const topArtists = getTopArtists(LIMIT);
  return topArtists;
}

export async function getArtistByAlbumIdUseCase(albumId: string) {
  const artist = await getArtistByAlbumId(albumId);
  return artist;
}

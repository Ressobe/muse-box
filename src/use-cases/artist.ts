import {
  getArtistAlbums,
  getArtistById,
  getArtistDiscography,
  getArtistGenres,
  getArtistReviews,
  getArtistSinglesEps,
  getArtistStats,
  getArtistTracks,
} from "@/data-access/artist";

const LIMIT = 5;

export async function getArtistUseCase(artistId: string) {
  const artist = await getArtistById(artistId);
  if (!artist) {
    throw "Artist not found";
  }
  return artist;
}

export async function getArtistAlbumsUseCase(artistId: string) {
  const albums = await getArtistAlbums(artistId, LIMIT);
  if (!albums) {
    throw "Albums not found";
  }
  return albums;
}

export async function getArtistSingleEpsUseCase(artistId: string) {
  const albums = await getArtistSinglesEps(artistId, LIMIT);
  if (!albums) {
    throw "Singles and EPs not found";
  }
  return albums;
}

export async function getArtistReviewsUseCase(artistId: string) {
  const reviews = await getArtistReviews(artistId, LIMIT);
  if (!reviews) {
    throw "Reviews not found";
  }
  return reviews;
}

export async function getArtistTopTracksUseCase(artistId: string) {
  const tracks = await getArtistTracks(artistId, LIMIT);
  if (!tracks) {
    throw "Tracks not found";
  }
  return tracks;
}

export async function getArtistGenresUseCase(artistId: string) {
  const genres = await getArtistGenres(artistId, LIMIT);
  if (!genres) {
    throw "Genres not found";
  }
  return genres;
}

export async function getArtistDiscographyUseCase(artistId: string) {
  const discography = await getArtistDiscography(artistId, LIMIT);
  if (!discography) {
    throw "Discography not found";
  }
  return discography;
}

export async function getArtistStatsUseCase(artistId: string) {
  const stats = await getArtistStats(artistId);
  if (!stats) {
    throw "Stats not found";
  }
  return stats;
}

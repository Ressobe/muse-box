import {
  getArtistAlbums,
  getArtistById,
  getArtistDiscography,
  getArtistGenres,
  getArtistSinglesEps,
  getArtistStats,
} from "@/data-access/artist";
import { getTopTracks } from "@/data-access/track";
import {
  getArtistReviewsWhereUserIsNotOwner,
  getUserArtistReview,
} from "@/data-access/user";

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

export async function getArtistSingleEpsUseCase(artistId: string) {
  const albums = await getArtistSinglesEps(artistId, LIMIT);
  if (!albums) {
    throw "Singles and EPs not found";
  }
  return albums;
}

export async function getArtistReviewsUseCase(
  artistId: string,
  userId: string,
) {
  const reviews = await getArtistReviewsWhereUserIsNotOwner(
    artistId,
    userId,
    LIMIT,
  );
  const userReview = await getUserArtistReview(userId, artistId);
  if (!reviews) {
    return [];
  }
  if (userReview) {
    return [userReview, ...reviews];
  }
  return reviews;
}

export async function getArtistTopTracksUseCase(artistId: string) {
  const tracks = await getTopTracks(artistId, LIMIT);
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

import { db } from "@/database/db";
import {
  albums,
  artists,
  genresToArtists,
  reviewsArtists,
  tracks,
} from "@/database/schema";
import { and, eq, or } from "drizzle-orm";

export async function getArtists() {
  return await db.query.artists.findMany();
}

export async function getArtistById(artistId: string) {
  return await db.query.artists.findFirst({
    where: eq(artists.id, artistId),
  });
}

export async function getArtistAlbums(artistId: string, limit?: number) {
  return db.query.albums.findMany({
    where: and(eq(albums.artistId, artistId), eq(albums.typeId, 1)),
    limit,
  });
}

export async function getArtistSinglesEps(artistId: string, limit?: number) {
  return db.query.albums.findMany({
    where: and(
      eq(albums.artistId, artistId),
      or(eq(albums.typeId, 2), eq(albums.typeId, 3)),
    ),
    limit,
  });
}

export async function getArtistReviews(artistId: string, limit?: number) {
  return db.query.reviewsArtists.findMany({
    where: eq(reviewsArtists.artistId, artistId),
    with: {
      user: true,
    },
    limit,
  });
}

export async function getArtistTracks(artistId: string, limit?: number) {
  return await db.query.tracks.findMany({
    where: eq(tracks.artistId, artistId),
    with: {
      album: true,
    },
    limit,
  });
}

export async function getArtistGenres(artistId: string, limit?: number) {
  return await db.query.genresToArtists.findMany({
    where: eq(genresToArtists.artistId, artistId),
    with: {
      genre: true,
    },
    limit,
  });
}

export async function getArtistDiscography(artistId: string, limit?: number) {
  return await db.query.albums.findMany({
    where: eq(albums.artistId, artistId),
    with: {
      artist: true,
      tracks: true,
      albumType: true,
    },
    limit,
  });
}

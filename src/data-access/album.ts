import { db } from "@/database/db";
import { albums, albumsTypes, reviewsAlbums } from "@/database/schema";
import { Album } from "@/schemas/album";
import { eq } from "drizzle-orm";
import { createAlbumStat } from "./stat";

export async function getAlbums() {
  return await db.query.albums.findMany();
}

export async function getAlbumById(albumId: string) {
  return await db.query.albums.findFirst({
    where: eq(albums.id, albumId),
    with: {
      artist: true,
      tracks: true,
      albumType: true,
      stats: true,
    },
  });
}

export async function getAlbumsByArtistId(artistId: string, limit?: number) {
  return await db.query.albums.findMany({
    where: eq(albums.artistId, artistId),
    limit,
  });
}

export async function createAlbum(newAlbum: Album) {
  const [album] = await db.insert(albums).values(newAlbum).returning();
  await createAlbumStat(album.id);
  return album;
}

export async function getAlbumReviews(albumId: string, limit?: number) {
  return await db.query.reviewsAlbums.findMany({
    where: eq(reviewsAlbums.entityId, albumId),
    with: {
      user: true,
    },
    limit,
  });
}

export async function createAlbumTypes() {
  await db.insert(albumsTypes).values([
    {
      name: "Album",
    },
    {
      name: "Single",
    },
    {
      name: "EP",
    },
  ]);
}

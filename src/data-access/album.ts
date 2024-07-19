import { db } from "@/database/db";
import { albums } from "@/database/schema";
import { eq } from "drizzle-orm";

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
    },
  });
}

export async function getAlbumsByArtistId(artistId: string, limit?: number) {
  return await db.query.albums.findMany({
    where: eq(albums.artistId, artistId),
    limit,
  });
}

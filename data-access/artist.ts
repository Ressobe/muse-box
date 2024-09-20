import { db } from "@/drizzle/database/db";
import { albums } from "@/drizzle/database/schemas";
import { eq } from "drizzle-orm";

export async function getArtistByAlbumId(albumId: string) {
  const alb = await db.query.albums.findFirst({
    where: eq(albums.id, albumId),
    with: {
      artist: true,
    },
  });

  return alb?.artist;
}

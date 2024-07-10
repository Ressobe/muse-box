import { db } from "@/database/db";
import { getArtists } from "./artist";
import { albums, albumsTypes, tracks } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function insertSampleAlbums() {
  const artistsList = await getArtists();

  // await db.insert(albumsTypes).values([
  //   {
  //     type: "album",
  //   },
  //
  //   {
  //     type: "single",
  //   },
  //
  //   {
  //     type: "ep",
  //   },
  // ]);

  for (const artist of artistsList) {
    await db.transaction(async (trx) => {
      // Dodanie albumów
      const [album1, album2, album3] = await trx
        .insert(albums)
        .values([
          {
            artistId: artist.id,
            title: "First Album",
            typeId: 1,
          },
          {
            artistId: artist.id,
            title: "Second Album",
            typeId: 2,
          },
          {
            artistId: artist.id,
            title: "Third Album",
            typeId: 3,
          },
        ])
        .returning();
      await trx.insert(tracks).values([
        {
          position: 1,
          title: "First track",
          albumId: album1.id,
          artistId: artist.id,
        },
        {
          position: 2,
          title: "Second track",
          albumId: album1.id,
          artistId: artist.id,
        },
        {
          position: 3,
          title: "Third track",
          albumId: album1.id,
          artistId: artist.id,
        },
        {
          position: 1,
          title: "First on second album",
          albumId: album2.id,
          artistId: artist.id,
        },
        {
          position: 2,
          title: "Second on second album",
          albumId: album2.id,
          artistId: artist.id,
        },
        {
          position: 1,
          title: "First on third album",
          albumId: album3.id,
          artistId: artist.id,
        },
        {
          position: 2,
          title: "Second on third album",
          albumId: album3.id,
          artistId: artist.id,
        },
      ]);
    });
  }
}

export async function getAlbums() {
  return await db.query.albums.findMany();
}

export async function getAlbumById(albumId: string) {
  return await db.query.albums.findFirst({
    where: eq(albums.id, albumId),
    with: {
      artist: true,
      tracks: true,
    },
  });
}

export async function getAlbumsByArtistId(artistId: string, limit?: number) {
  return await db.query.albums.findMany({
    where: eq(albums.artistId, artistId),
    limit,
  });
}

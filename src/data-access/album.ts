import { db } from "@/database/db";
import { getArtists } from "./artist";
import { albums, tracks } from "@/database/schema";

export async function insertSampleAlbums() {
  const artistsList = await getArtists();

  for (const artist of artistsList) {
    await db.transaction(async (trx) => {
      // Dodanie albumów
      const [album1, album2] = await trx
        .insert(albums)
        .values([
          {
            artistId: artist.id,
            title: "First Album",
          },
          {
            artistId: artist.id,
            title: "Second Album",
          },
        ])
        .returning();
      await trx.insert(tracks).values([
        {
          position: 1,
          title: "First track",
          albumId: album1.id,
        },
        {
          position: 2,
          title: "Second track",
          albumId: album1.id,
        },
        {
          position: 3,
          title: "Third track",
          albumId: album1.id,
        },
        {
          position: 1,
          title: "First on second album",
          albumId: album2.id,
        },
        {
          position: 2,
          title: "Second on second album",
          albumId: album2.id,
        },
      ]);
    });
  }
}

export async function getAlbums() {
  return await db.query.albums.findMany();
}

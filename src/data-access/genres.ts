import { db } from "@/database/db";
import { getArtists } from "./artist";
import { genresToArtists } from "@/database/schema";

export async function insertSampleGenres() {
  // await db.insert(genres).values([
  //   {
  //     name: "Hip hop",
  //   },
  //   {
  //     name: "Heavy metal",
  //   },
  //   {
  //     name: "Rock",
  //   },
  //   {
  //     name: "Rap",
  //   },
  //   {
  //     name: "Trap",
  //   },
  // ]);

  const artistsList = await getArtists();

  for (const artist of artistsList) {
    await db.insert(genresToArtists).values([
      {
        artistId: artist.id,
        genreId: 1,
      },
      {
        artistId: artist.id,
        genreId: 2,
      },
      {
        artistId: artist.id,
        genreId: 3,
      },
      {
        artistId: artist.id,
        genreId: 4,
      },
      {
        artistId: artist.id,
        genreId: 5,
      },
    ]);
  }
}

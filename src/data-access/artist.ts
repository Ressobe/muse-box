import { db } from "@/database/db";
import { artist } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function insertSampleArtists() {
  const sampleArtists = [
    { name: "John Doe", bio: "Popular artist from USA", country: "USA" },
    { name: "Jane Smith", bio: "Renowned artist from UK", country: "UK" },
    { name: "Carlos Santana", bio: "Legendary guitarist", country: "Mexico" },
    { name: "Alicia Keys", bio: "Soulful singer-songwriter", country: "USA" },
    {
      name: "Ed Sheeran",
      bio: "Multi-talented musician from UK",
      country: "UK",
    },
    { name: "Beyoncé", bio: "Queen of pop", country: "USA" },
    { name: "Michael Jackson", bio: "King of pop", country: "USA" },
    { name: "Freddie Mercury", bio: "Iconic vocalist", country: "UK" },
    {
      name: "Elton John",
      bio: "Legendary pianist and singer-songwriter",
      country: "UK",
    },
    {
      name: "Taylor Swift",
      bio: "Award-winning singer-songwriter",
      country: "USA",
    },
  ];
  await db.insert(artist).values(sampleArtists);
}

export async function getArtists() {
  return await db.query.artist.findMany();
}

export async function getArtistById(artistId: string) {
  return await db.query.artist.findFirst({
    where: eq(artist.id, artistId),
  });
}

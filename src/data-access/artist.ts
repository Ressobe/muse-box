import { db } from "@/database/db";
import {
  albums,
  artists,
  artistsStats,
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
    where: eq(reviewsArtists.entityId, artistId),
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

export async function getArtistStats(artistId: string) {
  return await db.query.artistsStats.findFirst({
    where: eq(artistsStats.artistId, artistId),
  });
}

export async function insertTacoHemingway() {
  // await db.insert(albumsTypes).values([
  //   {
  //     name: "Album",
  //   },
  //   {
  //     name: "Single",
  //   },
  //   {
  //     name: "EP",
  //   },
  // ]);

  const [artist] = await db
    .insert(artists)
    .values({
      name: "Taco Hemingway v2",
      bio: "Polish rapper known for his unique style and storytelling.",
      country: "Poland",
      image: "/taco-avatar.jpeg",
    })
    .returning();

  const albumsData = [
    {
      artistId: artist.id,
      typeId: 1,
      title: "Trójkąt Warszawski",
      image: "/taco4.jpeg",
      length: 1753,
      releaseDate: new Date("2014-12-19"),
    },
    {
      artistId: artist.id,
      typeId: 1,
      title: "Umowa o dzieło",
      image: "/taco3.jpeg",
      length: 1753,
      releaseDate: new Date("2015-06-27"),
    },
  ];

  const [album1, album2] = await db
    .insert(albums)
    .values(albumsData)
    .returning();

  const tracksData = [
    {
      title: "Szlugi i Kalafiory",
      image: "/taco4.jpeg",
      albumId: album1.id,
      artistId: artist.id,
      position: 1,
      length: 186,
    },
    {
      title: "Marsz, Marsz",
      image: "/taco4.jpeg",
      albumId: album1.id,
      artistId: artist.id,
      position: 2,
      length: 230,
    },
    {
      title: "Wszystko Jedno",
      image: "/taco4.jpeg",
      albumId: album1.id,
      artistId: artist.id,
      position: 3,
      length: 310,
    },
    {
      title: "Trójkąt",
      image: "/taco4.jpeg",
      albumId: album1.id,
      artistId: artist.id,
      position: 4,
      length: 326,
    },
    {
      title: "(Przerywnik)",
      image: "/taco4.jpeg",
      albumId: album1.id,
      artistId: artist.id,
      position: 5,
      length: 132,
    },
    {
      title: "Mięso",
      image: "/taco4.jpeg",
      albumId: album1.id,
      artistId: artist.id,
      position: 6,
      length: 257,
    },
    {
      title: "900729",
      image: "/taco4.jpeg",
      albumId: album1.id,
      artistId: artist.id,
      position: 7,
      length: 303,
    },
    {
      title: "Od zera",
      image: "/taco3.jpeg",
      albumId: album2.id,
      artistId: artist.id,
      position: 1,
      length: 116,
    },
    {
      title: "A mówiłem Ci",
      image: "/taco3.jpeg",
      albumId: album2.id,
      artistId: artist.id,
      position: 2,
      length: 339,
    },
    {
      title: "Następna stacja",
      image: "/taco3.jpeg",
      albumId: album2.id,
      artistId: artist.id,
      position: 3,
      length: 251,
    },
    {
      title: "6 zer",
      image: "/taco3.jpeg",
      albumId: album2.id,
      artistId: artist.id,
      position: 4,
      length: 237,
    },
    {
      title: "+4822",
      image: "/taco3.jpeg",
      albumId: album2.id,
      artistId: artist.id,
      position: 5,
      length: 236,
    },
    {
      title: "Awizo",
      image: "/taco3.jpeg",
      albumId: album2.id,
      artistId: artist.id,
      position: 6,
      length: 259,
    },
    {
      title: "Białkoholicy",
      image: "/taco3.jpeg",
      albumId: album2.id,
      artistId: artist.id,
      position: 7,
      length: 282,
    },
    {
      title: "100 kmh",
      image: "/taco3.jpeg",
      albumId: album2.id,
      artistId: artist.id,
      position: 8,
      length: 119,
    },
  ];

  await db.insert(tracks).values(tracksData);
}

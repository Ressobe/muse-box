import db from "@/src/lib/db";

export async function getTopArtists() {
  return await db.artist.findMany({
    orderBy: {
      popularity: "desc",
    },
    take: 10,
  });
}

export async function getTopRecordings() {
  return await db.recording.findMany({
    orderBy: {
      popularity: "desc",
    },
    take: 10,
  });
}

export async function getTopTracks() {
  return await db.track.findMany({
    orderBy: {
      popularity: "desc",
    },
    take: 10,
  });
}

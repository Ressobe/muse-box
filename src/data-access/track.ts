import { db } from "@/database/db";
import { tracks } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function getTracks() {
  return await db.query.tracks.findMany();
}

export async function getTrackById(trackId: string) {
  return await db.query.tracks.findFirst({
    where: eq(tracks.id, trackId),
    with: {
      album: true,
    },
  });
}

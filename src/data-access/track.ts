import { db } from "@/database/db";

export async function getTracks() {
  return await db.query.tracks.findMany();
}

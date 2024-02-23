"use server";

import { followArtist } from "@/src/database/artist";
import { revalidatePath } from "next/cache";

export async function followAction(artistId: string, profileId: string) {
  await followArtist(artistId, profileId);
  revalidatePath("/artists");
}

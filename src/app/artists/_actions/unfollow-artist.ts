"use server";

import { unfollowArtist } from "@/src/database/artist";
import { revalidatePath } from "next/cache";

export async function unfollowAction(artistId: string, profileId: string) {
  await unfollowArtist(artistId, profileId);
  revalidatePath("/artists");
}

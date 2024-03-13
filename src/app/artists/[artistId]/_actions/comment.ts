"use server";

import {
  createArtistComment,
  deleteArtistComment,
} from "@/src/database/artist";
import { revalidatePath } from "next/cache";

export async function addCommentAction(
  artistId: string,
  profileId: string,
  rate: number,
  comment: string,
) {
  await createArtistComment(artistId, profileId, rate, comment);
  revalidatePath(`/artists/${artistId}`);
}

export async function deleteCommentAction(artistId: string, commentId: string) {
  await deleteArtistComment(artistId, commentId);
  revalidatePath(`/artists/${artistId}`);
}

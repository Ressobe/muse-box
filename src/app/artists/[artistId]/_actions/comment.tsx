import { createArtistComment } from "@/src/database/artist";
import { revalidatePath } from "next/cache";

export default async function addCommentAction(
  artistId: string,
  profileId: string,
  rate: number,
  comment: string,
) {
  await createArtistComment(artistId, profileId, rate, comment);
  revalidatePath(`/artists/${artistId}`);
}

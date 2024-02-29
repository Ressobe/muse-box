"use server";

import { unlikeArtist } from "@/src/database/artist";

export default async function unlikeArtistAction(
  artistId: string,
  profileId: string,
) {
  await unlikeArtist(artistId, profileId);
}

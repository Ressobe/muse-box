"use server";

import { likeArtist } from "@/src/database/playlist";

export default async function likeArtistAction(
  artistId: string,
  profileId: string,
) {
  await likeArtist(artistId, profileId);
}

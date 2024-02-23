"use server";

import { followProfile } from "@/src/database/profile";
import { revalidatePath } from "next/cache";

export default async function followAction(
  followerId: string,
  followedId: string
) {
  await followProfile(followedId, followerId);
  revalidatePath(`/profile/${followedId}`);
}

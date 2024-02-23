"use server";

import { unfollowProfile } from "@/src/database/profile";
import { revalidatePath } from "next/cache";

export default async function unfollowAction(
  followerId: string,
  followedId: string
) {
  await unfollowProfile(followedId, followerId);
  revalidatePath(`/profile/${followedId}`);
}

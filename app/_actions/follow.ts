"use server";

import { followController } from "@/src/interface-adapters/controllers/follow/follow.controller";
import { unfollowController } from "@/src/interface-adapters/controllers/follow/unfollow.controller";

export async function followAction(followerId: string, followingId: string) {
  await followController(followerId, followingId);
}

export async function unfollowAction(followerId: string, followingId: string) {
  await unfollowController(followerId, followingId);
}

"use server";

import { currentUser } from "@/lib/auth";
import { followController } from "@/src/interface-adapters/controllers/follow.controller";
import { unfollowUseCase } from "@/use-cases/follow";

export async function followAction(followerId: string, followingId: string) {
  const user = await currentUser();
  if (!user) {
    return { error: "Not authorized access!" };
  }
  if (user.id !== followerId) {
    return { error: "Not authorized access!" };
  }

  await followController(followerId, followingId);
}

export async function unfollowAction(followerId: string, followingId: string) {
  const user = await currentUser();
  if (!user) {
    return { error: "Not authorized access!" };
  }
  if (user.id !== followerId) {
    return { error: "Not authorized access!" };
  }

  await unfollowUseCase(followerId, followingId);
}

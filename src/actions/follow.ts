"use server";

import { currentUser } from "@/lib/auth";
import { followUseCase, unfollowUseCase } from "@/use-cases/follow";

export async function followAction(followerId: string, followingId: string) {
  const user = await currentUser();
  if (!user) {
    return { error: "Not authorized access!" };
  }
  if (user.id !== followerId) {
    return { error: "Not authorized access!" };
  }

  await followUseCase(followerId, followingId);
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

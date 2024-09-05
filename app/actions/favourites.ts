"use server";

import { currentUser } from "@/lib/auth";
import { Entity } from "@/types";
import {
  removeFavouriteUseCase,
  selectFavouriteUseCase,
} from "@/use-cases/user";
import { revalidatePath } from "next/cache";

export async function selectFavouriteAction(entityId: string, type: Entity) {
  const user = await currentUser();
  if (!user) {
    return { error: "Not authorized access!" };
  }
  await selectFavouriteUseCase(entityId, type, user.id);
  revalidatePath(`/profiles/${user.id}`);
}

export async function removeFavouriteAction(type: Entity) {
  const user = await currentUser();
  if (!user) {
    return { error: "Not authorized access!" };
  }

  await removeFavouriteUseCase(type, user.id);
  revalidatePath(`/profiles/${user.id}`);
}

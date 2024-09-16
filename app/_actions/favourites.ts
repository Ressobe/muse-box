"use server";
// TODO: move checks to controller
import { currentUser } from "@/lib/auth";
import { removeFavouriteController } from "@/src/interface-adapters/controllers/follow/remove-favourite.controller";
import { selectFavouriteController } from "@/src/interface-adapters/controllers/follow/select-favourite.controller";
import { Entity } from "@/types";
import { revalidatePath } from "next/cache";

export async function selectFavouriteAction(entityId: string, type: Entity) {
  const user = await currentUser();
  if (!user) {
    return { error: "Not authenticated access!" };
  }

  await selectFavouriteController(entityId, type);
  revalidatePath(`/profiles/${user.id}`);
}

export async function removeFavouriteAction(type: Entity) {
  const user = await currentUser();
  if (!user) {
    return { error: "Not authenticated access!" };
  }

  await removeFavouriteController(type);
  revalidatePath(`/profiles/${user.id}`);
}

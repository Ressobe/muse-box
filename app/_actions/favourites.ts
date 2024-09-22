"use server";

import { Content } from "@/src/entities/models/content";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";
import { removeFavouriteController } from "@/src/interface-adapters/controllers/follow/remove-favourite.controller";
import { selectFavouriteController } from "@/src/interface-adapters/controllers/follow/select-favourite.controller";
import { revalidatePath } from "next/cache";

export async function selectFavouriteAction(entityId: string, type: Content) {
  const authUserId = await getAuthUserIdController();
  if (authUserId) {
    return { error: "Not authenticated access!" };
  }

  await selectFavouriteController(entityId, type);
  revalidatePath(`/profiles/${authUserId}`);
}

export async function removeFavouriteAction(type: Content) {
  const authUserId = await getAuthUserIdController();
  if (authUserId) {
    return { error: "Not authenticated access!" };
  }

  await removeFavouriteController(type);
  revalidatePath(`/profiles/${authUserId}`);
}

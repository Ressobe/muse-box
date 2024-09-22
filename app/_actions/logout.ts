"use server";

import { signOutController } from "@/src/interface-adapters/controllers/auth/sign-out.controller";

export async function logoutAction() {
  await signOutController();
}

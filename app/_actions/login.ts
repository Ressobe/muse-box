"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/auth";
import { signInController } from "@/src/interface-adapters/controllers/auth/sign-in.controller";

export async function loginAction(
  formData: z.infer<typeof LoginSchema>,
  callbackUrl: string | null,
) {
  return await signInController({ formData, callbackUrl });
}

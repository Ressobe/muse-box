"use server";

import * as z from "zod";
import { signInController } from "@/src/interface-adapters/controllers/auth/sign-in.controller";
import { LoginSchema } from "@/src/entities/models/auth";

export async function loginAction(
  formData: z.infer<typeof LoginSchema>,
  callbackUrl: string | null,
) {
  return await signInController({ formData, callbackUrl });
}

"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/src/entities/models/auth";
import { newPasswordController } from "@/src/interface-adapters/controllers/user/new-password.controller";

export async function newPasswordAction(
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null,
) {
  return await newPasswordController({ values, token: token ?? "" });
}

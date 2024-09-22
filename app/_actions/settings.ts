"use server";

import * as z from "zod";
import { SettingsSchema } from "@/src/entities/models/auth";
import { updateUserSettingsController } from "@/src/interface-adapters/controllers/user/update-user-settings.controller";

export async function settingsAction(values: z.infer<typeof SettingsSchema>) {
  return await updateUserSettingsController({ values });
}

"use server";

import * as z from "zod";
import { ResetSchema } from "@/src/entities/models/auth";
import { getUserByEmailUseCase } from "@/src/application/use-cases/user/get-user-by-email.use-case";
import { generatePasswordResetTokenController } from "@/src/interface-adapters/controllers/password-token/generate-password-reset-token.controller";
import { sendPasswordResetEmailController } from "@/src/interface-adapters/controllers/password-token/send-password-reset-email";

export async function resetPasswordAction(values: z.infer<typeof ResetSchema>) {
  const validateFields = ResetSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmailUseCase(email);
  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetTokenController({
    email,
  });

  await sendPasswordResetEmailController({
    email: passwordResetToken.email,
    token: passwordResetToken.token,
  });

  return { sucess: "Reset email sent" };
}

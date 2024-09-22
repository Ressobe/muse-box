import { NewPasswordSchema } from "@/src/entities/models/auth";
import { getPasswordResetTokenUseCase } from "@/src/application/use-cases/password-reset-tokens/get-password-reset-token.use-case";
import { getUserByEmailUseCase } from "@/src/application/use-cases/user/get-user-by-email.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { updateUserPasswordUseCase } from "@/src/application/use-cases/user/update-user-password.use-case";
import { removePasswordResetTokenUseCase } from "@/src/application/use-cases/password-reset-tokens/remove-password-reset-token.use-case";

const inputSchema = z.object({
  values: NewPasswordSchema,
  token: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function newPasswordController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in newPasswordController");
  }

  const { values, token } = data;
  const existingToken = await getPasswordResetTokenUseCase(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmailUseCase(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const { password } = values;
  const hashedPassword = await bcrypt.hash(password, 10);

  await updateUserPasswordUseCase(existingUser.id, hashedPassword);
  await removePasswordResetTokenUseCase(existingToken.id);

  return { sucess: "Your password updated!" };
}

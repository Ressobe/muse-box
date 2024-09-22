import { container } from "@/di/container";
import { SettingsSchema } from "@/src/entities/models/auth";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getUserByEmailUseCase } from "@/src/application/use-cases/user/get-user-by-email.use-case";
import { getUserByNameUseCase } from "@/src/application/use-cases/user/get-user-by-name.use-case";
import { getUserUseCase } from "@/src/application/use-cases/user/get-user.use-case";
import { generateVerificationTokenUseCase } from "@/src/application/use-cases/verification-token/generate-verification-token.use-case";
import { sendVerificationEmailUseCase } from "@/src/application/use-cases/verification-token/send-verification-email.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { updateUserSettingsUseCase } from "@/src/application/use-cases/user/update-user-settings.use-case";

const inputSchema = z.object({
  values: SettingsSchema,
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function updateUserSettingsController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in updateUserSettingsController");
  }

  const { values } = data;

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const user = await authenticationService.validateSession();

  const dbUser = await getUserUseCase(user.id);
  if (!dbUser) {
    return { error: "Unauthorized !" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existngUserByEmail = await getUserByEmailUseCase(values.email);
    if (existngUserByEmail && existngUserByEmail.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationTokenUseCase(
      values.email,
    );
    if (!verificationToken) {
      return { error: "Something went wrong" };
    }
    await sendVerificationEmailUseCase(
      verificationToken.token,
      verificationToken.email,
    );
  }

  if (values.name && values.name !== user.name) {
    const existngUserByName = await getUserByNameUseCase(values.name);
    if (existngUserByName && existngUserByName.id !== user.id) {
      return { error: "Name already in use!" };
    }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await updateUserSettingsUseCase(dbUser.id, values);

  return { sucess: "Settings updated!" };
}

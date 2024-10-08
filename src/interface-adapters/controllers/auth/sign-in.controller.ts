import { container } from "@/di/container";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getUserByEmailUseCase } from "@/src/application/use-cases/user/get-user-by-email.use-case";
import { generateVerificationTokenUseCase } from "@/src/application/use-cases/verification-token/generate-verification-token.use-case";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { LoginSchema } from "@/src/entities/models/auth";
import { z } from "zod";
import { sendVerificationEmailController } from "../verification-token/send-verification-email.controller";

const inputSchema = z.object({
  formData: LoginSchema,
  callbackUrl: z.string().nullable(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function signInController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    return { error: "Invalid fields!" };
  }

  const { formData, callbackUrl } = data;
  const { email, password } = formData;

  const existingUser = await getUserByEmailUseCase(email);
  if (existingUser && !existingUser.emailVerified) {
    const verificationToken = await generateVerificationTokenUseCase(email);

    if (!verificationToken) {
      return { error: "Something went wrong!" };
    }

    await sendVerificationEmailController({
      email: verificationToken.email,
      token: verificationToken.token,
    });

    return { sucess: "Confirmation email sent!" };
  }

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  try {
    await authenticationService.signIn(
      "credentials",
      email,
      password,
      callbackUrl || DEFAULT_LOGIN_REDIRECT,
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { error: error.message };
    }
    throw error;
  }

  return { sucess: "Email was sent!" };
}

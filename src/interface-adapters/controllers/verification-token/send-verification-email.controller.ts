import { container } from "@/di/container";
import { IMailService } from "@/src/application/services/mail.service.interface";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  email: z.string().email(),
  token: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function sendVerificationEmailController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError(
      "Invalid input in sendVerificationEmailController",
    );
  }

  const { email, token } = data;

  const mailService = container.get<IMailService>("IMailService");
  await mailService.sendVerificationEmail(email, token);
}

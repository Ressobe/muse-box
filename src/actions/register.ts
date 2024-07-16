"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data-access/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { createUserUseCase } from "@/use-cases/user";

export async function registerAction(formData: z.infer<typeof RegisterSchema>) {
  const validatedFormData = RegisterSchema.safeParse(formData);

  if (!validatedFormData.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedFormData.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User with this email already exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUserUseCase(email, name, hashedPassword);

  const verificationToken = await generateVerificationToken(email);
  if (!verificationToken) {
    return { error: "Something went wrong!" };
  }

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { sucess: "Confirmation email sent!" };
}

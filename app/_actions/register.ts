"use server";

import * as z from "zod";
import { RegisterSchema } from "@/src/entities/models/auth";
import bcrypt from "bcryptjs";
// import { sendVerificationEmail } from "@/lib/mail";
import { createUserController } from "@/src/interface-adapters/controllers/user/create-user.controller";
import { verifyUserUseCase } from "@/src/application/use-cases/user/verify-user.use-case";
import { getUserByEmailUseCase } from "@/src/application/use-cases/user/get-user-by-email.use-case";
import { getUserByNameUseCase } from "@/src/application/use-cases/user/get-user-by-name.use-case";

export async function registerAction(formData: z.infer<typeof RegisterSchema>) {
  const validatedFormData = RegisterSchema.safeParse(formData);

  if (!validatedFormData.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedFormData.data;

  const existingUserByName = await getUserByNameUseCase(name);
  if (existingUserByName) {
    return { error: "User with this name already exist!" };
  }

  const existingUserByEmail = await getUserByEmailUseCase(email);
  if (existingUserByEmail) {
    return { error: "User with this email already exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUserController({
    email,
    name,
    password: hashedPassword,
  });

  // const verificationToken = await generateVerificationTokenController(email);
  // if (!verificationToken) {
  //   return { error: "Something went wrong!" };
  // }

  // await sendVerificationEmail(verificationToken.email, verificationToken.token);
  await verifyUserUseCase(newUser.id, newUser.email);

  return { sucess: "You can log in now" };
}

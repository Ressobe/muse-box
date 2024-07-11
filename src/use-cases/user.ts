import { createProfile } from "@/data-access/profile";
import { createUser } from "@/data-access/user";

export async function createUserUseCase(
  email: string,
  name: string,
  password: string,
) {
  const user = await createUser(email, name, password);
  await createProfile(user.id);
  return user;
}

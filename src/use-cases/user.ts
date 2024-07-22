import { createProfile } from "@/data-access/profile";
import { createUser, getUserPlaylists } from "@/data-access/user";

export async function createUserUseCase(
  email: string,
  name: string,
  password: string,
) {
  const user = await createUser(email, name, password);
  await createProfile(user.id);
  return user;
}

export async function getUserPlaylistsUseCase(userId: string) {
  return await getUserPlaylists(userId);
}

import { deleteAccount } from "@/src/database/profile";

export default async function deleteAccountAction(profileId: string) {
  await deleteAccount(profileId);
}

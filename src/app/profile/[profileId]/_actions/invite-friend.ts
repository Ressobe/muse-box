"use server";

import { sendInvitationFriend } from "@/src/database/profile";
import { revalidatePath } from "next/cache";

export default async function inviteToFriendAction(
  senderId: string,
  reciverId: string
) {
  await sendInvitationFriend(senderId, reciverId);
  revalidatePath(`/profile/${reciverId}`);
}

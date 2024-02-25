"use server";

import { rejectInvitationFriend } from "@/src/database/profile";

export default async function rejectToFriendAction(
  profileWhoRejectId: string,
  profileWhoIsBeingRejectedId: string,
) {
  await rejectInvitationFriend(profileWhoRejectId, profileWhoIsBeingRejectedId);
}

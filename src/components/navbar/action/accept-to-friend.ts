"use server";

import { acceptInvitationFriend } from "@/src/database/profile";

export default async function acceptToFriendAction(
  profileWhoAcceptId: string,
  profileWhoIsBeingAccepted: string,
) {
  await acceptInvitationFriend(profileWhoAcceptId, profileWhoIsBeingAccepted);
}

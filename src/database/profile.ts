import db from "@/src/lib/db";

export async function sendInvitationFriend(
  senderId: string,
  reciverId: string
) {
  await db.invitation.create({
    data: {
      senderId: senderId,
      receiverId: reciverId,
      state: "PENDING",
    },
  });

  const inviteNotification = await db.notification.create({
    data: {
      type: "INVITE",
      resourceId: senderId,
    },
  });

  await db.profile.update({
    where: { id: reciverId },
    data: {
      notifications: {
        connect: { id: inviteNotification.id },
      },
    },
  });
}

export async function acceptInvitationFriend(
  userWhoAccept: string,
  senderId: string
) {
  const invitation = await db.invitation.findFirst({
    where: {
      senderId: senderId,
      receiverId: userWhoAccept,
    },
  });

  await db.notification.deleteMany({
    where: {
      type: "INVITE",
      resourceId: senderId,
      profiles: {
        some: { id: userWhoAccept },
      },
    },
  });

  await db.invitation.update({
    where: { id: invitation?.id },
    data: {
      state: "ACCEPTED",
    },
  });

  await db.profile.update({
    where: { id: userWhoAccept },
    data: {
      friendsOf: {
        connect: { id: senderId },
      },
    },
  });

  await db.profile.update({
    where: { id: senderId },
    data: {
      friends: {
        connect: { id: userWhoAccept },
      },
    },
  });

  await db.notification.create({
    data: {
      type: "ACCEPTED_INVITATION",
      resourceId: userWhoAccept,
      profiles: {
        connect: { id: senderId },
      },
    },
  });
}

export async function rejectInvitationFriend(
  userWhoReject: string,
  senderId: string
) {
  const invitation = await db.invitation.findFirst({
    where: {
      senderId: senderId,
      receiverId: userWhoReject,
    },
  });

  await db.notification.deleteMany({
    where: {
      type: "INVITE",
      resourceId: senderId,
      profiles: {
        some: { id: userWhoReject },
      },
    },
  });

  await db.invitation.update({
    where: { id: invitation?.id },
    data: {
      state: "REJECTED",
    },
  });
}

export async function followProfile(
  followedProfileId: string,
  followerProfileId: string
) {
  const notification = await db.notification.create({
    data: {
      type: "NEW_FOLLOWER",
      resourceId: followerProfileId,
    },
  });

  await db.profile.update({
    where: { id: followedProfileId },
    data: {
      followers: {
        connect: { id: followerProfileId },
      },
      stats: {
        update: {
          amount_of_followers: { increment: 1 },
        },
      },
      notifications: {
        connect: { id: notification.id },
      },
    },
  });

  await db.profile.update({
    where: { id: followerProfileId },
    data: {
      following: {
        connect: { id: followerProfileId },
      },
      stats: {
        update: {
          amount_of_following: { increment: 1 },
        },
      },
    },
  });
}

export async function unfollowProfile(
  followedProfileId: string,
  followerProfileId: string
) {
  await db.profile.update({
    where: { id: followedProfileId },
    data: {
      followers: {
        disconnect: { id: followerProfileId },
      },
      stats: {
        update: {
          amount_of_followers: { decrement: 1 },
        },
      },
    },
  });

  await db.profile.update({
    where: { id: followerProfileId },
    data: {
      following: {
        disconnect: { id: followerProfileId },
      },
      stats: {
        update: {
          amount_of_following: { decrement: 1 },
        },
      },
    },
  });
}

export async function getProfile(profileId: string | undefined) {
  if (profileId === undefined) {
    return null;
  }
  const profile = await db.profile.findUnique({
    where: { id: profileId },
    include: {
      followers: true,
      stats: true,
      friends: true,
      favourite_album: true,
      favourite_artist: true,
      favourite_song: true,
    },
  });
  return profile;
}

export async function getNotifications(profileId: string) {
  const profile = await db.profile.findUnique({
    where: { id: profileId },
    include: {
      notifications: true,
    },
  });
  return profile?.notifications;
}

export async function updateComment(
  commentId: string,
  rate: number,
  comment: string
) {
  await db.comment.update({
    where: { id: commentId },
    data: {
      rate: rate,
      content: comment,
    },
  });
}

export async function deleteComment(commentId: string) {
  await db.comment.delete({
    where: { id: commentId },
  });
}

export async function getLatestProfileComments(profileId: string) {
  await db.comment.findMany({
    where: { ownerId: profileId },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}

export async function removeNotification(
  notificationId: number,
  resourceId: string
) {
  await db.notification.delete({
    where: {
      id: notificationId,
      resourceId: resourceId,
    },
  });
}

// export async function removeNotification(notificationId: number, profileId: string) {
//     await db.notification.deleteMany({
//         where: {
//             id: notificationId,
//             profiles: {
//                 some: { id: profileId }
//             }
//         }
//     })
// }

export async function setFavouriteArtist(artistId: string, profileId: string) {
  await db.profile.update({
    where: { id: profileId },
    data: { artistId: artistId },
  });
}

export async function setFavouriteRecording(
  recordingId: string,
  profileId: string
) {
  await db.profile.update({
    where: { id: profileId },
    data: { albumId: recordingId },
  });
}

export async function setFavouriteTrack(trackId: string, profileId: string) {
  await db.profile.update({
    where: { id: profileId },
    data: { trackId: trackId },
  });
}

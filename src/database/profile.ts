import db from "@/src/lib/db";
import { Profile } from "@prisma/client";

export async function deleteAccount(profileId: string) {
  await db.profile.delete({
    where: {
      id: profileId,
    },
  });
}

export async function sendInvitationFriend(
  senderId: string,
  reciverId: string,
) {
  const invitation = await db.invitation.findFirst({
    where: {
      senderId: senderId,
      receiverId: reciverId,
      state: "PENDING",
    },
  });

  if (invitation) {
    return null;
  }

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
      fromId: senderId,
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
  senderId: string,
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
      fromId: userWhoAccept,
      profiles: {
        connect: { id: senderId },
      },
    },
  });
}

export async function rejectInvitationFriend(
  userWhoReject: string,
  senderId: string,
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
  followerProfileId: string,
) {
  let notification = await db.notification.findFirst({
    where: {
      type: "NEW_FOLLOWER",
      resourceId: followerProfileId,
      fromId: followerProfileId,
    },
  });

  if (!notification) {
    notification = await db.notification.create({
      data: {
        type: "NEW_FOLLOWER",
        resourceId: followerProfileId,
        fromId: followerProfileId,
      },
    });
  }

  await db.profile.update({
    where: { id: followedProfileId },
    data: {
      followers: {
        connect: { id: followerProfileId },
      },
      stats: {
        upsert: {
          where: { ownerId: followedProfileId },
          create: {
            amount_of_followers: 1,
            amount_of_following: 0,
            amount_of_ratings: 0,
          },
          update: { amount_of_followers: { increment: 1 } },
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
        connect: { id: followedProfileId },
      },
      stats: {
        upsert: {
          where: { ownerId: followerProfileId },
          create: {
            amount_of_followers: 0,
            amount_of_following: 1,
            amount_of_ratings: 0,
          },
          update: { amount_of_following: { increment: 1 } },
        },
      },
    },
  });
}

export async function unfollowProfile(
  followedProfileId: string,
  followerProfileId: string,
) {
  let notification = await db.notification.findFirst({
    where: {
      type: "NEW_FOLLOWER",
      resourceId: followerProfileId,
      fromId: followerProfileId,
    },
  });

  if (notification) {
    await db.notification.delete({
      where: { id: notification.id },
    });
  }

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
        disconnect: { id: followedProfileId },
      },
      stats: {
        update: {
          amount_of_following: { decrement: 1 },
        },
      },
    },
  });
}

export async function getProfile(userId: string | undefined) {
  if (userId === undefined) {
    return null;
  }
  const profile = await db.profile.findUnique({
    where: { userId: userId },
    include: {
      notifications: true,
      followers: true,
      stats: true,
      friends: true,
      friendsOf: true,
      favourite_album: true,
      favourite_artist: true,
      favourite_song: true,
    },
  });
  return profile;
}

export async function readProfile(
  profileId: string,
): Promise<[Profile | null, Error | null]> {
  try {
    const profile = await db.profile.findUnique({ where: { id: profileId } });
    return [profile, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function isFollowingProfile(
  followerId: string | undefined,
  followedId: string,
) {
  if (!followerId) {
    return false;
  }

  const profile = await db.profile.findUnique({
    where: {
      id: followerId,
    },
    include: {
      following: true,
    },
  });

  if (!profile || !profile.following) {
    return false;
  }

  const isFollowing = profile.following.some(
    (followed) => followed.id === followedId,
  );

  return isFollowing;
}

export async function isFriendProfile(
  profileToCheckId: string,
  profileCheckerId: string | undefined,
) {
  if (!profileCheckerId) {
    return false;
  }

  const profile = await db.profile.findUnique({
    where: { id: profileToCheckId },
    include: { friends: true },
  });

  if (!profile) {
    return false;
  }

  const isFriend = profile.friends.some(
    (friend) => friend.id === profileCheckerId,
  );

  return isFriend;
}

export async function isInvitedToFriendProfile(
  profileToCheckId: string,
  profileCheckerId: string | undefined,
) {
  if (!profileCheckerId) {
    return false;
  }
  const profile = await db.profile.findUnique({
    where: { id: profileToCheckId },
    include: { invitationsReceived: true },
  });

  if (!profile) {
    return false;
  }

  const isInvited = profile.invitationsReceived.some(
    (invitation) => invitation.senderId === profileCheckerId,
  );

  return isInvited;
}

export async function getProfileByProfileId(profileId: string) {
  const profile = await db.profile.findUnique({
    where: { id: profileId },
    include: {
      notifications: true,
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

export async function updateComment(
  commentId: string,
  rate: number,
  comment: string,
) {
  await db.comment.update({
    where: { id: commentId },
    data: {
      rate: rate,
      content: comment,
    },
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
  resourceId: string,
) {
  await db.notification.delete({
    where: {
      id: notificationId,
      resourceId: resourceId,
    },
  });
}

export async function setFavouriteArtist(artistId: string, profileId: string) {
  await db.profile.update({
    where: { id: profileId },
    data: { artistId: artistId },
  });
}

export async function setFavouriteRecording(
  recordingId: string,
  profileId: string,
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

export async function isFollowingArtist(
  profileId: string | undefined,
  artistId: string,
) {
  if (!profileId) {
    return false;
  }

  const profile = await db.profile.findUnique({
    where: {
      id: profileId,
    },
    include: {
      followedArtists: true,
    },
  });

  if (!profile || !profile.followedArtists) {
    return false;
  }

  const isFollowing = profile.followedArtists.some(
    (artist) => artist.id === artistId,
  );

  return isFollowing;
}

export async function updateName(profileId: string, newName: string) {
  await db.profile.update({
    where: { id: profileId },
    data: {
      name: newName,
    },
  });
}

export async function updateSurname(profileId: string, newSurname: string) {
  await db.profile.update({
    where: { id: profileId },
    data: {
      surname: newSurname,
    },
  });
}

export async function updateBio(profileId: string, newBio: string) {
  await db.profile.update({
    where: { id: profileId },
    data: {
      bio: newBio,
    },
  });
}

export async function updateBirthday(profileId: string, newBirthday: Date) {
  await db.profile.update({
    where: { id: profileId },
    data: {
      birthDay: newBirthday,
    },
  });
}

export async function updateAvatar(profileId: string, newAvatar: string) {
  await db.profile.update({
    where: { id: profileId },
    data: {},
  });
}

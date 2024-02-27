import {
  getProfileByProfileId,
  isFollowingProfile,
} from "@/src/database/profile";
import { formatTimeDiff } from "@/src/lib/utils";
import Link from "next/link";
import FollowButton from "./follow-button";

type NewFollowerProps = {
  reciverId: string;
  senderId: string;
  createdAt: Date;
};

export default async function NewFollower({
  reciverId,
  senderId,
  createdAt,
}: NewFollowerProps) {
  const senderProfile = await getProfileByProfileId(senderId);
  if (!senderProfile) {
    return null;
  }

  const isFollowing = await isFollowingProfile(reciverId, senderId);

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center w-full">
          <img
            alt="Artist"
            className="object-cover rounded-lg"
            height={50}
            src="/user.png"
            style={{
              aspectRatio: "50/50",
              objectFit: "cover",
            }}
            width={50}
          />
          <h1 className="pl-4 pr-2 font-bold cursor-pointer hover:underline">
            {senderProfile.name}
          </h1>
          <Link href={`/profile/${senderProfile.id}`} className="text-xm">
            is now following you!
          </Link>
          <FollowButton
            senderId={senderId}
            reciverId={reciverId}
            isFollowing={isFollowing}
          />
        </div>
      </div>
      <div className="flex pt-2">
        <div className="w-[50px]"></div>
        <span className="pl-4 text-sm text-secondary-foreground">
          {formatTimeDiff(createdAt)}
        </span>
      </div>
    </>
  );
}
